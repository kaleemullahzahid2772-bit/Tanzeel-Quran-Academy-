"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { downloadsData } from "@/data/downloads";
import { quranJuzData, QuranJuzItem } from "@/data/quranJuzData";
import { englishTranslationJuzData, EnglishTranslationJuzItem } from "@/data/englishTranslationJuzData";
import {
  ArrowLeft,
  Download,
  BookOpen,
  FileText,
  CheckCircle2,
  Lock,
} from "lucide-react";
import PdfReaderModal from "@/components/PdfReaderModal";

interface DownloadDetailPageProps {
  params: {
    slug: string;
  };
}

export default function DownloadDetailPage({ params }: DownloadDetailPageProps) {
  const [activeModalItem, setActiveModalItem] = useState<{ pdfUrl: string; title: string } | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const item = downloadsData.find((d) => d.slug === params.slug);

  if (!item) {
    notFound();
  }

  const isTajweediQuranPage = params.slug === "colorful-tajweedi-quran";
  const isEnglishTranslationPage = params.slug === "english-quran-word-to-word-translation";

  const handleDownload = (juz: { id: string; title: string; pdfUrl: string; isAvailable: boolean }) => {
    if (!juz.isAvailable || !juz.pdfUrl) return;

    const link = document.createElement("a");
    link.href = juz.pdfUrl;
    link.download = `${juz.title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedId(juz.id);
    setTimeout(() => setDownloadedId(null), 3000);
  };

  // 1. Tajweedi Quran 31 Compact Boxes View (System 1 - UNTOUCHED)
  if (isTajweediQuranPage) {
    return (
      <>
        <div className="flex flex-col w-full min-h-screen">
          {/* Header Banner */}
          <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-14 sm:py-16 px-4 border-b border-[var(--color-border)]">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-accent)] hover:text-white uppercase tracking-wider transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Downloads</span>
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Quran PDF Collection
                </span>
                <span className="bg-[var(--color-sky)]/20 text-[var(--color-sky-light)] border border-[var(--color-sky)]/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  31 Total Boxes (1 Full Quran + 30 Juz)
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white">
                Colorful Tajweedi <span className="text-[var(--color-accent)]">Quran</span>
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Full 13-line Color Coded Tajweed Quran PDF. Select <strong className="text-white">Full Quran</strong> for complete recitation PDF, or choose any individual <strong className="text-white">Juz (Para 1 to 30)</strong> to read online or download.
              </p>
            </div>
          </section>

          {/* 31 Compact Boxes Grid */}
          <section className="bg-[var(--color-black)] py-12 px-4 flex-1">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--color-accent)]" />
                  <h2 className="text-white font-bold text-lg sm:text-xl">Select Full Quran or Juz</h2>
                </div>
                <span className="text-xs text-gray-400">31 Compact Boxes</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                {quranJuzData.map((juzItem) => {
                  const isFull = juzItem.id === "full-quran";

                  return (
                    <div
                      key={juzItem.id}
                      className={`relative rounded-xl p-4 border flex flex-col justify-between transition-all duration-300 shadow-md hover:-translate-y-1 ${
                        isFull
                          ? "bg-[var(--color-surface)] border-[var(--color-accent)] shadow-[0_4px_20px_rgba(250,132,30,0.25)] ring-1 ring-[var(--color-accent)]/50"
                          : "bg-[var(--color-surface)]/90 border-[var(--color-border)] hover:border-[var(--color-sky)]/60"
                      }`}
                    >
                      {/* Box Header */}
                      <div className="flex items-start justify-between gap-1 mb-3">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center ${
                            isFull
                              ? "bg-[var(--color-accent)] text-white"
                              : "bg-[var(--color-sky)]/20 text-[var(--color-sky-light)] border border-[var(--color-sky)]/30"
                          }`}
                        >
                          {isFull ? "★" : juzItem.number}
                        </span>

                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            isFull
                              ? "bg-[var(--color-accent)]/20 text-[var(--color-accent-light)] border border-[var(--color-accent)]/40"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {isFull ? "Full PDF" : "PDF Ready"}
                        </span>
                      </div>

                      {/* Box Title */}
                      <div className="mb-4">
                        <h3 className="text-white font-bold text-sm leading-tight truncate">
                          {juzItem.title}
                        </h3>
                        {juzItem.arabicTitle && (
                          <p className="text-[var(--color-sky-light)] font-arabic text-xs mt-1 truncate">
                            {juzItem.arabicTitle}
                          </p>
                        )}
                      </div>

                      {/* Box Actions */}
                      <div className="pt-2 border-t border-[var(--color-border)]/60 flex flex-col gap-1.5">
                        <button
                          onClick={() => setActiveModalItem({ pdfUrl: juzItem.pdfUrl, title: juzItem.title })}
                          className="w-full py-1.5 px-2 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:bg-white/5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                          <span>{isFull ? "Read Quran" : "Read Juz"}</span>
                        </button>

                        <button
                          onClick={() => handleDownload(juzItem)}
                          className="w-full py-1.5 px-2 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                        >
                          {downloadedId === juzItem.id ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                              <span>Downloaded</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* PDF Reader Modal */}
        {activeModalItem && (
          <PdfReaderModal
            isOpen={Boolean(activeModalItem)}
            onClose={() => setActiveModalItem(null)}
            pdfUrl={activeModalItem.pdfUrl}
            title={activeModalItem.title}
          />
        )}
      </>
    );
  }

  // 2. English Quran Word to Word Translation 30 Compact Boxes View (System 2 - CONNECTED)
  if (isEnglishTranslationPage) {
    return (
      <>
        <div className="flex flex-col w-full min-h-screen">
          {/* Header Banner */}
          <section className="relative overflow-hidden bg-[var(--color-black-soft)] py-14 sm:py-16 px-4 border-b border-[var(--color-border)]">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--color-sky)]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-accent)] hover:text-white uppercase tracking-wider transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Downloads</span>
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[var(--color-sky)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  English Translation PDF
                </span>
                <span className="bg-[var(--color-sky)]/20 text-[var(--color-sky-light)] border border-[var(--color-sky)]/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  30 Total Boxes (Juz 1 to Juz 30)
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white">
                English Quran <span className="text-[var(--color-accent)]">Word to Word Translation</span>
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Comprehensive word-by-word English translation of the Holy Quran. Ideal for students learning Quranic Arabic vocabulary. Select any Juz below (Juz 1 to 30) to read online or download its dedicated translation PDF.
              </p>
            </div>
          </section>

          {/* 30 Compact Boxes Grid */}
          <section className="bg-[var(--color-black)] py-12 px-4 flex-1">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--color-sky)]" />
                  <h2 className="text-white font-bold text-lg sm:text-xl">English Word to Word Translation (30 Juz)</h2>
                </div>
                <span className="text-xs text-gray-400">30 Compact Boxes</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                {englishTranslationJuzData.map((juzItem) => (
                  <div
                    key={juzItem.id}
                    className="relative rounded-xl p-4 border flex flex-col justify-between transition-all duration-300 shadow-md hover:-translate-y-1 bg-[var(--color-surface)]/90 border-[var(--color-border)] hover:border-[var(--color-sky)]/60"
                  >
                    {/* Box Header */}
                    <div className="flex items-start justify-between gap-1 mb-3">
                      <span className="w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center bg-[var(--color-sky)]/20 text-[var(--color-sky-light)] border border-[var(--color-sky)]/30">
                        {juzItem.number}
                      </span>

                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        PDF Ready
                      </span>
                    </div>

                    {/* Box Title */}
                    <div className="mb-4">
                      <h3 className="text-white font-bold text-sm leading-tight truncate">
                        {juzItem.title}
                      </h3>
                      {juzItem.arabicTitle && (
                        <p className="text-[var(--color-sky-light)] font-arabic text-xs mt-1 truncate">
                          {juzItem.arabicTitle}
                        </p>
                      )}
                    </div>

                    {/* Box Actions */}
                    <div className="pt-2 border-t border-[var(--color-border)]/60 flex flex-col gap-1.5">
                      <button
                        onClick={() => setActiveModalItem({ pdfUrl: juzItem.pdfUrl, title: `English Translation - ${juzItem.title}` })}
                        className="w-full py-1.5 px-2 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] hover:border-[var(--color-sky)] text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:bg-white/5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[var(--color-sky)]" />
                        <span>Read</span>
                      </button>

                      <button
                        onClick={() => handleDownload({ id: juzItem.id, title: `English_Translation_${juzItem.title}`, pdfUrl: juzItem.pdfUrl, isAvailable: true })}
                        className="w-full py-1.5 px-2 rounded-lg bg-[var(--color-sky)] hover:bg-[var(--color-sky)]/80 text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                      >
                        {downloadedId === juzItem.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Downloaded</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* PDF Reader Modal */}
        {activeModalItem && (
          <PdfReaderModal
            isOpen={Boolean(activeModalItem)}
            onClose={() => setActiveModalItem(null)}
            pdfUrl={activeModalItem.pdfUrl}
            title={activeModalItem.title}
          />
        )}
      </>
    );
  }

  // Fallback view for other single download items
  const hasPdf = Boolean(item.downloadUrl && item.downloadUrl.trim() !== "");

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <section className="relative bg-[var(--color-black-soft)] py-16 px-4 border-b border-[var(--color-border)]">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-accent)] hover:text-white uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Downloads</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {item.category}
              </span>
              <span className="bg-[var(--color-sky)]/20 text-[var(--color-sky-light)] border border-[var(--color-sky)]/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {item.fileSize}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">{item.title}</h1>
          </div>
        </section>

        <section className="bg-[var(--color-black)] py-16 px-4 flex-1">
          <div className="max-w-4xl mx-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 sm:p-12 flex flex-col gap-8 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center shrink-0 text-[var(--color-accent)]">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{item.title}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Format: {item.format} • Pages: {item.pages} • Size: {item.fileSize}
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed border-y border-[var(--color-border)] py-6">
              {item.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              {hasPdf ? (
                <>
                  <button
                    onClick={() =>
                      setActiveModalItem({
                        pdfUrl: item.downloadUrl,
                        title: item.title,
                      })
                    }
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/60 text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5"
                  >
                    <BookOpen className="w-4 h-4 text-[var(--color-sky)]" />
                    <span>Read Online</span>
                  </button>

                  <button
                    onClick={() =>
                      handleDownload({
                        id: item.id,
                        title: item.title,
                        pdfUrl: item.downloadUrl,
                        isAvailable: true,
                      })
                    }
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(250,132,30,0.4)] transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF File Now</span>
                  </button>
                </>
              ) : (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-center gap-3 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>PDF Resource Unconfigured / Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {activeModalItem && (
        <PdfReaderModal
          isOpen={Boolean(activeModalItem)}
          onClose={() => setActiveModalItem(null)}
          pdfUrl={activeModalItem.pdfUrl}
          title={activeModalItem.title}
        />
      )}
    </>
  );
}
