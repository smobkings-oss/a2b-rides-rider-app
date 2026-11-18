import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A2B Rides | HopRide - Instant & Scheduled Rides",
  description: "Premium rides. Better pay for drivers. Local to NW Ohio. Instant and scheduled rides.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <header className="border-b border-gold/30 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-holographic flex items-center justify-center text-black font-bold text-sm">
                A2B
              </div>
              <span className="text-xl font-bold gold-gradient">A2B Rides</span>
            </div>
            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:text-gold transition">Book Ride</a>
              <a href="/rides" className="hover:text-gold transition">My Rides</a>
              <a href="/profile" className="hover:text-gold transition">Profile</a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gold/20 mt-16 py-8 text-center text-sm text-gray-400">
          <p>A2B Rides / HopRide · Premium Local Rides · NW Ohio First</p>
          <p className="mt-2">Driver-first · Instant & Scheduled · Transparent Pricing</p>
        </footer>
      </body>
    </html>
  );
}