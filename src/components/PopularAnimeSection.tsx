/** @format */

"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { tmdbApi, getImageUrl, TMDBTVShow, TMDBResponse } from "@/lib/tmdb";

export default function PopularAnimeSection() {
  const [anime, setAnime] = useState<TMDBTVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data: TMDBResponse<TMDBTVShow> = await tmdbApi.getPopularAnime();
        setAnime(data.results);
      } catch (error) {
        console.error("Error fetching popular anime:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnime();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase font-outfit">
              Popular Anime
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-zinc-900 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase font-outfit">
            Popular Anime
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {anime.map((item) => (
            <Link
              key={item.id}
              href={`/tv/${item.id}`}
              className="group cursor-pointer flex-shrink-0 w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)]"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900">
                <img
                  src={getImageUrl(item.poster_path, "poster", "medium")}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-white text-sm font-medium">
                      {item.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <h3
                className="text-white font-medium mt-3 line-clamp-2 group-hover:text-accent transition-colors min-h-[3rem]"
                title={item.name}
              >
                {item.name}
              </h3>
              <p className="text-white/60 text-sm mt-1">
                {item.first_air_date ?
                  new Date(item.first_air_date).getFullYear()
                : "N/A"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
