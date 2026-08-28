"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Globe } from "lucide-react";
import { countriesData, CountryData, getFlagUrl } from "@/data/countries";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function CountrySelect({ value, onChange, required = false }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find currently selected country
  const selectedCountry = countriesData.find(
    (c) => c.name.toLowerCase() === value.toLowerCase()
  ) || countriesData[0]; // Default to United States

  // Filter countries based on search term
  const filteredCountries = countriesData.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: CountryData) => {
    onChange(country.name);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black border border-white/15 focus:border-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl pl-3.5 pr-4 py-3 flex items-center justify-between gap-2.5 outline-none transition-colors cursor-pointer text-left shadow-inner"
      >
        <div className="flex items-center gap-2.5 truncate">
          <img
            src={getFlagUrl(selectedCountry.code)}
            alt={selectedCountry.name}
            className="w-5 h-3.5 object-cover rounded shadow-sm shrink-0 border border-white/20"
            onError={(e) => {
              // Fallback to globe if flag fails to load
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="truncate">{selectedCountry.name}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in max-h-64 flex flex-col">
          {/* Search Box */}
          <div className="p-2 border-b border-[var(--color-border)] bg-[var(--color-black-soft)] sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country..."
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-white text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          </div>

          {/* Country List */}
          <div className="overflow-y-auto flex-1 divide-y divide-white/5">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelect(c)}
                  className={`w-full px-3.5 py-2.5 flex items-center gap-3 text-xs sm:text-sm text-left transition-colors hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-light)] ${
                    c.name === selectedCountry.name
                      ? "bg-[var(--color-accent)]/20 font-bold text-[var(--color-accent-light)]"
                      : "text-gray-200"
                  }`}
                >
                  <img
                    src={getFlagUrl(c.code)}
                    alt={c.name}
                    className="w-5 h-3.5 object-cover rounded shadow-sm shrink-0 border border-white/20"
                    loading="lazy"
                  />
                  <span className="truncate">{c.name}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-xs text-gray-400 text-center">
                No country found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
