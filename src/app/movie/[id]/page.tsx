/** @format */

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, Plus, Star, Clock, Calendar, ThumbsUp } from "lucide-react";
import { tmdbApi, getImageUrl, TMDBMovieDetails } from "@/lib/tmdb";

export default function MoviePage() {
  const params = useParams();
  const movieId = parseInt(params.id as string);
  const [movie, setMovie] = useState<TMDBMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await tmdbApi.getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="h-screen flex items-center justify-center">
          <div className="text-white text-xl">Movie not found</div>
        </div>
      </div>
    );
  }

  const director = movie.credits?.crew.find(
    (person) => person.job === "Director",
  );
  const trailer = movie.videos?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  const runtime =
    movie.runtime ?
      `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";
  const year =
    movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] w-full">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path, "backdrop", "large")}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 h-full flex items-end pb-16">
          <div className="flex gap-8 items-end max-w-6xl">
            {/* Poster */}
            <div className="hidden md:block flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path, "poster", "large")}
                alt={movie.title}
                className="w-64 rounded-xl shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6 pb-4">
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight font-outfit uppercase">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-accent rounded-lg text-white font-black">
                    <Star size={16} fill="currentColor" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 font-sans">
                    <Calendar size={16} />
                    {year}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 font-sans">
                    <Clock size={16} />
                    {runtime}
                  </div>
                  <div className="flex gap-2">
                    {movie.genres.slice(0, 3).map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider font-sans"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg max-w-3xl leading-relaxed font-sans">
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl font-sans"
                  >
                    <Play size={20} fill="currentColor" />
                    Watch Trailer
                  </a>
                )}
                <button className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-bold uppercase tracking-wider transition-all border border-white/20 font-sans">
                  <Plus size={20} />
                  My List
                </button>
                <button className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-bold uppercase tracking-wider transition-all border border-white/20 font-sans">
                  <ThumbsUp size={20} />
                  Like
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl space-y-12">
          {/* Cast & Crew */}
          <div className="grid md:grid-cols-2 gap-12">
            {director && (
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight font-outfit">
                  Director
                </h3>
                <p className="text-gray-300 text-lg font-sans">
                  {director.name}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-outfit">
                Cast
              </h3>
              <div className="flex flex-wrap gap-3">
                {movie.credits?.cast.slice(0, 8).map((actor) => (
                  <span
                    key={actor.id}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-sans"
                  >
                    {actor.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Similar Movies Section */}
          {movie.similar && movie.similar.results.length > 0 && (
            <div className="space-y-6 pt-8">
              <h3 className="text-3xl font-black text-white uppercase tracking-tight font-outfit">
                More Like This
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movie.similar.results.slice(0, 6).map((similarMovie) => (
                  <Link
                    key={similarMovie.id}
                    href={`/movie/${similarMovie.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900 transition-all duration-500 group-hover:scale-105">
                      <img
                        src={getImageUrl(
                          similarMovie.poster_path,
                          "poster",
                          "medium",
                        )}
                        alt={similarMovie.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <h4 className="text-white text-sm font-bold font-sans">
                          {similarMovie.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
