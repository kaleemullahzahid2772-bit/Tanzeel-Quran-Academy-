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

    return {
      id: `eng-trans-juz-${juzNum}`,
      number: juzNum,
      title: `Juz ${juzNum}`,
      arabicTitle: `الجزء ${juzNum}`,
      pdfUrl: `https://archive.org/download/QuranEnglishWordForWordTranslation/Juz%20${paddedNum}.pdf`,
      isAvailable: true,
    };
  }
);
