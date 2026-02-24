import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { movies, theatres } from "@/data/movies";
import { useBooking } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import { Star, Clock, Calendar, Globe, Play } from "lucide-react";
import { useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMovieId, setTheatre, setDate } = useBooking();
  const movie = movies.find((m) => m.id === id);
  const [selectedDate, setSelectedDate] = useState("");

  if (!movie) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Movie not found</div>;

  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const handleSelectShow = (theatreId: string, time: string) => {
    if (!selectedDate) return;
    setMovieId(movie.id);
    setTheatre(theatreId, time);
    setDate(selectedDate);
    navigate(`/seats/${movie.id}`);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return { day: d.toLocaleDateString("en", { weekday: "short" }), date: d.getDate(), month: d.toLocaleDateString("en", { month: "short" }) };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Banner */}
      <div className="relative h-[50vh] md:h-[60vh] mt-16">
        <img src={movie.banner} alt={movie.title} className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute bottom-8 left-6 md:left-16 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl tracking-wider text-foreground"
          >
            {movie.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-cinema-gold"><Star size={14} fill="currentColor" /> {movie.rating}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {movie.duration}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {movie.releaseDate}</span>
            <span className="px-2 py-0.5 rounded bg-secondary text-xs">{movie.genre}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-10">
        {/* Description & Cast */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl tracking-wider text-foreground mb-3">About the Movie</h2>
              <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
            </div>

            <div>
              <h3 className="font-display text-xl tracking-wider text-foreground mb-3">Available Languages</h3>
              <div className="flex gap-2">
                {movie.languages.map((lang) => (
                  <span key={lang} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-xs text-secondary-foreground">
                    <Globe size={12} /> {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl tracking-wider text-foreground">Cast & Crew</h3>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Director</p>
              <p className="text-sm text-foreground font-medium">{movie.director}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Cast</p>
              <div className="space-y-1.5">
                {movie.cast.map((c) => (
                  <p key={c} className="text-sm text-foreground">{c}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <h2 className="font-display text-2xl tracking-wider text-foreground mb-4">Select Date</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {dates.map((d) => {
              const { day, date, month } = formatDate(d);
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center min-w-[70px] px-4 py-3 rounded-lg border transition-all ${
                    selectedDate === d
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  <span className="text-xs">{day}</span>
                  <span className="text-xl font-bold">{date}</span>
                  <span className="text-xs">{month}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theatres */}
        <div>
          <h2 className="font-display text-2xl tracking-wider text-foreground mb-4">Select Theatre & Show</h2>
          {!selectedDate && (
            <p className="text-muted-foreground text-sm">Please select a date first</p>
          )}
          {selectedDate && (
            <div className="space-y-4">
              {theatres.map((theatre) => (
                <motion.div
                  key={theatre.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-lg p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-foreground font-semibold">{theatre.name}</h3>
                      <p className="text-xs text-muted-foreground">{theatre.location} · ₹{theatre.price}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {theatre.showTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleSelectShow(theatre.id, time)}
                          className="px-4 py-2 rounded-md border border-primary/50 text-primary text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
