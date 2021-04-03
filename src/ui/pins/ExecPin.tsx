import React from "react";
import clsx from "clsx";
import { Observer } from "mobx-react-lite";
import { usePin } from "ui/hooks";
import { InputExecPin, OutputExecPin } from "runtime/pins";

interface Props {
  pin: InputExecPin | OutputExecPin;
}

const ExecPin = ({ pin }: Props) => {
  const { props, ref } = usePin(pin);

  return (
    <Observer>
      {() => (
        <div
          ref={ref}
          className={clsx(
            "w-5 h-5 my-1 bg-transparent flex justify-start flex-row"
          )}
          {...props}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={clsx(
                "text-white hover:fill-current",
                (pin.connected || pin.selected) && "fill-current"
              )}
              d="M9.92693 10.1339L2.98198 16.1484C2.01051 16.9897 0.5 16.2996 0.5 15.0145L0.5 2.9855C0.5 1.70037 2.01052 1.01029 2.98198 1.8516L9.92693 7.86611C10.6176 8.46426 10.6176 9.53574 9.92693 10.1339Z"
              stroke="white"
              strokeWidth={1.5}
            />
          </svg>
        </div>
      )}
    </Observer>
  );
};

export default ExecPin;
