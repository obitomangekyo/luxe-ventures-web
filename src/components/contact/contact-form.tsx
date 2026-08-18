import { isSubmissionError } from "@formspree/core";
import { useSubmit } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Controller, type UseFormReturn, useForm as useHookForm } from "react-hook-form";
import { toast } from "sonner";
import ArrowNE from "@/assets/svgs/doodle-icons/arrow-ne.svg?react";
import { default as CalendarDays } from "@/assets/svgs/doodle-icons/calendar.svg?react";
import Tick from "@/assets/svgs/doodle-icons/tick.svg?react";
import Loader2 from "@/assets/svgs/loader-2.svg?react";
import { GuestCountField } from "@/components/contact/guest-count-field";
import { InspirationUploader } from "@/components/contact/inspiration-uploader";
import { PhoneField } from "@/components/contact/phone-field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { type Inquiry, initialInquiry, inquirySchema } from "@/types/inquiry";

function formatDate(value: string) {
  if (!value) return "Select an event date";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

type InquiryForm = UseFormReturn<Inquiry>;
type TextInquiryField = Exclude<keyof Inquiry, "inspirationImages">;

type InquiryFieldErrors = Omit<Inquiry, "inspirationImages">;

function FieldInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  control: InquiryForm["control"];
  name: TextInquiryField;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor={name}
            className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.18em]"
          >
            {label} {required && <span className="text-brand-detail">*</span>}
          </FieldLabel>
          <FieldContent>
            <Input
              {...field}
              id={name}
              type={type}
              required={required}
              inputMode={name === "estimatedGuests" ? "numeric" : undefined}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              onChange={(event) => field.onChange(event.target.value)}
              className="h-11 rounded-none border-0 border-brand-text/20 border-b bg-transparent px-0 font-body text-sm shadow-none placeholder:text-brand-text/35 focus-visible:border-brand-detail focus-visible:ring-0"
            />
            <FieldError errors={[fieldState.error]} />
          </FieldContent>
        </Field>
      )}
    />
  );
}

function DateField({ control }: { control: InquiryForm["control"] }) {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      control={control}
      name="eventDate"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor="eventDate"
            className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.18em]"
          >
            Event date <span className="text-brand-detail">*</span>
          </FieldLabel>
          <FieldContent>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <Button
                    id="eventDate"
                    variant="outline"
                    className={cn(
                      "h-11 w-full justify-between rounded-none border-0 border-brand-text/20 border-b bg-transparent px-0 font-body font-normal text-brand-text text-sm shadow-none hover:bg-transparent focus-visible:border-brand-detail focus-visible:ring-0",
                      !field.value && "text-brand-text/35",
                    )}
                  />
                }
              >
                <span>{formatDate(field.value)}</span>
                <CalendarDays className="w-4 text-brand-detail" />
              </PopoverTrigger>
              <PopoverContent
                className="w-auto rounded-none border-brand-detail/60 bg-brand-bg p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(`${field.value}T00:00:00`) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(
                        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
                      );
                      setOpen(false);
                    }
                  }}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
            <FieldError errors={[fieldState.error]} />
          </FieldContent>
        </Field>
      )}
    />
  );
}

const eventTypeOptions = {
  Proposal: "Proposal",
  "Wedding reception": "Wedding reception",
  Birthday: "Birthday",
  "Baby shower": "Baby shower",
  "Corporate gathering": "Corporate gathering",
  "Bridal shower": "Bridal shower",
  "Custom event": "Custom event",
};

function EventTypeField({ control }: { control: InquiryForm["control"] }) {
  return (
    <Controller
      control={control}
      name="eventType"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor="eventType"
            className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.18em]"
          >
            Event type
          </FieldLabel>
          <FieldContent>
            <Select
              items={eventTypeOptions}
              value={field.value}
              onValueChange={(value) => field.onChange(value ?? "")}
            >
              <SelectTrigger
                id="eventType"
                aria-invalid={fieldState.invalid}
                className="h-11! w-full rounded-none border-0 border-brand-text/20 border-b bg-transparent px-0 font-body text-sm shadow-none focus:border-brand-detail focus:ring-0"
              >
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-brand-detail/60 bg-brand-bg font-body">
                {Object.entries(eventTypeOptions).map(([key, value]) => (
                  <SelectItem className="rounded-none" key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[fieldState.error]} />
          </FieldContent>
        </Field>
      )}
    />
  );
}

