/** @format */

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { tmdbApi, getImageUrl, TMDBMovie } from "@/lib/tmdb";
import Link from "next/link";
import { Star } from "lucide-react";

export default function MoviesPage() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedSort, setSelectedSort] = useState("popularity.desc");

  // Fetch genres
  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await tmdbApi.getMovieGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    fetchGenres();
  }, []);

  // Fetch movies with filters
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const params: Record<string, string | number> = {
          sort_by: selectedSort,
          page: currentPage,
        };

        if (selectedGenre) params.with_genres = selectedGenre;
        if (selectedLanguage) params.with_original_language = selectedLanguage;
        if (selectedYear) params.primary_release_year = selectedYear;
        if (selectedRating) params["vote_average.gte"] = selectedRating;

        const data = await tmdbApi.discoverMovies(params);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages

        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [
    selectedGenre,
    selectedLanguage,
    selectedYear,
    selectedRating,
    selectedSort,
    currentPage,
  ]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedGenre,
    selectedLanguage,
    selectedYear,
    selectedRating,
    selectedSort,
  ]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Movies
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Discover the latest and greatest movies from around the world
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        selectedLanguage={selectedLanguage}
        selectedYear={selectedYear}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        onGenreChange={setSelectedGenre}
        onLanguageChange={setSelectedLanguage}
        onYearChange={setSelectedYear}
        onRatingChange={setSelectedRating}
        onSortChange={setSelectedSort}
      />

      {/* Movies Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          {loading ?
            <LoadingSpinner />
          : <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900">
                      <img
                        src={getImageUrl(movie.poster_path, "poster", "medium")}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-white text-sm font-medium">
                            {movie.vote_average.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3
                      className="text-white font-medium mt-3 line-clamp-2 group-hover:text-accent transition-colors min-h-[3rem]"
                      title={movie.title}
                    >
                      {movie.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      {movie.release_date ?
                        new Date(movie.release_date).getFullYear()
                      : "N/A"}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          }
        </div>
      </section>

      <Footer />
    </div>
  );
}
