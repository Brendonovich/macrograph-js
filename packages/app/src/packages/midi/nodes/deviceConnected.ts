import { EventNode, types } from "@mg/core";
import WebMidi from "webmidi";

interface Data {
  name: string;
  isInput: boolean;
}

export class MIDIDeviceConnected extends EventNode<Data> {
  nameOutput = this.createOutputDataPin({
    name: "Name",
    type: types.string(),
  });
  isInputOutput = this.createOutputDataPin({
    name: "Is Input",
    type: types.boolean(),
  });

  initialize() {
    WebMidi.addListener("connected", (d) =>
      this.start({ name: d.port.name, isInput: d.port.type === "input" })
    );
  }

  fire(data: Data) {
    this.nameOutput.value = data.name;
    this.isInputOutput.value = data.isInput;
  }
}
