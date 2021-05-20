import { action, computed, observable } from "mobx";
import { ExecConnection } from "../graph";
import { BaseNode } from "../nodes";
import { InputExecPin } from ".";
import BasePin from "./BasePin";

interface Args {
  name: string;
  id?: string;
}

export class OutputExecPin extends BasePin {
  @observable inputPin: InputExecPin | null = null;

  connection: ExecConnection | null = null;

  constructor(args: Args, node: BaseNode) {
    super(args, node);
  }

  @action
  disconnect() {
    if (this.inputPin) this.inputPin.outputPin = null;
    this.inputPin = null;
  }

  @computed
  get connected() {
    return this.inputPin !== null;
  }
}
