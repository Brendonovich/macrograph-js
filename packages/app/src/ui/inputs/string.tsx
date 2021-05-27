import { forwardRef } from "react";

const StringInput = forwardRef<
  HTMLInputElement,
  { onChange(value: string): void; className: string; value?: string }
>(({ onChange, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type="text"
      onKeyDown={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

export default StringInput;
