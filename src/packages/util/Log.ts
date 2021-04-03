import ExecNode from "runtime/nodes/ExecNode";
import { types } from "runtime/pins/PinTypes";

export class LogNode extends ExecNode {
  name = "Log";
  valueInput = this.createInputDataPin({ name: "Value", type: types.string() });

  work() {
    console.log(this.valueInput.value.toString());
  }
}
