import { registerPackage } from "@mg/core";

import engine from "./engine";
import { MIDIDeviceConnected } from "./nodes/deviceConnected";
import { MIDINoteOn } from "./nodes/noteon";

registerPackage({
  name: "Midi",
  nodes: {
    "MIDI Device Connected": MIDIDeviceConnected,
    "Note On": MIDINoteOn,
  },
  engine,
});
