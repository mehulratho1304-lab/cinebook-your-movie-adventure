import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { Search, Droplets, Wind, Thermometer, Sunrise, Sunset, CloudRain, Cloud, Sun, Snowflake, CloudLightning, CloudFog, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface WeatherData {
  name: string;
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number };
  sys: { sunrise: number; sunset: number; country: string };
  visibility: number;
}

interface ForecastItem {
  dt: number;
  main: { temp: number; temp_min: number; temp_max: number };
  weather: { main: string; description: string; icon: string }[];
  dt_txt: string;
}

interface ForecastData {
  list: ForecastItem[];
  city: { name: string };
}

const getWeatherIcon = (condition: string, size = 24) => {
  const props = { size, className: "text-foreground" };
  switch (condition?.toLowerCase()) {
    case "rain":
    case "drizzle":
      return <CloudRain {...props} />;
    case "clouds":
      return <Cloud {...props} />;
    case "clear":
      return <Sun {...props} />;
    case "snow":
      return <Snowflake {...props} />;
    case "thunderstorm":
      return <CloudLightning {...props} />;
    case "mist":
    case "haze":
    case "fog":
      return <CloudFog {...props} />;
    default:
      return <Sun {...props} />;
  }
};

const getWeatherGradient = (condition: string): string => {
  switch (condition?.toLowerCase()) {
    case "rain":
    case "drizzle":
      return "from-[hsl(220,40%,15%)] via-[hsl(220,35%,20%)] to-[hsl(220,30%,25%)]";
    case "clouds":
      return "from-[hsl(220,10%,18%)] via-[hsl(220,8%,22%)] to-[hsl(220,10%,28%)]";
    case "clear":
      return "from-[hsl(30,40%,15%)] via-[hsl(25,35%,20%)] to-[hsl(20,30%,25%)]";
    case "snow":
      return "from-[hsl(210,30%,20%)] via-[hsl(210,25%,28%)] to-[hsl(210,20%,35%)]";
    case "thunderstorm":
      return "from-[hsl(260,30%,12%)] via-[hsl(260,25%,18%)] to-[hsl(260,20%,22%)]";
    default:
      return "from-background via-secondary to-background";
  }
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const WeatherPage = () => {
  const [city, setCity] = useState("Mumbai");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchWeather = useCallback(async (searchCity?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, unknown> = searchCity ? { city: searchCity } : { lat, lon };

      const [currentRes, forecastRes] = await Promise.all([
        supabase.functions.invoke("weather", { body: { ...params, type: "current" } }),
        supabase.functions.invoke("weather", { body: { ...params, type: "forecast" } }),
      ]);

      if (currentRes.error || currentRes.data?.error) {
        setError(currentRes.data?.error || "Failed to fetch weather data");
        setWeather(null);
        setForecast(null);
        return;
      }

      setWeather(currentRes.data);
      setForecast(forecastRes.data);
      setCity(currentRes.data.name);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather("Mumbai");
  }, [fetchWeather]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
    }
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(undefined, pos.coords.latitude, pos.coords.longitude),
        () => setError("Location access denied")
      );
    }
  };

  const toF = (c: number) => (c * 9) / 5 + 32;
  const displayTemp = (c: number) => (isCelsius ? `${Math.round(c)}°C` : `${Math.round(toF(c))}°F`);

  const condition = weather?.weather?.[0]?.main || "";
  const bgGradient = getWeatherGradient(condition);

  // Get one forecast per day (noon)
  const dailyForecast = forecast?.list
    ?.filter((item) => item.dt_txt.includes("12:00:00"))
    ?.slice(0, 5) || [];

  const indianCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur"];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-all duration-1000`}>
      <Navbar />

      <main className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
        {/* Search Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl tracking-wider text-foreground mb-6 text-center">
            Weather
          </h1>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search any city..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/60 backdrop-blur-md border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Search
            </button>
            <button type="button" onClick={handleLocate} className="px-4 py-3 rounded-xl bg-secondary/60 backdrop-blur-md border border-border text-sm text-muted-foreground hover:text-foreground transition-colors" title="Use my location">
              📍
            </button>
          </form>

          {/* Quick city chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {indianCities.map((c) => (
              <button
                key={c}
                onClick={() => { setSearchInput(c); fetchWeather(c); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  city === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Temp toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsCelsius(!isCelsius)}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-secondary/40 text-muted-foreground hover:text-foreground transition-colors"
            >
              Switch to {isCelsius ? "°F" : "°C"}
            </button>
          </div>
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-destructive text-lg mb-2">⚠️ {error}</p>
            <p className="text-muted-foreground text-sm">Please check the city name and try again.</p>
          </motion.div>
        )}

        {/* Weather Data */}
        {weather && !loading && !error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Main Card */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="font-display text-3xl tracking-wider text-foreground">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="text-muted-foreground text-sm capitalize mt-1">
                    {weather.weather[0].description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt={weather.weather[0].description}
                    className="w-24 h-24"
                  />
                  <span className="font-display text-7xl text-foreground">
                    {displayTemp(weather.main.temp)}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                {[
                  { icon: <Thermometer size={18} />, label: "Feels Like", value: displayTemp(weather.main.feels_like) },
                  { icon: <Droplets size={18} />, label: "Humidity", value: `${weather.main.humidity}%` },
                  { icon: <Wind size={18} />, label: "Wind", value: `${Math.round(weather.wind.speed * 3.6)} km/h` },
                  { icon: <Eye size={18} />, label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km` },
                  { icon: <Sunrise size={18} />, label: "Sunrise", value: formatTime(weather.sys.sunrise) },
                  { icon: <Sunset size={18} />, label: "Sunset", value: formatTime(weather.sys.sunset) },
                ].map((item) => (
                  <div key={item.label} className="bg-secondary/40 rounded-xl p-3 text-center">
                    <div className="flex justify-center text-muted-foreground mb-1">{item.icon}</div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5-Day Forecast */}
            {dailyForecast.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-2xl tracking-wider text-foreground mb-4">5-Day Forecast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {dailyForecast.map((day, i) => (
                    <motion.div
                      key={day.dt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-secondary/40 rounded-xl p-4 text-center hover:bg-secondary/60 transition-colors"
                    >
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(day.dt * 1000).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}
                      </p>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(day.weather[0].main, 28)}
                      </div>
                      <p className="text-sm font-medium text-foreground">{displayTemp(day.main.temp)}</p>
                      <p className="text-xs text-muted-foreground capitalize mt-1">{day.weather[0].description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default WeatherPage;
