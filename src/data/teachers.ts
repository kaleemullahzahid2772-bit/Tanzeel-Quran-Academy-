export interface Teacher {
  id: string;
  name: string;
  role: string;
  experience: string;
  gender: "Male" | "Female";
  languages: string[];
  specialties: string[];
  bio: string;
  image: string;
  imagePosition?: string;
  ijazah?: string;
  totalStudents?: string;
}

export const teachersData: Teacher[] = [
  {
    id: "teacher-1",
    name: "Sheikh Khizar Hayat",
    role: "Principal",
    experience: "15+ Years Experience",
    gender: "Male",
    languages: ["English", "Arabic", "Urdu"],
    specialties: ["Academy Leadership", "Curriculum Design", "Islamic Ethics"],
    bio: "As the Principal of Al Tanzeel Quran Academy, Sheikh Khizar Hayat oversees the academic standards, faculty credentials, and global online curriculum to ensure authentic Islamic education for every student.",
    image: "/teachers/sheikh-khizar-hayat.jpg",
    imagePosition: "center 10%",
    ijazah: "Academy Principal",
    totalStudents: "500+ Students Mentored",
  },
  {
    id: "teacher-2",
    name: "Sheikh Abdul Rahman Naeem",
    role: "Tafseer & Hadees",
    experience: "12+ Years Experience",
    gender: "Male",
    languages: ["English", "Arabic", "Urdu"],
    specialties: ["Quranic Tafseer", "Hadith Sciences", "Quranic Arabic Grammar"],
    bio: "Certified Islamic Scholar specializing in comprehensive Tafseer of the Holy Quran and Hadith literature. Sheikh Abdul Rahman guides adult and youth learners to understand divine wisdom and contextual application.",
    image: "/teachers/sheikh-abdul-rahman-naeem.jpg",
    imagePosition: "center 15%",
    ijazah: "Certified Alim & Mufassir",
    totalStudents: "350+ Students Taught",
  },
  {
    id: "teacher-3",
    name: "Qari Salman Karamat",
    role: "Tajweed & Qirat",
    experience: "10+ Years Experience",
    gender: "Male",
    languages: ["English", "Arabic", "Urdu"],
    specialties: ["Ten Qira'at", "Makharij Articulation", "Melodic Recitation"],
    bio: "Master Qari holding Ijazah in classical Qira'at. Ustadh Qari Salman Karamat focuses on oral articulation points, vocal resonance, and eliminating minor phonetic errors to achieve flawless Tajweed.",
    image: "/teachers/qari-salman-karamat.jpg",
    imagePosition: "center 10%",
    ijazah: "Sanad & Ijazah Holder",
    totalStudents: "280+ Students Taught",
  },
  {
    id: "teacher-4",
    name: "Qari Abrar Ul Haq",
    role: "Nazra & Hifz",
    experience: "9+ Years Experience",
    gender: "Male",
    languages: ["English", "Arabic", "Urdu"],
    specialties: ["Full Hifz-ul-Quran", "Daily Revision System", "Nazra Fluency"],
    bio: "Hafiz-ul-Quran dedicated to structured memorization and Nazra reading fluency. Qari Abrar Ul Haq uses patient, daily 1-on-1 revision quotas to help kids and adults retain their Hifz securely.",
    image: "/teachers/teacher-4.jpg",
    ijazah: "Hifz Program Coach",
    totalStudents: "220+ Huffaz Mentored",
  },
  {
    id: "teacher-5",
    name: "Qari Umar Hayat",
    role: "Senior Instructor",
    experience: "11+ Years Experience",
    gender: "Male",
    languages: ["English", "Arabic", "Urdu"],
    specialties: ["Quranic Qaidah", "Intermediate Recitation", "Slow Learner Coaching"],
    bio: "Senior Instructor with extensive experience in teaching beginners and slow learners. Qari Umar Hayat provides supportive, step-by-step guidance to build strong confidence in Quran reading.",
    image: "/teachers/qari-umar-hayat.jpg",
    imagePosition: "center 15%",
    ijazah: "Senior Academic Instructor",
    totalStudents: "300+ Students Taught",
  },
  {
    id: "teacher-6",
    name: "Qaria Bint-E-Ishaaq",
    role: "Female Quran Teacher",
    experience: "10+ Years Experience",
    gender: "Female",
    languages: ["English", "Arabic", "Urdu"],
    specialties: ["Female Quran Course", "Kids Qaida Masterclass", "Women Fiqh & Duas"],
    bio: "Certified female Hafiza and Qaria providing private 1-on-1 online classes for sisters, young girls, and children in a comfortable, modest, and nurturing environment.",
    image: "/teachers/qaria-bint-e-ishaaq.jpg",
    imagePosition: "center 20%",
    ijazah: "Certified Female Scholar",
    totalStudents: "250+ Sisters Taught",
  },
];
