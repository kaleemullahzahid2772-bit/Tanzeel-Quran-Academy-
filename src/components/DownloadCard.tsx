"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, FileText, BookOpen, CheckCircle2, Lock, Grid } from "lucide-react";
import { DownloadItem } from "@/data/downloads";
import PdfReaderModal from "@/components/PdfReaderModal";

interface DownloadCardProps {
  item: DownloadItem;
}

export default function DownloadCard({ item }: DownloadCardProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const hasPdf = Boolean(item.downloadUrl && item.downloadUrl.trim() !== "");
  const isTajweediQuran = item.id === "colorful-tajweedi-quran";
  const isEnglishTranslation = item.id === "english-quran-word-to-word-translation";

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasPdf) return;

    const link = document.createElement("a");
    link.href = item.downloadUrl;
    link.download = `${item.title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <>
      <div
        className={`group relative bg-[var(--color-surface)] rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col shadow-lg ${
          isTajweediQuran || isEnglishTranslation
            ? "border-[var(--color-accent)] shadow-[0_10px_30px_rgba(250,132,30,0.15)] hover:-translate-y-1"
            : "border-[var(--color-sky)]/20 hover:border-gray-700"
        }`}
      >
        {/* Visual Image Header */}
        <Link href={`/downloads/${item.slug}`} className="block" title={`View ${item.title} Download Page`}>
          <div className="relative h-52 w-full overflow-hidden bg-[var(--color-black-soft)] border-b border-[var(--color-border)]">
            {item.image ? (
              <Image
                src={item.image}
                alt={`${item.title} - Free Islamic PDF Resource at Al Tanzeel Quran Academy`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[var(--color-surface-raised)] to-black">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)] via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Category Tag */}
            <div className="absolute bottom-3 left-3 z-10">
              <span className="bg-[var(--color-black)]/80 backdrop-blur-md text-white border border-[var(--color-border)] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                {item.category}
              </span>
            </div>

            {/* Metadata Badge */}
            <span className="absolute top-3 right-3 z-10 bg-[var(--color-black)]/85 backdrop-blur-md text-gray-200 border border-white/10 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md">
              {isEnglishTranslation ? "30 Juz Boxes" : `${item.fileSize} • ${item.pages} Pages`}
            </span>

            {/* Collection Badges */}
            {isTajweediQuran && (
              <span className="absolute top-3 left-3 z-10 bg-[var(--color-accent)] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                31 Total Boxes
              </span>
            )}

            {isEnglishTranslation && (
              <span className="absolute top-3 left-3 z-10 bg-[var(--color-sky)] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                30 Juz Boxes
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <Link href={`/downloads/${item.slug}`} title={`View ${item.title}`}>
            <h3 className="text-white font-black text-base group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-tight">
              {item.title}
            </h3>
          </Link>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-2">
            {item.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center gap-2.5">
            {isTajweediQuran ? (
              <>
                <Link
                  href={`/downloads/${item.slug}`}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/60 text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/5 group/read"
                >
                  <Grid className="w-4 h-4 text-[var(--color-sky)] group-hover/read:scale-110 transition-transform" />
                  <span>31 Juz Boxes</span>
                </Link>

                <button
                  onClick={handleDownload}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  {downloaded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </>
            ) : isEnglishTranslation ? (
              <>
                <Link
                  href={`/downloads/${item.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md group/read"
                >
                  <Grid className="w-4 h-4 text-white group-hover/read:scale-110 transition-transform" />
                  <span>Open 30 Juz Boxes</span>
                </Link>
              </>
            ) : hasPdf ? (
              <>
                <button
                  onClick={() => setIsReaderOpen(true)}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/60 text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/5"
                >
                  <BookOpen className="w-4 h-4 text-[var(--color-sky)]" />
                  <span>Read Online</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  {downloaded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-xs font-bold uppercase tracking-wider cursor-not-allowed opacity-60"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Coming Soon</span>
                </button>

                <button
                  disabled
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-xs font-bold uppercase tracking-wider cursor-not-allowed opacity-60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Pending</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {hasPdf && (
        <PdfReaderModal
          isOpen={isReaderOpen}
          onClose={() => setIsReaderOpen(false)}
          pdfUrl={item.downloadUrl}
          title={item.title}
        />
      )}
    </>
  );
}
