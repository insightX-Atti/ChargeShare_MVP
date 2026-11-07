-- ChargeShare schema for Supabase PostgreSQL. Apply with `supabase db push`.
create extension if not exists pgcrypto;

create type public.user_role as enum ('DRIVER', 'HOST', 'ADMIN');
create type public.charger_type as enum ('AC', 'DC');
create type public.pricing_type as enum ('PER_KWH', 'PER_HOUR');
create type public.listing_status as enum ('ACTIVE', 'PAUSED', 'PENDING', 'REMOVED');
create type public.booking_status as enum ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED');
create type public.payment_status as enum ('UNPAID', 'PAID', 'FAILED', 'REFUNDED');
create type public.session_status as enum ('NOT_STARTED', 'ACTIVE', 'COMPLETED');

create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  phone text,
  role public.user_role not null default 'DRIVER',
  profile_image text,
  suspended boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chargers (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  description text not null,
  address text not null,
  public_area text not null,
  latitude double precision not null,
  longitude double precision not null,
  connector_type text not null,
  charging_power double precision not null check (charging_power > 0),
  charger_type public.charger_type not null,
  pricing_type public.pricing_type not null,
  price numeric(10,2) not null check (price >= 0),
  availability jsonb not null default '{}'::jsonb,
  images text[] not null default '{}',
  parking_type text,
  amenities text[] not null default '{}',
  access_instructions text,
  status public.listing_status not null default 'PENDING',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text not null unique,
  driver_id uuid not null references public.users(id),
  charger_id uuid not null references public.chargers(id),
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  total_amount numeric(10,2) not null check (total_amount >= 0),
  platform_fee numeric(10,2) not null check (platform_fee >= 0),
  host_earnings numeric(10,2) not null check (host_earnings >= 0),
  booking_status public.booking_status not null default 'PENDING',
  payment_status public.payment_status not null default 'UNPAID',
  transaction_id text,
  ev_model text,
  created_at timestamptz not null default now()
);

create table public.charging_sessions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  started_at timestamptz,
  ended_at timestamptz,
  energy_consumed double precision,
  final_amount numeric(10,2),
  session_status public.session_status not null default 'NOT_STARTED'
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id),
  driver_id uuid not null references public.users(id),
  charger_id uuid not null references public.chargers(id),
  rating smallint not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  charger_id uuid not null references public.chargers(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, charger_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.admin_actions (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.users(id),
  action text not null,
  target_id text not null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger chargers_set_updated_at
before update on public.chargers
for each row execute function public.set_updated_at();

create index chargers_public_area_status_idx on public.chargers (public_area, status);
create index chargers_host_id_idx on public.chargers (host_id);
create index bookings_charger_times_idx on public.bookings (charger_id, start_time, end_time);
create index bookings_driver_status_idx on public.bookings (driver_id, booking_status);
create index reviews_charger_id_idx on public.reviews (charger_id);
create index notifications_user_read_idx on public.notifications (user_id, read);

-- The web app accesses data only through server Route Handlers with the service key.
-- RLS remains enabled so anonymous browser clients cannot query or mutate these tables.
alter table public.users enable row level security;
alter table public.chargers enable row level security;
alter table public.bookings enable row level security;
alter table public.charging_sessions enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;
alter table public.admin_actions enable row level security;
