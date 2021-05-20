import { registerPackage } from "@mg/core";

import engine from "./engine";
import { SceneChanged } from "./nodes/sceneChanged";
import { SetCurrentScene } from "./nodes/setCurrentScene";

registerPackage({
  name: "OBS",
  nodes: {
    "OBS Scene Changed": SceneChanged,
    "OBS Set Current Scene": SetCurrentScene,
  },
  engine,
});
