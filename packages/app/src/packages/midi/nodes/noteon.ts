import { EventNode, t } from "@mg/core";
import engine from "../engine";

interface Data {
  note: number;
  channel: number;
  velocity: number;
}

export class MIDINoteOn extends EventNode<Data> {
  noteOutput = this.createOutputDataPin({
    name: "Note",
    type: t.int,
  });
  velocityOutput = this.createOutputDataPin({
    name: "Velocity",
    type: t.int,
  });
  channelOutput = this.createOutputDataPin({
    name: "Channel",
    type: t.int,
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
