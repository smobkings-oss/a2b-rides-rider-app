import RideRequestForm from "@/components/RideRequestForm";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="gold-gradient">Hop On.</span> Instant or Scheduled.
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Premium rides powered by local drivers and our Tesla Navigator fleet. 
          Transparent pricing, real-time tracking, better pay for drivers.
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="px-3 py-1 rounded-full border border-gold/50 text-gold">NW Ohio</span>
          <span className="px-3 py-1 rounded-full border border-holographic/50 text-holographic">Instant Rides</span>
          <span className="px-3 py-1 rounded-full border border-gold/50 text-gold">Scheduled</span>
        </div>
      </section>

      <div className="holographic-border max-w-2xl mx-auto">
        <div className="bg-black/90 rounded-xl p-6 md:p-8">
          <RideRequestForm />
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gray-900/50 border border-gold/20 rounded-xl p-6">
          <h3 className="text-gold font-semibold mb-2">Instant Rides</h3>
          <p className="text-gray-400 text-sm">Request a ride right now. Nearby drivers matched in seconds.</p>
        </div>
        <div className="bg-gray-900/50 border border-gold/20 rounded-xl p-6">
          <h3 className="text-gold font-semibold mb-2">Scheduled Rides</h3>
          <p className="text-gray-400 text-sm">Book ahead for airports, events, or appointments. Reliable pickup.</p>
        </div>
        <div className="bg-gray-900/50 border border-gold/20 rounded-xl p-6">
          <h3 className="text-gold font-semibold mb-2">Tesla Fleet</h3>
          <p className="text-gray-400 text-sm">Quiet, clean, premium Model 3 rides when available.</p>
        </div>
      </section>
    </div>
  );
}