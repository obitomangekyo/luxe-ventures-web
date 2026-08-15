import { isSubmissionError } from "@formspree/core";
import { useSubmit } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight01Icon,
  Calendar05Icon,
  LoaderPinwheelIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import type { UseFormReturn } from "react-hook-form";
import { Controller, useForm as useHookForm } from "react-hook-form";
import { toast } from "sonner";
import { Eyebrow } from "@/components/site/eyebrow";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { type Inquiry, initialInquiry, inquirySchema } from "@/types/inquiry";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GuestCountField } from "./guest-count-field";
import { InspirationUploader } from "./inspiration-uploader";
import { PhoneField } from "./phone-field";

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

type InquiryFieldErrors = Omit<Inquiry, "inspirationImages">;

function DateField({ control }: { control: InquiryForm["control"] }) {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      control={control}
      name="eventDate"
      render={({ field, fieldState }) => (
        <Field
          className="col-span-full font-semibold text-sm sm:col-span-1"
          data-invalid={fieldState.invalid}
        >
          <FieldLabel htmlFor="eventDate">Event date</FieldLabel>
          <FieldContent>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <Button
                    id="eventDate"
                    variant="outline"
                    className={cn(
                      "h-12 justify-between rounded-none border border-black/20 px-4 font-[weight:inherit] outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20",
                    )}
                  />
                }
              >
                <span>{formatDate(field.value)}</span>
                <HugeiconsIcon icon={Calendar05Icon} className="w-4 text-brand-detail" />
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
    formData.append(
      "phone",
      `+1 (${value.phone.slice(0, 3)}) ${value.phone.slice(3, 6)}-${value.phone.slice(6)}`,
    );
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
        <HugeiconsIcon icon={Tick01Icon} className="mb-6 h-7 text-brand-detail" />
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
      onSubmit={form.handleSubmit(submitInquiry)}
      noValidate
      aria-label="Luxe Ventures event inquiry form"
      {...(env.VITE_FORMSPREE_FORM_ID && {
        action: `https://formspree.io/f/${env.VITE_FORMSPREE_FORM_ID}`,
      })}
      method="POST"
      encType="multipart/form-data"
      className="border border-black/10 bg-white p-5 shadow-[8px_8px_0_#111] sm:p-8"
    >
      <div className="mb-8">
        <Eyebrow className="text-brand-accent">Private design brief</Eyebrow>
        <h3 className="mt-3 font-heading text-3xl">Let&apos;s make it memorable.</h3>
      </div>
      <FieldSet className="mb-8 border-black/10 border-b pb-8">
        <FieldLegend className="font-heading text-2xl" variant="legend">
          The essentials
        </FieldLegend>
        <FieldDescription>
          Start with the practical details and we&apos;ll take it from there.
        </FieldDescription>
      </FieldSet>
      <div className="grid grid-cols-2 gap-x-5 gap-y-6">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-full font-semibold text-sm sm:col-span-1"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor={field.name} className="font-[weight:inherit]">
                Name
              </FieldLabel>
              <FieldContent>
                <Input
                  required
                  {...field}
                  id={field.name}
                  autoComplete="name"
                  className="h-12 rounded-none border border-black/20 px-4 outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  placeholder="Your name"
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-full font-semibold text-sm sm:col-span-1"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor={field.name} className="font-[weight:inherit]">
                Email
              </FieldLabel>
              <FieldContent>
                <Input
                  required
                  type="email"
                  id={field.name}
                  autoComplete="email"
                  className="h-12 rounded-none border border-black/20 px-4 outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  placeholder="you@example.com"
                  {...field}
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => <PhoneField field={field} fieldState={fieldState} />}
        />
        <DateField control={form.control} />
        <Controller
          control={form.control}
          name="eventType"
          render={({ field, fieldState }) => (
            <FieldSet
              className="col-span-full font-semibold text-sm"
              data-invalid={fieldState.invalid}
            >
              <FieldLegend variant="label">Event type</FieldLegend>
              <FieldContent>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                >
                  {["Wedding", "Birthday", "Corporate", "Other"].map((type) => (
                    <Field
                      orientation="horizontal"
                      key={type}
                      className="rounded-none border border-black/15 px-3 py-3 transition has-data-checked:border-brand-accent has-data-checked:bg-brand-accent/10"
                    >
                      <RadioGroupItem id={`${field.name}-${type}`} value={type}>
                        {type}
                      </RadioGroupItem>
                      <FieldLabel
                        htmlFor={`${field.name}-${type}`}
                        className="font-[weight:inherit]"
                      >
                        {type}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </FieldSet>
          )}
        />
        <Controller
          control={form.control}
          name="estimatedGuests"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-full font-semibold text-sm"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor={field.name} className="font-[weight:inherit]">
                Estimated Guests
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
        <Controller
          control={form.control}
          name="desiredColors"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-full font-semibold text-sm"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor={field.name} className="font-[weight:inherit]">
                Palette or mood <span className="font-normal text-brand-detail">(optional)</span>
              </FieldLabel>
              <FieldContent>
                <Input
                  {...field}
                  id={field.name}
                  className="h-12 rounded-none border border-black/20 px-4 outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  placeholder="Electric pink, citrus, monochrome..."
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
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
            <Field
              data-invalid={fieldState.invalid}
              className="col-span-full font-semibold text-sm"
            >
              <FieldLabel htmlFor={field.name} className="font-[weight:inherit]">
                Tell us about your vision
              </FieldLabel>
              <FieldContent>
                <Textarea
                  required
                  {...field}
                  id={field.name}
                  className="min-h-32 resize-y rounded-none border border-black/20 px-4 py-3 outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  placeholder="Share the feeling, details, and all you have in mind..."
                />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
      </div>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="flex items-center justify-center gap-[1ch] rounded-full bg-brand-accent px-6 py-3 font-bold text-sm text-white transition hover:bg-brand-text"
        >
          Send inquiry
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            altIcon={LoaderPinwheelIcon}
            showAlt={form.formState.isSubmitting}
            className={cn("size-[1lh]", { "animate-spin": form.formState.isSubmitting })}
          />
        </button>
        {submitSucceeded && (
          <p role="status" className="font-semibold text-brand-accent text-sm">
            Thank you — we&apos;ll be in touch shortly.
          </p>
        )}
      </div>
    </form>
  );
}
