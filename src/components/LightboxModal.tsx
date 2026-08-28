"use client";

import React, { useEffect, useState, TouchEvent } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/gallery";

interface LightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentItem = items[currentIndex];

  const handlePrev = () => {
    if (items.length === 0) return;
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(prevIndex);
  };

  const handleNext = () => {
    if (items.length === 0) return;
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(nextIndex);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, items]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // Swiped left -> Next
      } else {
        handlePrev(); // Swiped right -> Prev
      }
    }
    setTouchStartX(null);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in p-4 sm:p-8 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background click to close */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-label="Close Lightbox"
      />

      {/* Top Controls Bar */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-4">
        {items.length > 1 && (
          <span className="text-gray-300 text-xs sm:text-sm font-bold bg-white/10 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {items.length}
          </span>
        )}

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Close image viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Previous Button (Desktop & Tablet) */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-[var(--color-accent)] text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl hidden sm:flex items-center justify-center"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Next Button (Desktop & Tablet) */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-[var(--color-accent)] text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl hidden sm:flex items-center justify-center"
          aria-label="Next photo"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="relative z-10 max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-[var(--color-black-soft)]">
          <img
            src={currentItem.image}
            alt={currentItem.caption || "Student Gallery Photo"}
            className="max-h-[75vh] w-auto object-contain max-w-full rounded-2xl"
          />

          {/* Caption Overlay Bar */}
          {currentItem.caption && (
            <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 text-center">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[var(--color-accent)]/20 border border-[var(--color-accent)]/40 text-[var(--color-accent-light)] text-xs font-bold uppercase tracking-wider mb-1">
                {currentItem.category || "Academy Photo"}
              </span>
              <h4 className="text-white text-base sm:text-xl font-bold tracking-wide">
                {currentItem.caption}
              </h4>
            </div>
          )}
        </div>

        {/* Mobile Touch Indicator / Prev-Next Buttons */}
        {items.length > 1 && (
          <div className="flex sm:hidden items-center justify-center gap-6 mt-4 z-20">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/10 text-white border border-white/20 active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-white text-xs font-semibold">
              {currentIndex + 1} of {items.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 text-white border border-white/20 active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
