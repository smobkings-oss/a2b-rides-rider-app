export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-md">
      <h1 className="text-3xl font-bold gold-gradient">Profile</h1>
      <div className="bg-gray-900/50 border border-gold/20 rounded-xl p-6 space-y-4">
        <div>
          <label className="text-sm text-gold">Name</label>
          <p className="text-lg">Rider</p>
        </div>
        <div>
          <label className="text-sm text-gold">Role</label>
          <p>Rider · NW Ohio</p>
        </div>
        <button className="w-full border border-gold text-gold py-2 rounded-lg hover:bg-gold/10 transition">
          Edit Profile / Sign In
        </button>
      </div>
    </div>
  );
}