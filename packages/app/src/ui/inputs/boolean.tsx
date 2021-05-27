import { forwardRef, useState } from "react";

const BooleanInput = forwardRef<
  HTMLInputElement,
  { onChange(value: boolean): void; className: string; value?: boolean }
>(({ onChange, value, ...props }, ref) => {
  const [_value, setValue] = useState(value || false);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={_value}
      {...props}
      onKeyDown={(e) => e.stopPropagation()}
      onChange={(e) => {
        setValue(e.target.checked);
        onChange(e.target.checked);
      }}
    />
  );
});

export default BooleanInput;