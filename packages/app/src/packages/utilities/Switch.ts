import { BaseNode, nodeTypeVariants, OutputExecPin, t } from "@mg/core";
import { reaction, runInAction, toJS } from "mobx";

const addPinNameGenerator = (type: t.Type, index: number) => {
  switch (type.name) {
    case "float":
    case "int":
      return index;
    case "string":
      return `Case ${index}`;
    default:
      throw new Error(`addPinNameGenerator unimplemented for type ${type}`);
  }
};

abstract class BaseSwitchNode extends BaseNode {
  abstract switchType: t.Type;
}

export default nodeTypeVariants(
  {
    Int: t.int(),
    Float: t.float(),
    String: t.string(),
  },
  (name, type) => ({
    name: `Switch On ${name}`,
    nodeType: class extends BaseSwitchNode {
      inputValue = this.createInputDataPin({
        name: "Value",
        type,
      });
      inputExec = this.createInputExecPin({ name: "" });

      outputExecs: { cond: string; pin: OutputExecPin }[] = [];
      defaultExec = this.createOutputExecPin({ name: "Default" });

      switchCases = this.createDataItem({
        name: "Switch Cases",
        type: t.array(type).unique(),
        value: [addPinNameGenerator(type, 0)],
      });
      caseSensitive =
        type.name === "string"
          ? this.createDataItem({
              name: "Case Sensitive",
              type: t.boolean(),
              value: true,
            })
          : undefined;

      switchType = type;

      initialize() {
        reaction(
          () =>
            [toJS(this.switchCases.value), this.caseSensitive?.value] as any,
          ([cases, caseSensitive]: [
            t.TypeOf<typeof type>[],
            boolean | undefined
          ]) => {
            runInAction(() => {
              const connectionPins = this.outputExecPins.map(
                (p) => p.connection?.input
              );
              const defaultConnectionPin = connectionPins.pop();

              const pinPositions = this.outputExecPins.map((p) => p.position);
              const defaultPosition = pinPositions.pop();

              this.clearOutputExecPins();

              const outputExecs: { cond: string; pin: OutputExecPin }[] = [];

              cases.forEach((caseVal, index) => {
                let name = caseVal.toString();

                const pin = this.createOutputExecPin({
                  name,
                });

                if (pinPositions[index]) pin.setPosition(pinPositions[index]);

                if (connectionPins[index])
                  this.graph.connectExecPins(pin, connectionPins[index]);

                if (caseSensitive) name = name.toLowerCase();

                outputExecs.push({ cond: name, pin });
              });

              this.outputExecs = outputExecs;

              const defaultPin = this.createOutputExecPin({
                name: "DEFAULT",
              });
              defaultPin.setPosition(defaultPosition);
              if (defaultConnectionPin)
                this.graph.connectExecPins(defaultPin, defaultConnectionPin);
            });
          },
          { fireImmediately: true }
        );
      }

      handleAddPin() {
        this.switchCases.value.push(
          addPinNameGenerator(type, this.switchCases.value.length)
        );
      }

      work() {
        let value = this.inputValue.value.toString();
        if (this.caseSensitive?.value === true) value = value.toLowerCase();

        const matchingPins = this.outputExecs.filter((o) => o.cond === value);

        if (matchingPins.length > 0)
          return Promise.all(
            matchingPins.map(({ pin }) => pin.connection?.inputNode.process())
          );
        else return this.defaultExec.connection?.inputNode?.process();
      }
    },
  })
);
