import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Movie } from "@/data/movies";

const MovieCard = ({ movie, index }: { movie: Movie; index: number }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            Book Tickets
          </button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">{movie.genre}</p>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-cinema-gold">
            <Star size={12} fill="currentColor" />
            {movie.rating}
          </span>
          <span className="text-muted-foreground">{movie.language}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
