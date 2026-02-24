import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/movies";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSlider />

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <h2 className="font-display text-3xl md:text-4xl tracking-wider text-foreground mb-8">
            Now Showing
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
