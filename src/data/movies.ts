import movie1 from "@/assets/movies/movie1.jpg";
import movie2 from "@/assets/movies/movie2.jpg";
import movie3 from "@/assets/movies/movie3.jpg";
import movie4 from "@/assets/movies/movie4.jpg";
import movie5 from "@/assets/movies/movie5.jpg";
import movie6 from "@/assets/movies/movie6.jpg";
import heroSlide1 from "@/assets/hero-slide1.jpg";
import heroSlide2 from "@/assets/hero-slide2.jpg";
import heroSlide3 from "@/assets/hero-slide3.jpg";

export interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: number;
  language: string;
  duration: string;
  poster: string;
  banner: string;
  description: string;
  cast: string[];
  director: string;
  releaseDate: string;
  trailerUrl: string;
  languages: string[];
}

export interface Theatre {
  id: string;
  name: string;
  location: string;
  showTimes: string[];
  price: number;
}

export const heroSlides = [
  {
    id: "1",
    title: "Stellar Guardians",
    subtitle: "The universe needs heroes",
    image: heroSlide1,
    movieId: "1",
  },
  {
    id: "2",
    title: "The Deep Unknown",
    subtitle: "Dive into the mystery",
    image: heroSlide2,
    movieId: "2",
  },
  {
    id: "3",
    title: "Wasteland Rising",
    subtitle: "Survive. Adapt. Overcome.",
    image: heroSlide3,
    movieId: "3",
  },
];

export const movies: Movie[] = [
  {
    id: "1",
    title: "Stellar Guardians",
    genre: "Sci-Fi / Action",
    rating: 8.7,
    language: "English",
    duration: "2h 28min",
    poster: movie1,
    banner: heroSlide1,
    description: "In a distant future, a band of unlikely heroes must unite to protect the galaxy from an ancient threat that could destroy all known civilization. With stunning visuals and heart-pounding action, this epic adventure takes you to the far reaches of space.",
    cast: ["Alex Turner", "Maya Chen", "Ravi Kapoor", "Sofia Martinez"],
    director: "James Cameron",
    releaseDate: "2026-03-15",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    languages: ["English", "Hindi", "Tamil"],
  },
  {
    id: "2",
    title: "The Deep Unknown",
    genre: "Adventure / Mystery",
    rating: 8.2,
    language: "English",
    duration: "2h 15min",
    poster: movie2,
    banner: heroSlide2,
    description: "An underwater expedition discovers an ancient civilization deep beneath the ocean floor. As they explore the ruins, they uncover secrets that could change humanity's understanding of its own origins.",
    cast: ["Emma Stone", "Chris Hemsworth", "Lupita Nyong'o"],
    director: "Denis Villeneuve",
    releaseDate: "2026-02-28",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    languages: ["English", "Spanish"],
  },
  {
    id: "3",
    title: "Wasteland Rising",
    genre: "Action / Drama",
    rating: 9.1,
    language: "English",
    duration: "2h 42min",
    poster: movie3,
    banner: heroSlide3,
    description: "In a post-apocalyptic world, a lone warrior embarks on a perilous journey across the wasteland to find the last safe haven for humanity. A visceral tale of survival and redemption.",
    cast: ["Tom Hardy", "Zendaya", "Oscar Isaac"],
    director: "George Miller",
    releaseDate: "2026-04-10",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    languages: ["English", "Hindi"],
  },
  {
    id: "4",
    title: "Dragon's Quest",
    genre: "Animation / Fantasy",
    rating: 8.5,
    language: "English",
    duration: "1h 55min",
    poster: movie4,
    banner: heroSlide1,
    description: "A young adventurer and her magical dragon companion embark on an epic quest to save their enchanted kingdom from an evil sorcerer. A heartwarming tale for all ages.",
    cast: ["Voice: Anna Taylor", "Voice: Mark Ruffalo"],
    director: "Hayao Miyazaki",
    releaseDate: "2026-03-01",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    languages: ["English", "Japanese", "Hindi"],
  },
  {
    id: "5",
    title: "The Last Stand",
    genre: "War / Epic",
    rating: 8.9,
    language: "English",
    duration: "3h 05min",
    poster: movie5,
    banner: heroSlide3,
    description: "Based on true events, this epic war drama follows a battalion of soldiers who must hold their ground against impossible odds. A powerful story of courage, sacrifice, and brotherhood.",
    cast: ["Brad Pitt", "Dev Patel", "Florence Pugh"],
    director: "Christopher Nolan",
    releaseDate: "2026-05-01",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    languages: ["English", "Hindi"],
  },
  {
    id: "6",
    title: "Laugh Out Loud",
    genre: "Comedy",
    rating: 7.8,
    language: "English",
    duration: "1h 48min",
    poster: movie6,
    banner: heroSlide2,
    description: "When a group of old college friends reunite for a weekend getaway, hilarity ensues as old rivalries, forgotten secrets, and unexpected romances come to the surface.",
    cast: ["Ryan Reynolds", "Awkwafina", "Kevin Hart"],
    director: "Judd Apatow",
    releaseDate: "2026-02-14",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    languages: ["English"],
  },
];

export const theatres: Theatre[] = [
  { id: "t1", name: "CineMax IMAX", location: "Downtown", showTimes: ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"], price: 350 },
  { id: "t2", name: "PVR Cinemas", location: "Mall Road", showTimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"], price: 280 },
  { id: "t3", name: "INOX Megaplex", location: "City Center", showTimes: ["10:30 AM", "2:00 PM", "5:30 PM", "10:00 PM"], price: 320 },
];
