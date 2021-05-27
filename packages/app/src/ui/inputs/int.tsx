import { forwardRef, useCallback, useState } from "react";

const IntRegex = /^[-]?[0-9]*([e][0-9]*)?$/;
const IntegerInput = forwardRef<
  HTMLInputElement,
  { onChange(value: number): void; className: string; value?: number }
>(({ onChange, value, ...props }, ref) => {
  const [_value, setValue] = useState(value?.toString() || "0");

  const handleBlur = useCallback(
    (e: any) => {
      if (!IntRegex.test(e.target.value)) return;

      let num = parseInt(e.target.value);

      if (isNaN(num)) {
        setValue("0");
        onChange(0);
        return;
      }

      setValue(num.toString());
      onChange(num);
    },
    [onChange]
  );

  return (
    <input
      ref={ref}
      value={_value}
      {...props}
      onKeyDown={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.preventDefault();
        if (e.target.value === "") setValue("");

        if (!IntRegex.test(e.target.value)) return;
        setValue(e.target.value);

        let num = parseInt(e.target.value);

        if (isNaN(num)) return;

        onChange(num);
      }}
      onBlur={handleBlur}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleBlur(e);
        }
      }}
    />
  );
});

export default IntegerInput;
