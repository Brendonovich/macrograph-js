import { PureNode, types } from "@mg/core";

export default class Add extends PureNode {
  inputOne = this.createInputDataPin({
    type: types.int(),
  });
  inputTwo = this.createInputDataPin({
    type: types.int(),
  });

  output = this.createOutputDataPin({
    type: types.int(),
  });

  work() {
    this.output.value = this.inputOne.value + this.inputTwo.value;
  }
}
