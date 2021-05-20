import { action, computed, observable } from "mobx";

import { BaseNode } from "../nodes";
import { DataConnection } from "../graph";
import { InputDataPin } from ".";
import BasePin from "./BasePin";
import { PinType, TypeOf } from "./PinTypes";

export class OutputDataPin<
  T extends PinType = PinType,
  V = TypeOf<T>
> extends BasePin {
  type: T;
  value: V;

  connections = observable<DataConnection<T>>([]);
  inputPins = observable<InputDataPin<T>>([]);

  @action
  disconnect() {
    this.inputPins.forEach((p) => (p.outputPin = null));
    this.inputPins.clear();
  }

  @computed
  get connected() {
    return this.inputPins.length > 0;
  }

  constructor(
    args: { id?: string; name?: string; type: T; value?: V },
    node: BaseNode
  ) {
    super(args, node);
    this.value = args.value ?? (args.type.defaultValue() as unknown as V);
    this.type = args.type;
  }
}
