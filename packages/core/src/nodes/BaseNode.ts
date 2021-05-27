import { Graph } from "graph";
import { action, observable, toJS } from "mobx";
import { nanoid } from "nanoid";

import { NodeArgs, SerializedNode, t, XY } from "types";
import {
  OutputDataPin,
  InputDataPin,
  OutputExecPin,
  InputExecPin,
} from "../pins";

export interface BaseNode {
  initialize?(): void;
  deinitialize?(): void;
  handleAddPin?(): void;
}

export abstract class BaseNode {
  @observable name: string;
  @observable position: XY;

  id = nanoid();
  type: string;
  graph: Graph;

  @observable selected = false;

  __variant: "base" | "event" | "exec" | "pure" = "base";

  constructor({ position, id, name, type, graph }: NodeArgs) {
    this.position = position;

    if (id) this.id = id;
    this.name = name;
    this.type = type;
    this.graph = graph;
  }

  outputDataPins = observable<OutputDataPin<t.Type>>([]);
  createOutputDataPin<T extends t.Type>(args: { type: T; name?: string }) {
    const pin = new OutputDataPin(args, this);
    this.outputDataPins.push(pin);
    return pin;
  }

  inputDataPins = observable<InputDataPin<t.Type>>([]);
  createInputDataPin<T extends t.Type>(args: { type: T; name?: string }) {
    const pin = new InputDataPin(args, this);
    this.inputDataPins.push(pin);
    return pin;
  }

  outputExecPins = observable<OutputExecPin>([]);
  createOutputExecPin(args: { name: string }) {
    const pin = new OutputExecPin(args, this);
    this.outputExecPins.push(pin);
    return pin;
  }

  clearOutputExecPins() {
    this.outputExecPins.forEach((p) => this.graph.disconnectPin(p));
    this.outputExecPins.clear();
  }

  inputExecPins = observable<InputExecPin>([]);
  createInputExecPin(args: { name: string }) {
    const pin = new InputExecPin(args, this);
    this.inputExecPins.push(pin);
    return pin;
  }

  disconnect() {
    this.inputDataPins.forEach((p) => p.disconnect());
    this.outputDataPins.forEach((p) => p.disconnect());
    this.inputExecPins.forEach((p) => p.disconnect());
    this.outputExecPins.forEach((p) => p.disconnect());
  }

  toJSON(): SerializedNode {
    return {
      name: this.name,
      type: this.type,
      position: toJS(this.position),
      id: this.id,
      data: this.data.map((d) => toJS(d.value)),
      pins: {
        data: {
          in: this.inputDataPins.map((pin) => ({
            id: pin.id,
            unconnectedValue: pin.unconnectedValue,
            ...(pin.connection ? { connection: pin.connection?.toJSON() } : {}),
          })),
          out: this.outputDataPins.map((pin) => pin.id),
        },
        exec: {
          in: this.inputExecPins.map((pin) => ({
            id: pin.id,
            ...(pin.connection ? { connection: pin.connection?.toJSON() } : {}),
          })),
          out: this.outputExecPins.map((pin) => pin.id),
        },
      },
    };
  }

  async process() {
    await Promise.all(
      this.inputDataPins.map(async (p) => {
        if (p.outputPin) {
          if (p.outputPin.node.__variant === "pure")
            await p.outputPin.node.process();

          p.value = p.outputPin.value;
        } else {
          p.value = p.unconnectedValue;
        }
      })
    );

    try {
      await this.work();
    } catch (e) {
      console.log(e);
    }
  }

  @action
  setPosition(newPos: XY) {
    this.position = newPos;
  }

  @action
  setSelected(selected?: true) {
    this.selected = !!selected;
  }

  abstract work(): any | Promise<any>;

  data: DataItem<t.Type>[] = [];

  createDataItem<T extends t.Type>(item: DataItem<T>) {
    const dataItem = observable(item);
    this.data.push(dataItem);
    return dataItem as DataItem<T>;
  }
}

export interface DataItem<T extends t.Type> {
  name: string;
  type: T;
  value: t.TypeOf<T["type"]>;
}
