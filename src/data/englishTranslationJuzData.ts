export interface EnglishTranslationJuzItem {
  id: string;
  number: number;
  title: string;
  arabicTitle?: string;
  pdfUrl: string;
  isAvailable: boolean;
}

export const englishTranslationJuzData: EnglishTranslationJuzItem[] = Array.from(
  { length: 30 },
  (_, i) => {
    const juzNum = i + 1;
    const paddedNum = String(juzNum).padStart(2, "0");
    // Handle exact filename for Juz 18 ("JUz 18.pdf") and others ("Juz XX.pdf")
    const fileName = juzNum === 18 ? "JUz 18.pdf" : `Juz ${paddedNum}.pdf`;

    return {
      id: `eng-trans-juz-${juzNum}`,
      number: juzNum,
      title: `Juz ${juzNum}`,
      arabicTitle: `الجزء ${juzNum}`,
      pdfUrl: `/pdfs/English word to word/${fileName}`,
      isAvailable: true,
    };
  }
);
