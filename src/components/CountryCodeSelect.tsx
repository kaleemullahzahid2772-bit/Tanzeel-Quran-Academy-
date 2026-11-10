"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { countriesData, CountryData, getFlagUrl } from "@/data/countries";

interface CountryCodeSelectProps {
  value: string;
  onChange: (dialCode: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export default function CountryCodeSelect({
  value,
  onChange,
  required = false,
  disabled = false,
}: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find country matching the dial code (or fallback to Maldives/first match)
  const currentCountry =
    countriesData.find((c) => c.dialCode === value) ||
    countriesData[0];

  // Filter countries by name or dial code
  const filteredCountries = countriesData.filter((c) => {
    const term = searchTerm.toLowerCase().trim().replace(/^\+/, "");
    const nameMatch = c.name.toLowerCase().includes(term);
    const codeMatch = c.dialCode.replace(/^\+/, "").includes(term);
    return nameMatch || codeMatch;
  });

  // Close dropdown on outside click
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
    onChange(country.dialCode);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-label="Select Country Dial Code"
        className="w-full bg-black border border-white/15 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] text-white text-xs sm:text-sm rounded-xl px-2.5 h-[46px] flex items-center justify-between gap-1.5 outline-none transition-colors cursor-pointer text-left shadow-inner disabled:opacity-50"
      >
        <div className="flex items-center gap-1.5 truncate">
          <img
            src={getFlagUrl(currentCountry.code)}
            alt={currentCountry.name}
            className="w-4 h-3 object-cover rounded shadow-sm shrink-0 border border-white/20"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-semibold text-white tracking-wide truncate">
            {value || currentCountry.dialCode}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 w-64 sm:w-72 mt-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] overflow-hidden animate-fade-in max-h-64 flex flex-col">
          {/* Search Box */}
          <div className="p-2 border-b border-[var(--color-border)] bg-[var(--color-black-soft)] sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search code or country..."
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-white text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          </div>

          {/* List of Countries & Dial Codes */}
          <div className="overflow-y-auto flex-1 divide-y divide-white/5">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c, idx) => {
                const isSelected = c.dialCode === value && c.name === currentCountry.name;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}-${idx}`}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full px-3 py-2 flex items-center justify-between text-xs text-left transition-colors hover:bg-[var(--color-accent)]/15 hover:text-[var(--color-accent-light)] ${
                      isSelected
                        ? "bg-[var(--color-accent)]/20 font-bold text-[var(--color-accent-light)]"
                        : "text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <img
                        src={getFlagUrl(c.code)}
                        alt={c.name}
                        className="w-4 h-3 object-cover rounded shadow-sm shrink-0 border border-white/20"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[var(--color-accent-light)] shrink-0">
                      {c.dialCode}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-gray-400">
                No matching country code found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
