import { ExecNode, nodeTypeVariants, PureNode, t } from "@mg/core";

const ToStrings = nodeTypeVariants(
  {
    Boolean: t.boolean(),
    Float: t.float(),
    Int: t.int(),
  },
  (name, type) => ({
    name: `To String (${name})`,
    nodeType: class extends PureNode {
      input = this.createInputDataPin({ type });
      output = this.createOutputDataPin({ type: t.string() });

      work() {
        this.output.value = this.input.value.toString();
      }
    },
  })
);

class Print extends ExecNode {
  valueInput = this.createInputDataPin({ name: "Value", type: t.string() });

  work() {
    console.log(this.valueInput.value.toString());
  }
}

export default {
  ...ToStrings,
  Print,
};
