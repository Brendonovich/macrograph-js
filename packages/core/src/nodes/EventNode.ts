import { NodeArgs } from "types";
import { BaseNode } from "./BaseNode";

export abstract class EventNode<
  EventArgs extends object = {}
> extends BaseNode {
  __variant = "event" as const;
  execOutput = this.createOutputExecPin({ name: "" });

  constructor(args: NodeArgs) {
    super(args);
  }

  abstract fire(args: EventArgs): void;

  start(args: EventArgs) {
    this.fire(args);
    this.execOutput.inputPin?.node.process();
  }

  work() {}
}
