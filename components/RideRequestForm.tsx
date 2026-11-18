"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function RideRequestForm() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState<"instant" | "scheduled">("instant");
  const [scheduledTime, setScheduledTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const riderId = user?.id || "demo-rider";

      const rideData = {
        rider_id: riderId,
        pickup_address: pickup,
        dropoff_address: dropoff,
        status: rideType === "instant" ? "requested" : "scheduled",
        ride_type: rideType,
        scheduled_at: rideType === "scheduled" ? scheduledTime : null,
        notes,
        fare_estimate: Math.floor(Math.random() * 20 + 8) * 100,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("rides")
        .insert([rideData])
        .select()
        .single();

      if (error) throw error;

      setMessage(
        rideType === "instant"
          ? `Ride requested! Matching nearby drivers... (ID: ${data.id})`
          : `Scheduled ride booked for ${new Date(scheduledTime).toLocaleString()}!`
      );
      setPickup("");
      setDropoff("");
      setNotes("");
      setScheduledTime("");
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Could not create ride. Check Supabase connection."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gold mb-2">Pickup Location</label>
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Enter pickup address or use current location"
          className="w-full bg-gray-900 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold mb-2">Dropoff Location</label>
        <input
          type="text"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          placeholder="Where to?"
          className="w-full bg-gray-900 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gold mb-2">Ride Type</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setRideType("instant")}
            className={`flex-1 py-3 rounded-lg border transition ${
              rideType === "instant"
                ? "bg-gold text-black border-gold font-semibold"
                : "border-gold/30 text-gray-300 hover:border-gold"
            }`}
          >
            Instant
          </button>
          <button
            type="button"
            onClick={() => setRideType("scheduled")}
            className={`flex-1 py-3 rounded-lg border transition ${
              rideType === "scheduled"
                ? "bg-gold text-black border-gold font-semibold"
                : "border-gold/30 text-gray-300 hover:border-gold"
            }`}
          >
            Scheduled
          </button>
        </div>
      </div>

      {rideType === "scheduled" && (
        <div>
          <label className="block text-sm font-medium text-gold mb-2">Scheduled Time</label>
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full bg-gray-900 border border-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gold mb-2">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Special requests, flight number, etc."
          rows={2}
          className="w-full bg-gray-900 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Requesting..." : rideType === "instant" ? "Request Instant Ride" : "Book Scheduled Ride"}
      </button>

      {message && (
        <div className={`p-4 rounded-lg text-center ${message.startsWith("Error") ? "bg-red-900/50 text-red-200" : "bg-green-900/50 text-green-200"}`}>
          {message}
        </div>
      )}
    </form>
  );
}