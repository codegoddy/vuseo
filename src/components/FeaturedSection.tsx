"use client";

import { ArrowRight } from "lucide-react";

const trending = [
  {
    id: 1,
    title: "Zombie Joget",
    genre: "Horror",
    image:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&q=80",
  },
  {
    id: 2,
    title: "Family 100K",
    genre: "Family",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8014458375?w=500&q=80",
  },
  {
    id: 3,
    title: "Pesawat Kertas",
    genre: "Documentary",
    image:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=500&q=80",
  },
  {
    id: 4,
    title: "Surat Cinta Starling",
    genre: "Romance",
    image:
      "https://images.unsplash.com/photo-1516589174184-c685bf22fc3b?w=500&q=80",
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase font-outfit">Trending Now</h2>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group font-sans">
            See more
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trending.map((movie) => (
            <div key={movie.id} className="group cursor-pointer space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                
                {/* Genre Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-xl rounded-lg border border-white/10">
                  <span className="text-white text-[10px] uppercase font-black tracking-[0.2em] font-sans">
                    {movie.genre}
                  </span>
                </div>
              </div>

              {/* Title & Arrow */}
              <div className="flex items-center justify-between px-1">
                <h3 className="text-white text-base font-bold tracking-tight group-hover:text-accent transition-colors font-sans">
                  {movie.title}
                </h3>
                <ArrowRight size={18} className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
