import { z } from "zod";

export const onboardingSchema = z.object({
  // Step 1
  fullName: z.string().min(2, "Required"),
  brokerageName: z.string().min(2, "Required"),
  licenseNumber: z.string().min(2, "Required"),
  city: z.string().min(2, "Required"),
  state: z.string().length(2, "Use 2-letter state code"),
  phone: z.string().min(7, "Required"),
  email: z.string().email(),

  // Step 2
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use hex like #0EA5E9"),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use hex like #0F172A"),
  logoUrl: z.string().url().optional().or(z.literal("")),
  tagline: z.string().min(2),
  siteTitle: z.string().min(2),

  // Step 3
  mlsName: z.string().min(2),
  mlsGridToken: z.string().min(4),
  zipCodes: z.string().min(5, "Comma-separated list of zip codes"),
  facebookPageId: z.string().optional().or(z.literal("")),
  instagramHandle: z.string().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),

  // Step 4
  lenderSponsor: z.boolean().default(false),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
