import { useNumberField } from "@react-aria/numberfield";
import { useNumberFieldState } from "@react-stately/numberfield";
import { useRef } from "react";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export function GuestCountField({
  value,
  onChange,
  onBlur,
  invalid,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  invalid: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const numericValue = Math.max(1, Number(value) || 1);
  const state = useNumberFieldState({
    value: numericValue,
    minValue: 1,
    formatOptions: { useGrouping: true, maximumFractionDigits: 0 },
    locale: "en-US",
    onChange: (nextValue) => onChange(String(nextValue)),
  });
  const { inputProps } = useNumberField(
    {
      label: "Estimated guests",
      minValue: 1,
      value: numericValue,
      formatOptions: { useGrouping: true, maximumFractionDigits: 0 },
    },
    state,
    inputRef,
  );

  return (
    <InputGroup
      className={cn(
        "h-11 rounded-none border-0 border-brand-text/20 border-b bg-transparent shadow-none focus-within:border-brand-detail focus-within:ring-0",
        invalid && "border-destructive",
      )}
    >
      <InputGroupButton
        aria-label="Decrease estimated guests"
        aria-disabled={!state.canDecrement}
        disabled={!state.canDecrement}
        onClick={() => state.decrement()}
        className="size-10 rounded-none text-3xl text-brand-text/60 hover:bg-brand-detail/20 hover:text-brand-text"
      >
        -
      </InputGroupButton>
      <InputGroupInput
        {...inputProps}
        ref={inputRef}
        id="estimatedGuests"
        aria-invalid={invalid}
        onBlur={onBlur}
        className="h-full text-center font-body text-sm"
      />
      <InputGroupButton
        aria-label="Increase estimated guests"
        onClick={() => state.increment()}
        className="size-10 rounded-none text-3xl text-brand-text/60 hover:bg-brand-detail/20 hover:text-brand-text"
      >
        +
      </InputGroupButton>
    </InputGroup>
  );
}
