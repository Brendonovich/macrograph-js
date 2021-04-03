import { action, computed, observable } from "mobx";
import { ExecConnection } from "runtime/graph/Connection";
import BaseNode from "runtime/nodes/BaseNode";
import { OutputExecPin } from ".";
import BasePin from "./BasePin";

interface Args {
  name: string;
  id?: string;
}

export class InputExecPin extends BasePin {
  @observable outputPin: OutputExecPin | null = null;

  connection: ExecConnection | null = null;

  constructor(args: Args, node: BaseNode) {
    super(args, node);
  }

  @action
  disconnect() {
    if (this.outputPin) this.outputPin.inputPin = null;
    this.outputPin = null;
  }

  @computed
  get connected() {
    return this.outputPin !== null;
  }
}
