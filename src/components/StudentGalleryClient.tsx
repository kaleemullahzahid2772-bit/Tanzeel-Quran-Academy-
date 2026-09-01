"use client";

import React, { useState } from "react";
import { Eye, Image as ImageIcon } from "lucide-react";
import { galleryImages, GalleryItem } from "@/data/gallery";
import LightboxModal from "@/components/LightboxModal";

function GalleryCardItem({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onOpen(index)}
      className="group relative bg-[var(--color-surface)] border-2 border-[#429cd5]/30 hover:border-[#429cd5] rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(66,156,213,0.35)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col min-h-[220px]"
    >
      {/* Photo Aspect Ratio Wrapper */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-black-soft)] flex items-center justify-center">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.caption ? `${item.caption} - Al Tanzeel Quran Academy Student` : `Online Quran Student Photo ${index + 1} - Al Tanzeel Quran Academy`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
            loading="lazy"
            decoding="async"
          />
        ) : (
          /* Placeholder Box for Empty / Pending Upload Slots */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center bg-gradient-to-b from-[var(--color-surface-raised)] to-[var(--color-black-soft)]">
            <div className="w-12 h-12 rounded-2xl bg-[#429cd5]/10 border border-[#429cd5]/30 flex items-center justify-center text-[#429cd5] group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-white text-xs font-bold uppercase tracking-wider mt-1">
              Slot #{index + 1}
            </span>
            <span className="text-gray-400 text-[10px] font-semibold">
              Ready for Student Photo
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        {!imgError && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Category Tag Badge */}
        {item.category && (
          <span className="absolute top-3 left-3 bg-[var(--color-black-soft)]/90 backdrop-blur-md border border-white/10 text-[var(--color-sky-light)] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md z-10">
            {item.category}
          </span>
        )}
      </div>

      {/* Card Short Caption Footer */}
      {item.caption && (
        <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex items-center justify-between gap-2">
          <h3 className="font-bold text-sm text-white group-hover:text-[var(--color-accent-light)] transition-colors truncate">
            {item.caption}
          </h3>
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider shrink-0">
            View
          </span>
        </div>
      )}
    </div>
  );
}

export default function StudentGalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories
  const rawCategories = galleryImages
    .map((img) => img.category)
    .filter((cat): cat is NonNullable<typeof cat> => Boolean(cat));
  const categories: string[] = ["All", ...Array.from(new Set(rawCategories))];

  // Filter images by selected category
  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <section className="bg-[var(--color-black)] py-16 px-4 flex-1">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-accent)] text-white shadow-[0_4px_15px_rgba(250,132,30,0.35)] scale-105"
                      : "bg-[var(--color-surface)] border border-[var(--color-border)] text-gray-400 hover:text-white hover:border-[#429cd5]/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Photo Cards Grid (12 Slots) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredImages.map((item, idx) => (
            <GalleryCardItem
              key={item.id}
              item={item}
              index={idx}
              onOpen={handleOpenLightbox}
            />
          ))}
        </div>

        {/* Empty State Fallback */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            No photos found in this category.
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Image Viewer Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          isOpen={lightboxIndex !== null}
          currentIndex={lightboxIndex}
          items={filteredImages}
          onClose={handleCloseLightbox}
          onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        />
      )}
    </section>
  );
}
