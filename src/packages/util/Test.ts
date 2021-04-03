import EventNode from "runtime/nodes/EventNode";
import { types } from "runtime/pins/PinTypes";

interface EventArgs {
  value: string;
}
export class TestNode extends EventNode<EventArgs> {
  name = "Test";

  valueOutput = this.createOutputDataPin({
    type: types.string(),
    name: "Value",
  });

  initialize() {
    let i = 0;
    setInterval(() => this.start({ value: "" + i++ }), 1000);
  }

  fire(args: EventArgs) {
    this.valueOutput.value = args.value;
  }
}
