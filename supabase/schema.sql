-- A2B Rides / HopRide Supabase Schema
-- Run this in Supabase SQL Editor.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('rider', 'driver', 'admin')) DEFAULT 'rider',
  approved BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS public.rides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  rider_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pickup_address TEXT NOT NULL,
  dropoff_address TEXT NOT NULL,
  pickup_lat NUMERIC,
  pickup_lng NUMERIC,
  dropoff_lat NUMERIC,
  dropoff_lng NUMERIC,
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'matching', 'accepted', 'arriving', 'in_progress', 'completed', 'cancelled', 'scheduled')),
  ride_type TEXT DEFAULT 'instant' CHECK (ride_type IN ('instant', 'scheduled')),
  scheduled_at TIMESTAMPTZ,
  fare_estimate INTEGER,
  fare_final INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Riders can view own rides" ON public.rides FOR SELECT USING (auth.uid() = rider_id);
CREATE POLICY "Riders can insert own rides" ON public.rides FOR INSERT WITH CHECK (auth.uid() = rider_id OR rider_id IS NULL);
CREATE POLICY "Drivers can view assigned or open rides" ON public.rides FOR SELECT USING (auth.uid() = driver_id OR (status IN ('requested', 'matching', 'scheduled') AND driver_id IS NULL));
CREATE POLICY "Drivers can update assigned rides" ON public.rides FOR UPDATE USING (auth.uid() = driver_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.rides;

CREATE INDEX IF NOT EXISTS idx_rides_rider ON public.rides(rider_id);
CREATE INDEX IF NOT EXISTS idx_rides_status ON public.rides(status);
CREATE INDEX IF NOT EXISTS idx_rides_scheduled ON public.rides(scheduled_at) WHERE scheduled_at IS NOT NULL;

CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON public.rides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();