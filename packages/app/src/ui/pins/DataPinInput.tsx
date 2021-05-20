import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { InputDataPin, PinType } from "@mg/core";

interface Props {
  pin: InputDataPin<PinType>;
}
const DataPinInput = observer(({ pin }: Props) => {
  if (pin.type.name === "array") return null;

  switch (pin.type.name) {
    case "int":
      return (
        <IntegerInput
          className={clsx(
            "w-14 px-1 bg-black rounded-md border border-gray-400",
            pin.connected && "opacity-0 pointer-events-none"
          )}
          onChange={(num) => pin.setUnconnectedValue(num)}
          initialValue={pin.unconnectedValue as number}
        />
      );
    case "float":
      return (
        <FloatInput
          className={clsx(
            "w-14 px-1 bg-black rounded-md border border-gray-400",
            pin.connected && "opacity-0 pointer-events-none"
          )}
          onChange={(num) => pin.setUnconnectedValue(num)}
          initialValue={pin.unconnectedValue as number}
        />
      );
    case "boolean":
      return (
        <BooleanInput
          initialValue={pin.unconnectedValue as boolean}
          className={clsx(
            "w-4 bg-black rounded-md border border-gray-400",
            pin.connected && "opacity-0 pointer-events-none"
          )}
          onChange={(checked) => pin.setUnconnectedValue(checked)}
        />
      );
    case "string":
      return (
        <input
          className={clsx(
            "w-16 px-1 bg-black rounded-md border border-gray-400",
            pin.connected ? "opacity-0 pointer-events-none" : undefined
          )}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => pin.setUnconnectedValue(e.target.value)}
          value={pin.unconnectedValue as number}
        />
      );

    default:
      throw new Error(`Cannot render input for pin type ${pin.type.name}`);
  }
});

export default DataPinInput;

const IntRegex = /^[-]?[0-9]*([e][0-9]*)?$/;
export const IntegerInput = forwardRef<
  HTMLInputElement,
  { onChange(value: number): void; className: string; initialValue?: number }
>(({ onChange, initialValue, ...props }, ref) => {
  const [value, setValue] = useState(initialValue?.toString() || "0");

  return (
    <input
      ref={ref}
      value={value}
      {...props}
      type="number"
      onKeyDown={(e) => e.stopPropagation()}
      onChange={(e) => {
        if (!IntRegex.test(e.target.value)) return;
        console.log('made it')
        setValue(e.target.value);

        if (isNaN(e.target.valueAsNumber)) return;
      }}
      onBlur={(e) => {
        if (!IntRegex.test(e.target.value)) return;
        setValue(e.target.value);

        if (isNaN(e.target.valueAsNumber)) {
          setValue("0");
          onChange(0);
          return;
        }

        onChange(e.target.valueAsNumber);
      }}
    />
  );
});

const FloatRegex = /^[0-9]*[.]?[0-9]*$/;
export const FloatInput = forwardRef<
  HTMLInputElement,
  { onChange(value: number): void; className: string; initialValue?: number }
>(({ onChange, initialValue, ...props }, ref) => {
  const [value, setValue] = useState(initialValue?.toString() || "0");

  return (
    <input
      ref={ref}
      value={value}
      {...props}
      type="number"
      onChange={(e) => {
        if (!FloatRegex.test(e.target.value)) return;
        setValue(e.target.value);

        if (isNaN(e.target.valueAsNumber)) return;
      }}
      onBlur={(e) => {
        if (!FloatRegex.test(e.target.value)) return;
        setValue(e.target.value);

        if (isNaN(e.target.valueAsNumber)) {
          setValue("0");
          onChange(0);
          return;
        }

        onChange(e.target.valueAsNumber);
      }}
    />
  );
});

const BooleanInput = forwardRef<
  HTMLInputElement,
  { onChange(value: boolean): void; className: string; initialValue?: boolean }
>(({ onChange, initialValue, ...props }, ref) => {
  const [value, setValue] = useState(initialValue || false);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={value}
      {...props}
      onKeyDown={(e) => e.stopPropagation()}
      onChange={(e) => {
        setValue(e.target.checked);
        onChange(e.target.checked);
      }}
    />
  );
});