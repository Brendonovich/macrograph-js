import { ExecNode, t } from "@mg/core";
import engine from "../engine";

export class SetCurrentScene extends ExecNode {
  sceneInput = this.createInputDataPin({
    name: "Scene",
    type: t.string(),
  });

  async work() {
    await engine.ws.send("SetCurrentScene", {
      "scene-name": this.sceneInput.value,
    });
  }
}
