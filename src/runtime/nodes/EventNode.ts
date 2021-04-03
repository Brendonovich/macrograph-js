import BaseNode from "./BaseNode";

export default abstract class EventNode<
  EventArgs extends object = {}
> extends BaseNode {
  __variant = "event" as const;
  execOutput = super.createOutputExecPin({ name: "" });

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
