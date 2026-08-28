export interface QuranJuzItem {
  id: string;
  number: number | "Full";
  title: string;
  arabicTitle?: string;
  pdfUrl: string;
  isAvailable: boolean;
  fileSize?: string;
  pages?: number;
}

export const quranJuzData: QuranJuzItem[] = [
  // Box 1: Full Quran
  {
    id: "full-quran",
    number: "Full",
    title: "Full Quran",
    arabicTitle: "القرآن الكريم",
    pdfUrl: "/pdf/quran.pdf",
    isAvailable: true,
    fileSize: "Complete Quran",
    pages: 604,
  },
  // Boxes 2 to 31: Juz 1 to Juz 30 mapped to /pdfs/Juz 01.pdf ... /pdfs/Juz 30.pdf
  ...Array.from({ length: 30 }, (_, i) => {
    const juzNum = i + 1;
    const paddedNum = String(juzNum).padStart(2, "0");
    return {
      id: `juz-${juzNum}`,
      number: juzNum,
      title: `Juz ${juzNum}`,
      arabicTitle: `الجزء ${juzNum}`,
      pdfUrl: `/pdfs/Juz ${paddedNum}.pdf`,
      isAvailable: true,
    };
  }),
];
