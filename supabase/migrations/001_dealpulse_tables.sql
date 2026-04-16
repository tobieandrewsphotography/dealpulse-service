-- DealPulse SaaS tables
-- Run this in the Supabase SQL editor for the dealpulse-service project

-- Onboarding form submissions (saved before Stripe payment)
create table if not exists onboarding_submissions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz default now(),

  -- Agent info
  full_name         text not null,
  brokerage_name    text not null,
  license_number    text,
  city              text not null,
  state             text not null,
  phone             text not null,
  email             text not null,

  -- Brand
  primary_color     text,
  secondary_color   text,
  logo_url          text,
  tagline           text,
  site_title        text,

  -- MLS
  mls_name          text,
  mls_grid_token    text,
  zip_codes         text[],

  -- Social
  facebook_page_id  text,
  instagram_handle  text,
  linkedin_url      text,

  -- Plan
  lender_sponsor    boolean default false,

  -- Co-marketing partner (optional — populated when lender_sponsor = true)
  partner_business_name  text,
  partner_contact_name   text,
  partner_email          text,
  partner_phone          text,
  partner_website        text,
  partner_logo_url       text,

  -- Status tracking
  status            text default 'pending_payment',
  stripe_session_id text,
  stripe_customer_id text,
  provisioned_at    timestamptz,
  notes             text
);

-- Active subscribers (populated by Stripe webhook on payment)
create table if not exists subscribers (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz default now(),
  updated_at          timestamptz default now(),

  submission_id       uuid references onboarding_submissions(id),
  full_name           text not null,
  brokerage_name      text not null,
  email               text not null unique,
  phone               text,
  city                text,
  state               text,

  -- Stripe
  stripe_customer_id  text,
  stripe_subscription_id text,
  plan                text default 'standard',  -- standard | lender_sponsor
  monthly_amount      integer,                  -- in cents: 100000 = $1,000
  status              text default 'active',    -- active | cancelled | past_due

  -- Their live site
  site_url            text,
  provisioned_at      timestamptz,
  cancelled_at        timestamptz,
  notes               text
);

-- Inquiry leads from the "Tell me more" form
create table if not exists inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  email         text not null,
  phone         text,
  brokerage     text,
  market        text,
  message       text,
  status        text default 'new'  -- new | contacted | converted | closed
);
