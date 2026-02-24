import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { movies, theatres } from "@/data/movies";
import Navbar from "@/components/Navbar";
import { useMemo, useState } from "react";
import { Monitor } from "lucide-react";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = 12;

// Generate random booked seats
const generateBookedSeats = () => {
  const booked = new Set<string>();
  for (let i = 0; i < 20; i++) {
    const row = ROWS[Math.floor(Math.random() * ROWS.length)];
    const col = Math.floor(Math.random() * COLS) + 1;
    booked.add(`${row}${col}`);
  }
  return booked;
};

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, toggleSeat, totalPrice, seatPrice, showTime, theatreId } = useBooking();
  const movie = movies.find((m) => m.id === id);
  const theatre = theatres.find((t) => t.id === theatreId);

  const bookedSeats = useMemo(() => generateBookedSeats(), []);

  if (!movie || !theatre) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider text-foreground">{movie.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {theatre.name} · {showTime}
          </p>
        </motion.div>

        {/* Screen */}
        <div className="mb-10">
          <div className="relative mx-auto w-3/4 md:w-1/2">
            <div className="h-1.5 bg-primary/60 rounded-full mb-2" style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.4)" }} />
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Monitor size={12} />
              <span>SCREEN</span>
            </div>
          </div>
        </div>

        {/* Seats Grid */}
        <div className="flex flex-col items-center gap-2 mb-8">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-1.5 md:gap-2">
              <span className="w-6 text-xs text-muted-foreground text-right">{row}</span>
              <div className="flex gap-1.5 md:gap-2">
                {Array.from({ length: COLS }, (_, i) => {
                  const seatId = `${row}${i + 1}`;
                  const isBooked = bookedSeats.has(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      disabled={isBooked}
                      onClick={() => toggleSeat(seatId)}
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-t-lg text-[10px] font-medium transition-all ${
                        isBooked
                          ? "seat-booked"
                          : isSelected
                          ? "seat-selected text-foreground"
                          : "seat-available hover:bg-muted-foreground/50 text-muted-foreground"
                      }`}
                      title={seatId}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <span className="w-6 text-xs text-muted-foreground">{row}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-8">
          {[
            { label: "Available", cls: "seat-available" },
            { label: "Selected", cls: "seat-selected" },
            { label: "Booked", cls: "seat-booked" },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-5 h-5 rounded-t-md ${cls}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 glass-card border-t border-border p-4"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {selectedSeats.length} Seat{selectedSeats.length > 1 ? "s" : ""}: {selectedSeats.join(", ")}
              </p>
              <p className="text-xl font-bold text-foreground">₹{totalPrice}</p>
            </div>
            <button
              onClick={() => navigate(`/booking/${movie.id}`)}
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Proceed
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SeatSelection;
