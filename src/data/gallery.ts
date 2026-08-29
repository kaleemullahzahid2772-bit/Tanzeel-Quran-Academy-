export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category?: "Quran Class" | "Tajweed Class" | "Hifz Class" | "Academy Activities" | "Our Students";
}

/**
 * STUDENT GALLERY DATA
 * 12 Gallery Slots:
 * To add your real photo:
 * 1. Upload your photo to `public/gallery/` folder (e.g. `public/gallery/student-1.jpg`).
 * 2. Update the `image` path and `caption` below.
 */
export const galleryImages: GalleryItem[] = [
  {
    id: "gallery-1",
    image: "/gallery/student-1.jpg",
    caption: "Quran Recitation Class",
    category: "Quran Class",
  },
  {
    id: "gallery-2",
    image: "/gallery/student-2.jpg",
    caption: "Tajweed Mastery Lesson",
    category: "Tajweed Class",
  },
  {
    id: "gallery-3",
    image: "/gallery/student-3.jpg",
    caption: "Hifz Memorization Session",
    category: "Hifz Class",
  },
  {
    id: "gallery-4",
    image: "/gallery/student-4.jpg",
    caption: "Online 1-on-1 Class",
    category: "Quran Class",
  },
  {
    id: "gallery-5",
    image: "/gallery/student-5.jpg",
    caption: "Live 1-on-1 Quran Class",
    category: "Quran Class",
  },
  {
    id: "gallery-6",
    image: "/gallery/student-6.jpg",
    caption: "Student Qaida Practice",
    category: "Our Students",
  },
  {
    id: "gallery-7",
    image: "/gallery/student-7.jpg",
    caption: "Quran Fluency Progress",
    category: "Quran Class",
  },
  {
    id: "gallery-8",
    image: "/gallery/student-8.jpg",
    caption: "Interactive Tajweed Session",
    category: "Tajweed Class",
  },
  {
    id: "gallery-9",
    image: "/gallery/student-9.jpg",
    caption: "Student Achievement",
    category: "Our Students",
  },
  {
    id: "gallery-10",
    image: "/gallery/student-10.jpg",
    caption: "Quranic Arabic Guidance",
    category: "Quran Class",
  },
  {
    id: "gallery-11",
    image: "/gallery/student-11.jpg",
    caption: "Online Quran Mentorship & Class",
    category: "Quran Class",
  },
  {
    id: "gallery-12",
    image: "/gallery/student-12.jpg",
    caption: "Online Tajweed Lesson",
    category: "Tajweed Class",
  },
];
