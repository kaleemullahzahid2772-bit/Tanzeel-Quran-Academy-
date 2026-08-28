export interface DownloadItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  fileSize: string;
  pages: number;
  format: "PDF";
  image: string;
  downloadUrl: string;
  pdfUrl?: string;
}

export const downloadsData: DownloadItem[] = [
  {
    id: "colorful-tajweedi-quran",
    slug: "colorful-tajweedi-quran",
    title: "Colorful Tajweedi Quran",
    category: "Quran PDF",
    description:
      "Full 13-line Color Coded Tajweed Quran PDF. Color coded rules help reciters instantly identify elongation (Madd), nasalization (Ghunnah), echoing (Qalqalah), and heavy/light letters during recitation.",
    fileSize: "Complete Quran",
    pages: 604,
    format: "PDF",
    image: "/downloads/colorful-tajweed-quran.jpg",
    downloadUrl: "/pdf/quran.pdf",
    pdfUrl: "/pdf/quran.pdf",
  },
  {
    id: "english-quran-word-to-word-translation",
    slug: "english-quran-word-to-word-translation",
    title: "English Quran Word to Word Translation",
    category: "Translation PDF",
    description:
      "Comprehensive word-by-word English translation of the Holy Quran. Ideal for students learning Quranic Arabic vocabulary and understanding grammatical connections between root words.",
    fileSize: "32.8 MB",
    pages: 850,
    format: "PDF",
    image: "/downloads/word-to-word-translation.jpg",
    downloadUrl: "",
  },
  {
    id: "english-quranic-qaidah",
    slug: "english-quranic-qaidah",
    title: "English Quranic Qaidah",
    category: "Beginner Guide PDF",
    description:
      "Step-by-step beginner guide explaining Arabic alphabet rules, Makharij diagrams, and phonetic pronunciation with English instructions and transliterations for kids and new learners.",
    fileSize: "12.4 MB",
    pages: 48,
    format: "PDF",
    image: "/downloads/english-qaida.jpg",
    downloadUrl: "/pdfs/English Noorani Qaida/English Qaidah.pdf",
    pdfUrl: "/pdfs/English Noorani Qaida/English Qaidah.pdf",
  },
  {
    id: "six-kalimas",
    slug: "six-kalimas",
    title: "Six Kalima's of Islam",
    category: "Islamic Essentials PDF",
    description:
      "Beautifully formatted guide containing the 6 Kalimas of Islam with original Arabic text, English transliteration, and full English translation for memorization and reflection.",
    fileSize: "4.1 MB",
    pages: 8,
    format: "PDF",
    image: "/downloads/six-kalimas.jpg",
    downloadUrl: "/pdfs/Six kalimas of Islam/Six Kalma's.pdf",
    pdfUrl: "/pdfs/Six kalimas of Islam/Six Kalma's.pdf",
  },
  {
    id: "namaz",
    slug: "namaz",
    title: "Namaz Step-by-Step Learning Guide",
    category: "Prayer Guide PDF",
    description:
      "Illustrated step-by-step guide for performing daily Salah (Namaz) correctly according to Sunnah. Includes Wudu steps, postures, Arabic recitations, and English translations.",
    fileSize: "8.5 MB",
    pages: 24,
    format: "PDF",
    image: "/downloads/namaz-guide.jpg",
    downloadUrl: "/pdfs/Namaz Guide/Complete Namaz.pdf",
    pdfUrl: "/pdfs/Namaz Guide/Complete Namaz.pdf",
  },
  {
    id: "essential-duas",
    slug: "essential-duas",
    title: "Essential Duas in the Life of a Muslim",
    category: "Daily Supplications PDF",
    description:
      "Curated collection of authentic daily Sunnah Duas for waking up, sleeping, eating, traveling, entering masjid, and seeking protection. Clear Arabic script with English meanings.",
    fileSize: "6.2 MB",
    pages: 36,
    format: "PDF",
    image: "/downloads/essential-duas.jpg",
    downloadUrl: "/pdfs/Duas of Muslim/Daily Life Duas - .pdf",
    pdfUrl: "/pdfs/Duas of Muslim/Daily Life Duas - .pdf",
  },
];
