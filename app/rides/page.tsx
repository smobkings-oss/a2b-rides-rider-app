export default function RidesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold gold-gradient">My Rides</h1>
      <p className="text-gray-400">Your instant and scheduled rides will appear here with real-time status updates.</p>
      <div className="bg-gray-900/50 border border-gold/20 rounded-xl p-8 text-center">
        <p className="text-gray-500">No rides yet. Book one from the home page!</p>
      </div>
    </div>
  );
}