import BaseNode from "./BaseNode";

export default abstract class ValueNode extends BaseNode {
  __variant = "value" as const;
  createInputExecPin(): any {
    throw new Error("Value node cannot be executed!");
  }

  createOutputExecPin(): any {
    throw new Error("Value node cannot be executed!");
  }
}
