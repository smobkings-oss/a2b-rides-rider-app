# A2B Rides / HopRide Rider App

Premium ride-hailing platform focused on NW Ohio. Instant and scheduled rides. Driver-first model with Tesla fleet support.

## Tech Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Mobile**: Capacitor (wrap the same codebase for iOS/Android)
- **Backend**: Supabase (Auth, Postgres, Realtime, Storage)
- **Payments**: Stripe (to be integrated)
- **Mapping**: Google Maps / Mapbox (to be integrated)
- **Hosting**: Vercel

## Branding
Black primary, gold accents, holographic effects. Local NW Ohio focus.

## Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/smobkings-oss/a2b-rides-rider-app.git
   cd a2b-rides-rider-app
   npm install
   ```

2. **Supabase Setup**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run `supabase/schema.sql`
   - Enable Realtime on the `rides` table
   - Copy your Project URL and Anon Key

3. **Environment**
   ```bash
   cp .env.example .env.local
   # Fill in your Supabase keys
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Features in This MVP
- Ride request form for **Instant** and **Scheduled** rides
- Black/gold/holographic UI matching A2B branding
- Supabase integration for creating ride records
- Basic structure for auth, realtime tracking, driver matching (next phases)

## Next Steps (per MVP order)
1. Full Auth & Onboarding (rider/driver roles)
2. Map integration for pickup/dropoff + live tracking
3. Driver matching & acceptance flow
4. Stripe payments
5. Admin dashboard
6. Capacitor mobile builds
7. Tesla fleet features

## Deployment
Deploy to Vercel. Connect GitHub repo for automatic deploys.

For marketing site, keep on GoDaddy. Link app downloads from there.

## Compliance & Launch
- NW Ohio service areas first (Toledo, Perrysburg, etc.)
- Driver document uploads ready for TNC compliance
- Transparent earnings for drivers

Built with the A2B Rides platform skill. Let's launch.