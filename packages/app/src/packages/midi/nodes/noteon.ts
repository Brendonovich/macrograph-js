import { EventNode, types } from "@mg/core";
import engine from "../engine";

interface Data {
  note: number;
  channel: number;
  velocity: number;
}

export class MIDINoteOn extends EventNode<Data> {
  noteOutput = this.createOutputDataPin({
    name: "Note",
    type: types.int(),
  });
  velocityOutput = this.createOutputDataPin({
    name: "Velocity",
    type: types.int(),
  });
  channelOutput = this.createOutputDataPin({
    name: "Channel",
    type: types.int(),
  });

  initialize() {
    engine.on("note-on", (d) => this.start(d));
  }

  fire({ note, velocity, channel }: Data) {
    this.noteOutput.value = note;
    this.velocityOutput.value = velocity;
    this.channelOutput.value = channel;
  }
}
