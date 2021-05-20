import React from "react";
import clsx from "clsx";
import { Observer } from "mobx-react-lite";
import { PinType, OutputDataPin, InputDataPin } from "@mg/core";
import { usePin } from "ui/hooks";

const isOutputPin = (pin: OutputDataPin | InputDataPin): pin is OutputDataPin =>
  pin instanceof OutputDataPin;

export const pinColors: Record<
  PinType["name"],
  { base: string; active: string }
> = {
  int: {
    active: "border-teal-400 bg-teal-400",
    base: "border-teal-400 hover:bg-teal-400",
  },
  float: {
    active: "border-green-500 bg-green-500",
    base: "border-green-500 hover:bg-green-500",
  },
  string: {
    active: "border-pink-500 bg-pink-500",
    base: "border-pink-500 hover:bg-pink-500",
  },
  boolean: {
    active: "border-red-600 bg-red-600",
    base: "border-red-600 hover:bg-red-600",
  },
};

interface Props {
  pin: OutputDataPin | InputDataPin;
}
const DataPin = ({ pin }: Props) => {
  const { props, ref } = usePin(pin);
  const isOutput = isOutputPin(pin);
  const colors = pinColors[pin.type.name];

  return (
    <Observer>
      {() => (
        <div className="flex items-center space-x-2 h-6">
          {isOutput && <p>{pin.name}</p>}
          <div
            ref={ref}
            {...props}
            className={clsx(
              `w-4 h-4 border-2`,
              pin.type.name !== "array" && "rounded-full",
              pin.connected || pin.selected ? colors.active : colors.base
            )}
          />
          {!isOutput && <p>{pin.name}</p>}
        </div>
      )}
    </Observer>
  );
};

export default DataPin;
