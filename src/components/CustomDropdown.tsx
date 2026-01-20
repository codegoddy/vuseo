/** @format */

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 px-5 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all min-w-[180px] group"
      >
        <span className="whitespace-nowrap">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 text-white/70 group-hover:text-white ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] animate-fade-in">
          <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-all ${
                    isSelected ?
                      "bg-accent text-white font-medium"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check size={16} className="flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
