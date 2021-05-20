import { ExecNode, nodeTypeVariants, PureNode, types } from "@mg/core";

const ToStrings = nodeTypeVariants(
  {
    Boolean: types.boolean(),
    Float: types.float(),
    Int: types.int(),
  },
  (name, type) => ({
    name: `To String (${name})`,
    nodeType: class extends PureNode {
      input = this.createInputDataPin({ type });
      output = this.createOutputDataPin({ type: types.string() });

      work() {
        this.output.value = this.input.value.toString();
      }
    },
  })
);

class Print extends ExecNode {
  valueInput = this.createInputDataPin({ name: "Value", type: types.string() });

  work() {
    console.log(this.valueInput.value.toString());
  }
}

export default {
  ...ToStrings,
  Print,
};
