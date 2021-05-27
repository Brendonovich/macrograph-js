import { EventNode, t } from "@mg/core";

interface EventArgs {
  value: number;
}
export class Test extends EventNode<EventArgs> {
  valueOutput = this.createOutputDataPin({
    type: t.int(),
    name: "Value",
  });

  initialize() {
    let i = 0;
    setInterval(() => this.start({ value: i++ }), 1000);
  }

  fire(args: EventArgs) {
    this.valueOutput.value = args.value;
  }
}
