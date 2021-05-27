import { InputDataPin } from "./InputDataPin";
import { InputExecPin } from "./InputExecPin";
import { OutputDataPin } from "./OutputDataPin";
import { OutputExecPin } from "./OutputExecPin";
import BasePin from "./BasePin";
import { t } from "types";

export { BasePin, InputDataPin, OutputDataPin, InputExecPin, OutputExecPin };

export type Pin =
  | InputDataPin<t.Type>
  | OutputDataPin<t.Type>
  | InputExecPin
  | OutputExecPin;
