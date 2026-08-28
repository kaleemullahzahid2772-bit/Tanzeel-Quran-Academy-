"use client";

import React, { useEffect } from "react";
import { X, Download, ExternalLink, BookOpen, ShieldCheck } from "lucide-react";

interface PdfReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function PdfReaderModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
}: PdfReaderModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md transition-all duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-[92vh] sm:h-[90vh] bg-[var(--color-black-soft)] border border-[var(--color-border)] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[var(--color-surface)] border-b border-[var(--color-border)] shrink-0 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 flex items-center justify-center shrink-0 text-[var(--color-accent-light)]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex flex-col">
              <h2 className="text-white font-bold text-sm sm:text-base truncate">
                {title}
              </h2>
              <p className="text-gray-400 text-[10px] sm:text-xs truncate">
                Al Tanzeel Quran Reader • Free Online Reading
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Open in New Tab Button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-gray-200 hover:text-white hover:border-[var(--color-accent)] text-xs font-semibold transition-all"
              title="Open PDF in Full Browser Window"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[var(--color-sky)]" />
              <span>Full Screen</span>
            </a>

            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Download</span>
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
              aria-label="Close PDF Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Reader Body (iframe / Object) */}
        <div className="flex-1 w-full h-full bg-[#1e1e1e] relative overflow-hidden flex flex-col">
          <iframe
            src={`${pdfUrl}#toolbar=1`}
            className="w-full h-full border-0 bg-[#1e1e1e]"
            title={title}
          />
          {/* Mobile Fallback Note */}
          <div className="sm:hidden bg-[var(--color-surface-raised)] border-t border-[var(--color-border)] px-4 py-2 flex items-center justify-between text-[11px] text-gray-300 shrink-0">
            <span>Scroll & Pinch to zoom pages</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] font-bold flex items-center gap-1"
            >
              <span>Open PDF View</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
