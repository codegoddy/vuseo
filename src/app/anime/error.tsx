/** @format */

"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Something went wrong!
          </h2>
          <p className="text-white/70 mb-8">
            {error.message || "Failed to load anime"}
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
