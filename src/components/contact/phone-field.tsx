import type { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Inquiry } from "@/types/inquiry";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function PhoneField({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<Inquiry, "phone">;
  fieldState: ControllerFieldState;
}) {
  return (
    <Field
      className="col-span-full font-semibold text-sm sm:col-span-1"
      data-invalid={fieldState.invalid}
    >
      <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
      <FieldContent>
        <Input
          {...field}
          id={field.name}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={fieldState.invalid}
          placeholder="(201) 555-0123"
          value={formatPhone(field.value)}
          onChange={(event) => field.onChange(event.target.value.replace(/\D/g, "").slice(0, 10))}
          className="h-12 rounded-none border border-black/20 px-4 outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
        />
        <FieldError errors={[fieldState.error]} />
      </FieldContent>
    </Field>
  );
}
