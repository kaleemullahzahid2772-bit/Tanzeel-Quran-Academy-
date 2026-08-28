export interface Testimonial {
  id: string;
  name: string;
  location: string;
  courseTaken: string;
  rating: number;
  quote: string;
  avatar: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Sarah Khan",
    location: "Houston, Texas, USA",
    courseTaken: "Women Quranic Course",
    rating: 5,
    quote:
      "Learning with Ustadha Fatima has been a spiritual turning point for me. As a busy physician, the flexible weekend timings allowed me to finally correct my Tajweed and recite during daily prayer with true confidence.",
    avatar: "/testimonials/avatar-1.jpg",
  },
  {
    id: "test-2",
    name: "Tariq Mahmood",
    location: "Toronto, Canada",
    courseTaken: "Quran Memorizing (Hifz)",
    rating: 5,
    quote:
      "My 9-year-old son completed 5 Juz in just 8 months! Qari Ibrahim's patience and daily revision method made memorization enjoyable rather than overwhelming.",
    avatar: "/testimonials/avatar-2.jpg",
  },
  {
    id: "test-3",
    name: "Amina Yusuf",
    location: "London, UK",
    courseTaken: "Quranic Qaidah",
    rating: 5,
    quote:
      "As a revert to Islam, I was anxious about learning Arabic from scratch. Tanzeel Quran Academy made me feel welcomed and supported from day one. I am now reading full Surahs!",
    avatar: "/testimonials/avatar-3.jpg",
  },
];
