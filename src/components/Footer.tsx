"use client";

import { Facebook, Twitter, Instagram, Youtube, Mail, Globe } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-5 blur-[120px]" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-8">
            <Logo />
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm font-medium">
              Revolutionizing the way you enjoy cinematic masterpieces. Your ultimate gateway to premium entertainment.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-sm">Navigation</h3>
            <ul className="space-y-4">
              {["Home", "Movies", "TV Series", "New & Popular"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-accent font-bold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-sm">Legal</h3>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Legal Notice"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-accent font-bold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-sm">Support</h3>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span>support@vuseo.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-accent" />
                <span>vuseo.com/help</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">
            © 2026 <span className="text-accent">VUSEO</span> STUDIOS. DESIGNED FOR CINEPHILES.
          </p>
          <div className="flex gap-8">
            <div className="flex items-center gap-2 text-gray-600 text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              SYSTEM STATUS: OPERATIONAL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
