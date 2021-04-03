import { computed } from "mobx";
import { nanoid } from "nanoid";
import BaseNode from "runtime/nodes/BaseNode";
import {
  InputDataPin,
  InputExecPin,
  OutputDataPin,
  OutputExecPin,
} from "runtime/pins";
import BasePin from "runtime/pins/BasePin";
import { PinType } from "runtime/pins/PinTypes";

export class Connection<O extends BasePin, I extends BasePin> {
  id = nanoid();

  output: O;
  outputNode: BaseNode;
  input: I;
  inputNode: BaseNode;

  constructor(args: { output: O; input: I }) {
    this.output = args.output;
    this.outputNode = args.output.node;
    this.input = args.input;
    this.inputNode = args.input.node;
  }

  @computed
  get path() {
    return {
      x1: this.output.position.x,
      y1: this.output.position.y,
      x2: this.input.position.x,
      y2: this.input.position.y,
    };
  }
}

export class DataConnection<T extends PinType> extends Connection<
  OutputDataPin<T>,
  InputDataPin<T>
> {
  type: PinType;

  constructor(args: {
    output: OutputDataPin<T>;
    input: InputDataPin<T>;
    type: PinType;
  }) {
    super(args);
    this.type = args.type;
  }
}
export class ExecConnection extends Connection<OutputExecPin, InputExecPin> {}
