import {
  BaseNode,
  nodeTypeVariants,
  OutputExecPin,
  PinType,
  types,
} from "@mg/core";
import React, { forwardRef, useState } from "react";
import { observable, reaction, runInAction, toJS } from "mobx";
import { registerDataRenderer } from "ui/sidebar/dataEditors";
import { FloatInput, IntegerInput } from "ui/pins/DataPinInput";
import { observer } from "mobx-react-lite";

const addPinNameGenerator = (type: PinType, index: number) => {
  switch (type.name) {
    case "int":
    case "float":
      return index;

    case "string":
      return `Case ${index}`;
    default:
      throw new Error(
        `addPinNameGenerator unimplemented for type ${type.name}`
      );
  }
};

const inputComponentMap = {
  int: IntegerInput,
  float: FloatInput,
  string: forwardRef<
    HTMLInputElement,
    { initialValue: string; onChange(v: string): void }
  >(({ onChange, initialValue, ...props }, ref) => {
    const [value, setValue] = useState(initialValue || "");

    return (
      <input
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        ref={ref}
      />
    );
  }),
} as any;

const SwitchCaseRow = observer(({ v, i, node, value }: any) => {
  const Input = inputComponentMap[node.switchType.name];
  return (
    <div className="flex flex-row w-full items-center" key={`${v} ${i}`}>
      <span className="flex-1">{i}</span>
      <Input
        style={{ flex: 2 }}
        className="text-black col-span-2 px-2 py-1 rounded-md bg-gray-200"
        initialValue={v}
        onChange={(newValue: any) => {
          value[i] = newValue;
        }}
      />
    </div>
  );
});

registerDataRenderer<any[], BaseSwitchNode>(
  "Switch Cases",
  ({ node, name, value }) => {
    return (
      <div className="w-full px-2 flex flex-col space-y-2">
        <span className="text-xl font-semibold">{name}</span>
        {value.map((v, i) => (
          <SwitchCaseRow
            v={v}
            i={i}
            value={value}
            node={node}
            key={`${v} ${i}`}
          />
        ))}
      </div>
    );
  }
);

abstract class BaseSwitchNode extends BaseNode {
  abstract switchType: PinType;
}

export default nodeTypeVariants(
  {
    Int: types.int(),
    Float: types.float(),
    String: types.string(),
  },
  (name, type) => ({
    name: `Switch On ${name}`,
    nodeType: class extends BaseSwitchNode {
      inputValue = this.createInputDataPin({
        name: "Value",
        type,
      });
      inputExec = this.createInputExecPin({ name: "" });

      switchType = type;

      outputExecs = new Map<typeof type.__valueType, OutputExecPin>([
        ["DEFAULT", this.createOutputExecPin({ name: "DEFAULT" })],
      ]);

      data = observable({
        "Switch Cases": [addPinNameGenerator(type, 0)],
      });

      initialize() {
        reaction(
          () => toJS(this.data["Switch Cases"]),
          (cases) => {
            runInAction(() => {
              const connectionPins = this.outputExecPins.map(
                (p) => p.connection?.input
              );
              const defaultConnectionPin = connectionPins.pop();

              const pinPositions = this.outputExecPins.map((p) => p.position);
              const defaultPosition = pinPositions.pop();

              this.clearOutputExecPins();

              const outputExecs = new Map<
                typeof type.__valueType,
                OutputExecPin
              >();

              cases.forEach((caseVal, index) => {
                const pin = this.createOutputExecPin({
                  name: caseVal.toString(),
                });

                if (pinPositions[index]) pin.setPosition(pinPositions[index]);

                if (connectionPins[index])
                  this.graph.connectExecPins(pin, connectionPins[index]);

                outputExecs.set(caseVal, pin);
              });

              const defaultPin = this.createOutputExecPin({ name: "DEFAULT" });
              defaultPin.setPosition(defaultPosition);
              if (defaultConnectionPin)
                this.graph.connectExecPins(defaultPin, defaultConnectionPin);

              outputExecs.set("DEFAULT", defaultPin);

              this.outputExecs = outputExecs;
            });
          },
          { fireImmediately: true }
        );
      }

      handleAddPin() {
        this.data["Switch Cases"].push(
          addPinNameGenerator(type, this.data["Switch Cases"].length)
        );
      }

      work() {
        const value = this.inputValue.value;

        const outExecPin = this.outputExecs.get(value);

        if (outExecPin) return outExecPin.connection?.inputNode?.process();
        else
          return this.outputExecs
            .get("DEFAULT")!
            .connection?.inputNode?.process();
      }
    },
  })
);
