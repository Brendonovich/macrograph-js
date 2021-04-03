import { InputDataPin } from "./InputDataPin";
import { InputExecPin } from "./InputExecPin";
import { OutputDataPin } from "./OutputDataPin";
import { OutputExecPin } from "./OutputExecPin";
import { PinType, types } from "./PinTypes";
import BasePin from "./BasePin";

export {
  BasePin,
  InputDataPin,
  OutputDataPin,
  InputExecPin,
  OutputExecPin,
  types,
};
export type { PinType };

export type Pin =
  | InputDataPin<PinType>
  | OutputDataPin<PinType>
  | InputExecPin
  | OutputExecPin;
