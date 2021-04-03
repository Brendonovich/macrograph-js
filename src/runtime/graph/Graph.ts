import { action, observable } from "mobx";
import BaseNode from "runtime/nodes/BaseNode";
import {
  OutputDataPin,
  InputDataPin,
  OutputExecPin,
  InputExecPin,
  PinType,
  Pin,
} from "runtime/pins";
import { pinsAreIOPair } from "runtime/utils/pins";
import { DataConnection, ExecConnection } from "./Connection";

export class Graph {
  nodes = observable<BaseNode>([]);
  connections = observable<DataConnection<PinType> | ExecConnection>([]);

  @action
  addNode(node: BaseNode) {
    this.nodes.push(node);
  }

  @action
  connectDataPins<T extends PinType>(
    output: OutputDataPin<T>,
    input: InputDataPin<T>
  ) {
    output.disconnect();
    input.disconnect();

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
    output.disconnect();
    input.disconnect();

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
    console.log(conn);

    if (conn) {
      conn.input.disconnect();
      conn.output.disconnect();

      conn.input.connection = null;

      if (conn instanceof DataConnection) conn.output.connections.remove(conn);
      else conn.output.connection = null;

      this.connections.remove(conn);
    }
  }
}
