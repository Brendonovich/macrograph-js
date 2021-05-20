import { computed, observable } from "mobx";
import EventEmitter from "events";
import WebMidi, { Input } from "webmidi";

class MIDIEngine extends EventEmitter {
  @observable input: { id: string; name: string } | null = null;
  @observable output: { id: string; name: string } | null = null;

  @computed
  get midiInput() {
    return WebMidi.inputs.find((i) => i.id === this.input?.id);
  }

  @computed
  get midiOutput() {
    return WebMidi.outputs.find((o) => o.id === this.output?.id);
  }

  async initialize() {
    await new Promise((res) => WebMidi.enable(res, true));

    WebMidi.addListener("connected", (d) => {
      const data = {
        id: d.port.id,
        name: d.port.name,
      };

      if (d.port.type === "input") {
        if (this.input !== null) return;
        // this.midiInput?.removeListener();

        this.input = data;
        console.log(this.input);
        console.log(this.midiInput);
        this.setupListeners(this.midiInput!);
      } else {
        this.output = data;
      }
    });

    WebMidi.addListener("disconnected", (d) => {});
  }

  setupListeners(input: Input) {
    input.addListener("noteon", "all", (d) => {
      console.log(d);
      this.emit("note-on", {
        note: d.note.number,
        velocity: d.rawVelocity,
        channel: d.channel,
      });
    });
  }
}

const engine = new MIDIEngine();
engine.initialize();

export default engine;
