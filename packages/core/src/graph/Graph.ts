import { action, observable } from "mobx";

import { BaseNode } from "../nodes/BaseNode";
import {
  OutputDataPin,
  InputDataPin,
  OutputExecPin,
  InputExecPin,
  Pin,
} from "../pins";
import { pinsAreIOPair } from "../utils/pins";
import { DataConnection, ExecConnection } from "./Connection";
import { findNodeType } from "../packages";
import { SerializedGraph, t, XY } from "../types";

export class Graph {
  nodes = observable<BaseNode>([]);
  connections = observable<DataConnection<t.Type> | ExecConnection>([]);

  @action
  addNode(node: BaseNode) {
    this.nodes.push(node);
  }

  @action
  createNode(args: { type: string; position: XY }) {
    const { name, type: ctor } = findNodeType(args.type);

    // @ts-expect-error ctor will extend BaseNode
    const node: BaseNode = new ctor({
      position: args.position,
      name,
      type: args.type,
      graph: this,
    });

    node.initialize?.();

    this.nodes.push(node);

    return node;
  }

  @action
  deleteNode(node: BaseNode) {
    node.inputDataPins.forEach((p) => this.disconnectPin(p));
    node.outputDataPins.forEach((p) => this.disconnectPin(p));
    node.inputExecPins.forEach((p) => this.disconnectPin(p));
    node.outputExecPins.forEach((p) => this.disconnectPin(p));

    node.deinitialize?.();

    this.nodes.remove(node);
  }

  @action
  connectDataPins<T extends t.Type>(
    output: OutputDataPin<T>,
    input: InputDataPin<T>
  ) {
    if (!t.typesCompatible(output.type, input.type)) return;

    this.disconnectPin(input);

    output.inputPins.push(input);
    input.outputPin = output;

    const connection = new DataConnection({
      type: output.type,
      output,
      input,
    });

    output.connections.push((input.connection = connection));

    this.connections.push(connection);
    return connection;
  }

  @action
  connectExecPins(output: OutputExecPin, input: InputExecPin) {
    this.disconnectPin(output);
    this.disconnectPin(input);

    output.inputPin = input;
    input.outputPin = output;

    const connection = new ExecConnection({
      output,
      input,
    });

    output.connection = input.connection = connection;

    this.connections.push(connection);
    return connection;
  }

  @action
  connectPins(one: Pin, two: Pin) {
    const valid = pinsAreIOPair(one, two);

    if (!valid) return;

    if (valid.data)
      if (valid.reverse)
        return this.connectDataPins(two as OutputDataPin, one as InputDataPin);
      else
        return this.connectDataPins(one as OutputDataPin, two as InputDataPin);
    if (valid.reverse)
      return this.connectExecPins(two as OutputExecPin, one as InputExecPin);
    else return this.connectExecPins(one as OutputExecPin, two as InputExecPin);
  }

  @action
  disconnectPin(pin: Pin) {
    if (pin instanceof OutputDataPin) {
      pin.connections.forEach((conn) => {
        conn.input.disconnect();
        conn.output.disconnect();

        conn.input.connection = null;

        this.connections.remove(conn);
      });

      pin.connections.clear();
      return;
    }

    const conn = pin.connection;

    if (conn) {
      conn.input.disconnect();
      conn.output.disconnect();

      conn.input.connection = null;

      if (conn instanceof DataConnection) conn.output.connections.remove(conn);
      else conn.output.connection = null;

      this.connections.remove(conn);
    }
  }

  toJSON(): SerializedGraph {
    return {
      nodes: this.nodes.map((n) => n.toJSON()),
    };
  }

  static fromJSON(data: SerializedGraph) {
    const graph = new Graph();

    graph.nodes.replace(
      data.nodes.map((nodeData) => {
        const { type: ctor } = findNodeType(nodeData.type);

        // @ts-expect-error
        const node: BaseNode = new ctor({ ...nodeData, graph });

        nodeData.data.forEach((v, i) => {
          node.data[i].value = v;
        });

        node.initialize?.();

        node.inputDataPins.forEach((p, i) => {
          p.id = nodeData.pins.data.in[i].id;
          p.unconnectedValue = nodeData.pins.data.in[i].unconnectedValue;
        });
        node.outputDataPins.forEach(
          (p, i) => (p.id = nodeData.pins.data.out[i])
        );
        node.inputExecPins.forEach(
          (p, i) => (p.id = nodeData.pins.exec.in[i].id)
        );
        node.outputExecPins.forEach(
          (p, i) => (p.id = nodeData.pins.exec.out[i])
        );

        return node;
      })
    );

    for (let nodeData of data.nodes) {
      for (let pin of nodeData.pins.data.in) {
        if (!pin.connection) continue;

        let outPin = graph.nodes
          .find((n) => n.id === pin.connection?.node)
          ?.outputDataPins?.find((p) => p.id === pin.connection?.pin);
        let inPin = graph.nodes
          .find((n) => n.id === nodeData.id)
          ?.inputDataPins?.find((p) => p.id === pin.id);

        if (!outPin || !inPin) {
          continue;
        }

        graph.connectDataPins(outPin, inPin);
      }

      for (let pin of nodeData.pins.exec.in) {
        if (!pin.connection) continue;

        let outPin = graph.nodes
          .find((n) => n.id === pin.connection?.node)
          ?.outputExecPins?.find((p) => p.id === pin.connection?.pin);
        let inPin = graph.nodes
          .find((n) => n.id === nodeData.id)
          ?.inputExecPins?.find((p) => p.id === pin.id);

        if (!outPin || !inPin) {
          continue;
        }

        graph.connectExecPins(outPin, inPin);
      }
    }

    return graph;
  }
}
