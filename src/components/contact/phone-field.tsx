import { useId } from "react";
import type { ControllerRenderProps } from "react-hook-form";
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
  error,
}: {
  field: ControllerRenderProps<Inquiry, "phone">;
  error?: { message?: string };
}) {
  const id = useId();
  return (
    <Field data-invalid={!!error}>
      <FieldLabel
        htmlFor={id}
        className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.18em]"
      >
        Phone number <span className="text-brand-detail">*</span>
      </FieldLabel>
      <FieldContent>
        <Input
          {...field}
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={!!error}
          placeholder="(201) 555-0123"
          value={formatPhone(field.value)}
          onChange={(event) => field.onChange(event.target.value.replace(/\D/g, "").slice(0, 10))}
          className="h-11 rounded-none border-0 border-brand-text/20 border-b bg-transparent px-0 font-body text-sm shadow-none placeholder:text-brand-text/35 focus-visible:border-brand-detail focus-visible:ring-0"
        />
        <FieldError errors={[error]} />
      </FieldContent>
    </Field>
  );
}
