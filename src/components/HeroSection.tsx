/** @format */

"use client";

import { Play, ArrowRight, Volume2, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { tmdbApi, getImageUrl, TMDBMovie, TMDBResponse } from "@/lib/tmdb";

export default function HeroSection() {
  const [featuredMovies, setFeaturedMovies] = useState<TMDBMovie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedMovies() {
      try {
        // Fetch trending movies for the hero section
        const data: TMDBResponse<TMDBMovie> =
          await tmdbApi.getTrendingMovies("week");
        // Get top 4 trending movies
        setFeaturedMovies(data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedMovies();
  }, []);

  const nextSlide = useCallback(() => {
    if (featuredMovies.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
      setIsAnimating(false);
    }, 500);
  }, [featuredMovies.length]);

  useEffect(() => {
    if (featuredMovies.length === 0) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, featuredMovies.length]);

  if (loading || featuredMovies.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Vignette */}
      <div className="absolute inset-0">
        <div
          key={currentMovie.backdrop_path}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105 ${
            isAnimating ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
          style={{
            backgroundImage: `url('${getImageUrl(currentMovie.backdrop_path, "backdrop", "original")}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
        <div
          className={`max-w-3xl space-y-8 transition-all duration-700 ${
            isAnimating ?
              "opacity-0 translate-y-8 blur-sm"
            : "opacity-100 translate-y-0 blur-0"
          }`}
        >
          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight font-outfit pt-12 md:pt-0 line-clamp-3">
            {currentMovie.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium font-sans line-clamp-3">
            {currentMovie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-5 pt-6 font-sans">
            <a
              href={`/movie/${currentMovie.id}`}
              className="px-10 py-4 bg-accent text-white rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all flex items-center gap-3 group shadow-[0_0_40px_rgba(229,9,20,0.4)]"
            >
              <Play
                size={22}
                fill="currentColor"
                className="group-hover:scale-110 transition-transform"
              />
              Watch Now
            </a>
            <a
              href={`/movie/${currentMovie.id}`}
              className="px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-3 group"
            >
              View Info
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={nextSlide}
            className="p-4 text-white/30 hover:text-white transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight size={64} strokeWidth={1} />
          </button>
        </div>

        {/* Bottom Right Controls */}
        <div className="absolute bottom-12 right-6 space-y-8 flex flex-col items-end">
          <button className="p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-accent hover:border-accent hover:scale-110 transition-all group">
            <Volume2 size={24} className="group-hover:animate-pulse" />
          </button>

          <div className="flex items-center gap-3">
            {featuredMovies.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(i);
                    setIsAnimating(false);
                  }, 500);
                }}
                className={`h-1.5 transition-all duration-700 rounded-full ${
                  i === currentIndex ?
                    "w-16 bg-accent shadow-[0_0_15px_rgba(229,9,20,0.5)]"
                  : "w-8 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
