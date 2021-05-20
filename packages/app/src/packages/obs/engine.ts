import { BaseEngine } from "@mg/core";
import OBSWS from "obs-websocket-js";

class OBSEngine extends BaseEngine {
  ws = new OBSWS();

  async initialize() {
    console.log('connecting')
    await this.ws.connect();
  }
}

const engine = new OBSEngine();
export default engine;
