import { action, computed, observable } from "mobx";

import { DataConnection } from "../graph";
import { BaseNode } from "../nodes";
import { OutputDataPin } from ".";
import BasePin from "./BasePin";
import { t } from "../types";
export class InputDataPin<
  T extends t.Type = t.Type,
  V = t.TypeOf<T>
> extends BasePin {
  type: T;
  value: V;

  connection: DataConnection<T> | null = null;

  @observable unconnectedValue: V;

  @action
  setUnconnectedValue(value: V) {
    this.unconnectedValue = value;
  }

  @observable outputPin: OutputDataPin<T, V> | null = null;

  @computed
  get connected() {
    return this.outputPin !== null;
  }

  @action
  disconnect() {
    if (this.outputPin) this.outputPin.inputPins.remove(this as any);

    this.outputPin = null;
  }

  constructor(
    args: {
      name?: string;
      id?: string;
      type: T;
      value?: V;
      unconnectedValue?: V;
    },
    node: BaseNode
  ) {
    super(args, node);
    this.type = args.type;

    // TODO: Default values
    const defaultValue = "" as unknown as V;
    this.value = args.value ?? defaultValue;
    this.unconnectedValue = args.unconnectedValue ?? defaultValue;
  }
}
