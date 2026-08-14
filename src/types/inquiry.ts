import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please share your name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number."),
  eventDate: z.string().min(1, "Choose an event date."),
  eventType: z.string().min(1, "Choose an event type."),
  estimatedGuests: z.string().trim().optional(),
  desiredColors: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more about your vision."),
  inspirationImages: z.custom<FileList>().optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export const initialInquiry: Inquiry = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  eventType: "",
  estimatedGuests: "2",
  desiredColors: "",
  message: "",
  inspirationImages: undefined,
};
