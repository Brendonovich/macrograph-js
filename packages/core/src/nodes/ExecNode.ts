import { BaseNode } from "./BaseNode";

export abstract class ExecNode extends BaseNode {
  __variant = "exec" as const;
  execInput = this.createInputExecPin({ name: "" });
  execOutput = this.createOutputExecPin({ name: "" });

  async _process() {
    await super.process();
    await this.execOutput.inputPin?.node.process();
  }
}
