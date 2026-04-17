import { z } from "zod";

export const PARTNER_TYPES = [
  { value: "lender",    label: "Lender / Mortgage",  icon: "🏦", cta: "Get Pre-Approved" },
  { value: "insurance", label: "Insurance Agent",     icon: "🛡️", cta: "Get a Free Quote" },
  { value: "title",     label: "Title Company",       icon: "📄", cta: "Estimate Closing Costs" },
  { value: "inspector", label: "Home Inspector",      icon: "🔎", cta: "Schedule an Inspection" },
  { value: "warranty",  label: "Home Warranty",       icon: "🏠", cta: "Get a Warranty Quote" },
  { value: "other",     label: "Other",               icon: "✨", cta: "Learn More" },
] as const;

export type PartnerTypeValue = typeof PARTNER_TYPES[number]["value"];

export const partnerSchema = z.object({
  partnerType: z.enum(
    ["lender", "insurance", "title", "inspector", "warranty", "other"],
    { errorMap: () => ({ message: "Please select a partner type" }) }
  ),
  businessName:  z.string().min(2,  "Business name is required"),
  contactName:   z.string().min(2,  "Contact name is required"),
  email:         z.string().email("Valid email required"),
  phone:         z.string().min(7,  "Phone number is required"),
  website:       z.string().url("Enter a full URL (https://...)").optional().or(z.literal("")),
  logoUrl:       z.string().url("Enter a full URL to your logo").optional().or(z.literal("")),
  tagline:       z.string().min(5,  "Tagline is required").max(160, "Keep it under 160 chars"),
  ctaText:       z.string().min(3,  "CTA button text is required").max(50, "Keep it under 50 chars"),
  ctaUrl:        z.string().url("CTA URL must start with https://"),
  nmlsNumber:    z.string().optional(),
  licenseNumber: z.string().optional(),
  targetMarket:  z.string().optional(),
  notes:         z.string().max(500).optional(),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
