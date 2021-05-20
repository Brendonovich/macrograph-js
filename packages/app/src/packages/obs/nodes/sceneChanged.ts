import { EventNode, types } from "@mg/core";
import engine from "../engine";

interface Data {
  name: string;
}
export class SceneChanged extends EventNode<Data> {
  nameOutput = this.createOutputDataPin({
    name: "Scene",
    type: types.string(),
  });

  initialize() {
    engine.ws.on("SwitchScenes", (d) => this.start({ name: d["scene-name"] }));
  }

  fire(data: Data) {
    this.nameOutput.value = data.name;
  }
}
