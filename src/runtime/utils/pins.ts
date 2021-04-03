import {
  Pin,
  InputDataPin,
  OutputDataPin,
  InputExecPin,
  OutputExecPin,
} from "runtime/pins";

export const pinIsData = (pin: Pin): pin is InputDataPin | OutputDataPin =>
  pin instanceof InputDataPin || pin instanceof OutputDataPin;
export const pinIsExec = (pin: Pin): pin is InputExecPin | OutputExecPin =>
  pin instanceof InputExecPin || pin instanceof OutputExecPin;
export const pinIsInput = (pin: Pin): pin is InputDataPin | InputExecPin =>
  pin instanceof InputDataPin || pin instanceof InputExecPin;
export const pinIsOutput = (pin: Pin): pin is OutputExecPin | OutputDataPin =>
  pin instanceof OutputExecPin || pin instanceof OutputDataPin;
export const pinsAreIOPair = (pin1: Pin, pin2: Pin) => {
  const firstIsInput = pinIsInput(pin1);
  const firstIsData = pinIsData(pin1);

  const ioPair = firstIsInput !== pinIsInput(pin2);
  const typeMatch = firstIsData === pinIsData(pin2);

  if (ioPair && typeMatch) {
    return {
      data: firstIsData,
      reverse: firstIsInput,
    };
  } else return false;
};
