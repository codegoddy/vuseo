"use client";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center group cursor-pointer ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-white text-3xl font-black tracking-[-0.08em] uppercase transition-all duration-300 group-hover:text-accent font-outfit">
          VUSEO
        </span>
        <div className="w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}
