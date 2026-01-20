/** @format */

"use client";

import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      } bg-transparent`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-full">
          {/* Left Section: Logo */}
          <div className="flex-1 flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-[2]">
            <div className="flex items-center gap-1 px-1.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
              {[
                { name: "Home", href: "/" },
                { name: "Movies", href: "/movies" },
                { name: "TV Shows", href: "/tv-shows" },
                { name: "Anime", href: "/anime" },
                { name: "Parties", href: "#" },
                { name: "My Library", href: "#" },
              ].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 ${
                      isActive ?
                        "bg-white text-black shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                    } whitespace-nowrap`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex-1 flex items-center justify-end gap-5">
            {/* Functional Style Search Bar */}
            <div
              className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? "w-64" : "w-10"}`}
            >
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white/70 hover:text-accent transition-colors p-2 z-10"
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Titles, people, genres..."
                className={`absolute left-0 h-10 bg-white/10 border border-white/20 rounded-full pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-all duration-300 ${
                  isSearchOpen ? "opacity-100 w-full" : (
                    "opacity-0 w-0 pointer-events-none"
                  )
                }`}
              />
            </div>

            <div className="flex items-center gap-2 group cursor-pointer pl-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden group-hover:border-accent transition-colors">
                <div className="w-full h-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              </div>
            </div>
            {/* Mobile Menu Icon */}
            <button className="lg:hidden text-white p-1 ml-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
