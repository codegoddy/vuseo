"use client";

import { Star, Clock, Trophy, Calendar } from "lucide-react";

const topRated = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    rating: 9.3,
    year: 1994,
    duration: "2h 22m",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80",
  },
  {
    id: 2,
    title: "The Godfather",
    rating: 9.2,
    year: 1972,
    duration: "2h 55m",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80",
  },
  {
    id: 3,
    title: "The Dark Knight",
    rating: 9.0,
    year: 2008,
    duration: "2h 32m",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&q=80",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    rating: 8.9,
    year: 1994,
    duration: "2h 34m",
    image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&q=80",
  },
  {
    id: 5,
    title: "Forrest Gump",
    rating: 8.8,
    year: 1994,
    duration: "2h 22m",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&q=80",
  },
  {
    id: 6,
    title: "Inception",
    rating: 8.8,
    year: 2010,
    duration: "2h 28m",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&q=80",
  },
];

export default function TopRatedSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-accent font-black tracking-[0.3em] uppercase text-xs font-sans">
              <Star size={14} fill="currentColor" />
              Legendary Movies
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase font-outfit">Top Rated Legends</h2>
          </div>
          <p className="text-gray-400 max-w-md text-base font-medium font-sans">
            A curated collection of cinematic masterpieces that have defined generations and stood the test of time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {topRated.map((movie) => (
            <div
              key={movie.title}
              className="group relative bg-[#121212] rounded-3xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(229,9,20,0.15)]"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                
                {/* Score Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent rounded-xl text-white font-black text-sm flex items-center gap-1.5 shadow-lg font-sans">
                  <Trophy size={14} fill="currentColor" />
                  {movie.rating}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest font-sans">
                  <Calendar size={14} />
                  {movie.year}
                  <span className="w-1 h-1 bg-gray-700 rounded-full" />
                  <Clock size={14} />
                  {movie.duration}
                </div>
                
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-accent transition-colors font-outfit uppercase">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
