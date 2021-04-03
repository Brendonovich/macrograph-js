import { action, observable } from "mobx";
import { nanoid } from "nanoid";
import {
  OutputDataPin,
  InputDataPin,
  OutputExecPin,
  InputExecPin,
} from "runtime/pins";
import { PinType } from "runtime/pins/PinTypes";

export default interface BaseNode {
  initialize?(): void;
}

export default abstract class BaseNode {
  @observable abstract name: string;
  @observable position: XY;
  id = nanoid();

  @observable selected = false;

  abstract __variant: "base" | "event" | "exec" | "value" = "base";

  constructor({ position, id }: NodeArgs) {
    this.position = position;
    if (id) this.id = id;

    this.initialize?.();
  }

  outputDataPins = observable<OutputDataPin<PinType>>([]);
  createOutputDataPin<T extends PinType>(args: { type: T; name: string }) {
    const pin = new OutputDataPin(args, this);
    this.outputDataPins.push(pin);
    return pin;
  }

  inputDataPins = observable<InputDataPin<PinType>>([]);
  createInputDataPin<T extends PinType>(args: { type: T; name: string }) {
    const pin = new InputDataPin(args, this);
    this.inputDataPins.push(pin);
    return pin;
  }

  outputExecPins = observable<OutputExecPin>([]);
  createOutputExecPin(args: { name: string }) {
    const pin = new OutputExecPin(args, this);
    this.outputExecPins.push(pin);
    return pin;
  }

  inputExecPins = observable<InputExecPin>([]);
  createInputExecPin(args: { name: string }) {
    const pin = new InputExecPin(args, this);
    this.inputExecPins.push(pin);
    return pin;
  }

  async process() {
    await Promise.all(
      this.inputDataPins.map(async (p) => {
        if (p.outputPin) {
          if (p.outputPin.node.__variant === "value")
            await p.outputPin.node.process();

          p.value = p.outputPin.value;
        } else {
          console.log(`Unconnected: ${p.unconnectedValue}`);
          p.value = p.unconnectedValue;
        }
      })
    );

    try {
      await this.work();
    } catch (e) {
      console.log(e);
    }
  }
  @action
  setPosition(newPos: XY) {
    this.position = newPos;
  }

  @action
  setSelected(selected?: true) {
    this.selected = !!selected;
  }

  abstract work(): void | Promise<void>;
}
