import { BaseNode } from "./BaseNode";

export abstract class PureNode extends BaseNode {
  __variant = "pure" as const;
  createInputExecPin(): any {
    throw new Error("Value node cannot be executed!");
  }

  createOutputExecPin(): any {
    throw new Error("Value node cannot be executed!");
  }
}
