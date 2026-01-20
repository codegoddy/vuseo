/** @format */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrendingTodaySection from "@/components/TrendingTodaySection";
import TrendingWeekSection from "@/components/TrendingWeekSection";
import TopRatedMoviesSection from "@/components/TopRatedMoviesSection";
import PopularSection from "@/components/PopularSection";
import PopularAnimeSection from "@/components/PopularAnimeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <TrendingTodaySection />
      <TrendingWeekSection />
      <TopRatedMoviesSection />
      <PopularSection />
      <PopularAnimeSection />
      <Footer />
    </div>
  );
}
