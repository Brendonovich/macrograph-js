import { PureNode, t } from "@mg/core";

export default class Add extends PureNode {
  inputOne = this.createInputDataPin({
    type: t.int(),
  });
  inputTwo = this.createInputDataPin({
    type: t.int(),
  });

  output = this.createOutputDataPin({
    type: t.int(),
  });

  work() {
    this.output.value = this.inputOne.value + this.inputTwo.value;
  }
}
