-- DealPulse initial schema
create extension if not exists "pgcrypto";

create table if not exists onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Step 1: Your Info
  full_name text not null,
  brokerage_name text not null,
  license_number text not null,
  city text not null,
  state text not null,
  phone text not null,
  email text not null,

  -- Step 2: Your Brand
  primary_color text not null,
  secondary_color text not null,
  logo_url text,
  tagline text not null,
  site_title text not null,

  -- Step 3: Your Market
  mls_name text not null,
  mls_grid_token text not null,
  zip_codes text not null,
  facebook_page_id text,
  instagram_handle text,
  linkedin_url text,

  -- Step 4
  lender_sponsor boolean not null default false,

  -- Lifecycle
  status text not null default 'pending_payment',
  stripe_customer_id text
);

create index if not exists onboarding_submissions_email_idx on onboarding_submissions(email);
create index if not exists onboarding_submissions_status_idx on onboarding_submissions(status);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  submission_id uuid references onboarding_submissions(id) on delete set null,
  status text not null default 'active',
  lender_sponsor boolean not null default false
);

create index if not exists subscribers_status_idx on subscribers(status);
create index if not exists subscribers_email_idx on subscribers(email);
