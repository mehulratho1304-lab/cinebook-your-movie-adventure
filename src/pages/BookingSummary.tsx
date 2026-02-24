import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { movies, theatres } from "@/data/movies";
import Navbar from "@/components/Navbar";
import { Check, Film, MapPin, Clock, Calendar, Armchair, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BookingSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, totalPrice, showTime, theatreId, date, resetBooking, seatPrice } = useBooking();
  const [confirmed, setConfirmed] = useState(false);

  const movie = movies.find((m) => m.id === id);
  const theatre = theatres.find((t) => t.id === theatreId);

  if (!movie || !theatre || selectedSeats.length === 0) {
    navigate("/dashboard");
    return null;
  }

  const handleConfirm = () => {
    setConfirmed(true);
    toast.success("Booking confirmed! Enjoy the movie 🎬");
  };

  const handleDone = () => {
    resetBooking();
    navigate("/dashboard");
  };

  const formatDate = (d: string | null) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-primary" />
          </div>
          <h1 className="font-display text-4xl tracking-wider text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-2">{movie.title}</p>
          <p className="text-sm text-muted-foreground mb-1">{theatre.name} · {showTime}</p>
          <p className="text-sm text-muted-foreground mb-6">Seats: {selectedSeats.join(", ")}</p>
          <div className="text-3xl font-bold text-gradient-gold mb-8">₹{totalPrice}</div>
          <button
            onClick={handleDone}
            className="w-full py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl tracking-wider text-foreground text-center mb-8"
        >
          Booking Summary
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          {/* Movie Banner */}
          <div className="relative h-40 md:h-48">
            <img src={movie.banner} alt={movie.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h2 className="font-display text-2xl tracking-wider text-foreground">{movie.title}</h2>
              <p className="text-xs text-muted-foreground">{movie.genre} · {movie.duration}</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              <div>
                <p className="text-sm text-foreground font-medium">{theatre.name}</p>
                <p className="text-xs text-muted-foreground">{theatre.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-primary" />
              <p className="text-sm text-foreground">{formatDate(date)}</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-primary" />
              <p className="text-sm text-foreground">{showTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <Armchair size={16} className="text-primary" />
              <p className="text-sm text-foreground">
                {selectedSeats.length} Seat{selectedSeats.length > 1 ? "s" : ""}: {selectedSeats.join(", ")}
              </p>
            </div>

            <hr className="border-border" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tickets ({selectedSeats.length} × ₹{seatPrice})</span>
                <span className="text-foreground">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span className="text-foreground">₹49</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-gradient-gold">₹{totalPrice + 49}</span>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              onClick={handleConfirm}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              <CreditCard size={18} />
              Proceed to Payment · ₹{totalPrice + 49}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSummary;