export function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useHookForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: initialInquiry,
    mode: "onBlur",
  });

  const [submitSucceeded, setSubmitSucceeded] = useState(false);

  const submit = useSubmit<InquiryFieldErrors>(env.VITE_FORMSPREE_FORM_ID);

  async function submitInquiry(value: Inquiry) {
    const recaptchaToken = await executeRecaptcha?.("contact_form");

    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("email", value.email);
    formData.append("phone", value.phone);
    formData.append("eventDate", formatDate(value.eventDate));
    formData.append("eventType", value.eventType);
    formData.append("message", value.message);
    if (value.estimatedGuests) formData.append("estimatedGuests", value.estimatedGuests);
    if (value.desiredColors) formData.append("desiredColors", value.desiredColors);
    if (recaptchaToken) formData.append("g-recaptcha-response", recaptchaToken);
    if (value.inspirationImages && value.inspirationImages.length > 0) {
      Array.from(value.inspirationImages).forEach((file) => {
        formData.append("inspirationImages", file);
      });
    }

    const result = await submit(formData);

    if (isSubmissionError(result)) {
      const formErrors = result.getFormErrors();
      if (formErrors.length) {
        form.setError("root", { message: formErrors.map((e) => e.message).join(", ") });
      }
      for (const [field, fieldErrors] of result.getAllFieldErrors()) {
        if (field in initialInquiry) {
          form.setError(field as keyof Inquiry, {
            message: fieldErrors.map((e) => e.message).join(", "),
          });
        }
      }
      toast.error("We couldn't send your brief.", {
        description: "Please try again or email us directly.",
      });
      return;
    }

    setSubmitSucceeded(true);
    toast.success("Your event brief has arrived.", {
      description: "We will be in touch shortly to begin imagining it with you.",
    });
  }

  if (submitSucceeded)
    return (
      <div className="border border-brand-detail bg-white/40 p-8 sm:p-12">
        <Tick className="mb-6 h-7 text-brand-detail" />
        <h3 className="text-3xl">Your brief is in our hands.</h3>
        <p className="mt-4 max-w-md font-body text-brand-text/65 text-sm leading-7">
          Thank you for trusting us with your vision. We&apos;ll be in touch shortly.
        </p>
        <Button
          type="button"
          onClick={() => {
            setSubmitSucceeded(false);
            form.reset(initialInquiry);
          }}
          className="mt-8 h-10 rounded-none border border-brand-text bg-transparent px-5 font-body text-[10px] text-brand-text uppercase tracking-[0.2em] shadow-none hover:bg-brand-detail"
        >
          Send another brief
        </Button>
      </div>
    );

  return (
    <form
      className="space-y-7"
      onSubmit={form.handleSubmit(submitInquiry)}
      noValidate
      aria-label="Luxe Ventures event inquiry form"
      {...(env.VITE_FORMSPREE_FORM_ID && {
        action: `https://formspree.io/f/${env.VITE_FORMSPREE_FORM_ID}`,
      })}
      method="POST"
      encType="multipart/form-data"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <FieldInput
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Your name"
          required
        />
        <FieldInput
          control={form.control}
          name="email"
          label="Email address"
          placeholder="you@example.com"
          type="email"
          required
        />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <Controller
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => <PhoneField field={field} error={fieldState.error} />}
        />
        <DateField control={form.control} />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <EventTypeField control={form.control} />
        <Controller
          control={form.control}
          name="estimatedGuests"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="estimatedGuests"
                className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.18em]"
              >
                Estimated guests
              </FieldLabel>
              <FieldContent>
                <GuestCountField
                  value={field.value || "1"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
      </div>
      <FieldInput
        control={form.control}
        name="desiredColors"
        label="Preferred palette"
        placeholder="Soft lavender, gold accents, crisp whites"
      />
      {/** biome-ignore lint/complexity/useSimplifiedLogicExpression: () */}
      {false && (
        <Controller
          control={form.control}
          name="inspirationImages"
          render={({ field, fieldState }) => (
            <InspirationUploader field={field} fieldState={fieldState} />
          )}
        />
      )}
      <Controller
        control={form.control}
        name="message"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="message"
              className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.18em]"
            >
              Tell us your vision <span className="text-brand-detail">*</span>
            </FieldLabel>
            <FieldContent>
              <Textarea
                {...field}
                id="message"
                rows={4}
                required
                aria-invalid={fieldState.invalid}
                placeholder="Describe the feeling, the setting, or the details you are dreaming about..."
                className="min-h-32 resize-none rounded-none border-0 border-brand-text/20 border-b bg-transparent px-0 font-body text-sm shadow-none focus-visible:border-brand-detail focus-visible:ring-0"
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-12 rounded-none border border-brand-text bg-brand-text px-7 font-body text-[10px] text-brand-bg uppercase tracking-[0.2em] shadow-none hover:bg-brand-detail hover:text-brand-text"
        >
          {form.formState.isSubmitting ? "Sending your brief…" : "Submit event brief"}
          {form.formState.isSubmitting ? (
            <Loader2 className="ml-3 size-4 animate-spin" />
          ) : (
            <ArrowNE className="ml-3 w-4" />
          )}
        </Button>
        {form.formState.errors.root && (
          <p role="alert" className="font-body text-destructive text-xs">
            {form.formState.errors.root.message}
          </p>
        )}
      </div>
    </form>
  );
}
