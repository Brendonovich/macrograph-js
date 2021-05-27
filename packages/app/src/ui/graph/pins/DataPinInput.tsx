import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { InputDataPin, t } from "@mg/core";
import BooleanInput from "ui/inputs/boolean";
import IntegerInput from "ui/inputs/int";
import { FloatInput, StringInput } from "ui/inputs";

interface Props {
  pin: InputDataPin;
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
          value={pin.unconnectedValue as number}
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
          value={pin.unconnectedValue as number}
        />
      );
    case "boolean":
      return (
        <BooleanInput
          value={pin.unconnectedValue as boolean}
          className={clsx(
            "w-4 bg-black rounded-md border border-gray-400",
            pin.connected && "opacity-0 pointer-events-none"
          )}
          onChange={(checked) => pin.setUnconnectedValue(checked)}
        />
      );
    case "string":
      return (
        <StringInput
          className={clsx(
            "w-16 px-1 bg-black rounded-md border border-gray-400",
            pin.connected ? "opacity-0 pointer-events-none" : undefined
          )}
          onChange={(value) => pin.setUnconnectedValue(value)}
          value={pin.unconnectedValue as string}
        />
      );

    default:
      // @ts-ignore
      throw new Error(`Cannot render input for pin type ${pin.type.name}`);
  }
});

export default DataPinInput;
