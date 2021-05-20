import { registerPackage } from "@mg/core";

import { Test } from "./Test";
import String from "./String";
import Switch from "./Switch";

registerPackage({
  name: "Utilities",
  nodes: { Test, String, Switch },
});
