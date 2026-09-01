export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  ageGroup: string;
  duration?: string;
  classDuration: string;
  image: string;
  badge?: string;
  topics: string[];
  learningOutcomes: string[];
  prerequisites: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
}

export const coursesData: Course[] = [
  {
    id: "quranic-qaidah",
    slug: "quranic-qaidah",
    title: "Quranic Qaidah",
    subtitle: "Noorani Qaida Online for Kids & Beginners | Learn Quran from Basics",
    shortDescription:
      "Our Noorani Qaida Online course is designed for kids, children, and adult beginners who want to learn how to read the Quran correctly from Arabic alphabet basics with proper Makharij pronunciation and essential Tajweed rules.",
    fullDescription:
      "The Quranic Qaida Course at Al Tanzeel Quran Academy provides a structured foundation for learners of all ages. Beginning with individual Arabic alphabets, sound articulation points (Makharij), and short vowels (Harakat: Fatha, Kasra, Damma), students learn to join letters, recognize Tanween, Sukoon, and Tashdeed. Specially crafted as the ideal Quran reading classes for kids and beginners, our certified male and female online Quran teachers maintain a patient, gentle pace to ensure accurate, confident recitation from day one.",
    ageGroup: "4+ Years (Kids & Adults)",
    classDuration: "30 Minutes / class",
    image: "/courses/quranic-qaida.jpg",
    badge: "Most Popular for Beginners",
    level: "Beginner",
    topics: [
      "Arabic Alphabet Recognition & Makharij Articulation",
      "Short Vowels (Harakat) & Long Vowels (Madd)",
      "Tanween, Sukoon, and Tashdeed Phonetics",
      "Letter Connecting & Quranic Word Formation",
      "Essential Rules of Noon Sakinah & Meem Sakinah",
      "Foundation for Fluent Quran Reading & Tajweed",
    ],
    learningOutcomes: [
      "Recognize and correctly pronounce every Arabic alphabet letter",
      "Recite simple and compound Quranic words with proper phonetics",
      "Develop confidence in reading Arabic text independently",
      "Seamlessly transition into full Quran recitation",
    ],
    prerequisites: "No prior Arabic knowledge required.",
  },
  {
    id: "quran-gateway",
    slug: "quran-gateway",
    title: "Quran Gateway",
    subtitle: "Bridge the Gap to Fluent Quran Recitation & Quran Reading Online",
    shortDescription:
      "The Quran Gateway course helps intermediate students advance beyond basic Qaida into smooth, fluent Quran reading online with rhythmic Tajweed, pausing rules (Waqf), and contextual comprehension.",
    fullDescription:
      "Quran Gateway serves as a comprehensive bridge course for students who have completed basic Noorani Qaida and want to master continuous Quran reading online. This course focuses on continuous flow, rhythmic Tajweed application, stopping and starting rules (Waqf), and core Quranic vocabulary. Learners receive 1-on-1 personalized feedback to eliminate hesitation, master correct breath control, and recite the Holy Quran with natural fluency.",
    ageGroup: "7+ Years (Kids & Adults)",
    classDuration: "30 Minutes / class",
    image: "/courses/quran-gateway.jpg",
    badge: "Recommended for Intermediate Learners",
    level: "Intermediate",
    topics: [
      "Fluency & Rhythm Enhancement in Quran Recitation",
      "Practical Rules of Waqf (Stopping & Starting in Quran)",
      "Intermediate Tajweed: Ghunna, Ikhfa, Idgham, and Iqlab",
      "Core Quranic Vocabulary & Frequently Repeated Words",
      "Memorization of Selected Short Surahs & Daily Duas",
      "Islamic Manners & Character Building through Quranic Verses",
    ],
    learningOutcomes: [
      "Recite the Holy Quran with smooth, uninterrupted flow without hesitation",
      "Apply intermediate Tajweed rules instinctively during reading",
      "Understand the core themes and messages of selected Surahs",
      "Establish a consistent, disciplined daily Quran reading routine",
    ],
    prerequisites: "Basic ability to read Arabic letters or completion of Qaida.",
  },
  {
    id: "quran-memorizing",
    slug: "quran-memorizing",
    title: "Quran Memorizing (Hifz)",
    subtitle: "Structured Hifz Quran Online with Certified Huffaz & Daily Revision",
    shortDescription:
      "Our Quran Memorization Online course provides a disciplined, structured Hifz program with certified male and female Huffaz. Master daily memorization (Sabaq), short revision (Sabqi), and long revision (Manzil).",
    fullDescription:
      "Embarking on the journey of Hifz Quran Online is one of the highest spiritual honors in Islam. Our comprehensive Quran memorization classes feature daily 1-on-1 sessions divided into three core pillars: Sabaq (New Lesson), Sabqi (Recent Revision), and Manzil (Old Revision). Experienced male and female Hafiz teachers tailor daily quotas to student capacity, incorporating proven memory retention strategies, advanced Tajweed precision, and character development.",
    ageGroup: "7+ Years (Kids & Adults)",
    classDuration: "45 Minutes / class",
    image: "/courses/quran-hifz.jpg",
    badge: "Comprehensive Hifz Program",
    level: "Advanced",
    topics: [
      "Customized Daily Memorization Targets (Sabaq)",
      "Systematic Sabqi & Manzil Daily Revision Schedule",
      "Advanced Tajweed Application & Melodic Tone (Maqamat)",
      "Overcoming Mutashabihat (Similar Verses) & Memory Retention",
      "Monthly Progress Reports & Parental Evaluation Meetings",
      "Spiritual Discipline & Character Mentorship for Huffaz",
    ],
    learningOutcomes: [
      "Memorize chosen Juz or the complete 30 Juz of the Holy Quran with precision",
      "Retain memorized Surahs securely through structured daily revision",
      "Recite effortlessly from memory during Daily Prayers and Taraweeh",
      "Earn the sacred crown of dignity and honour for parents in the Hereafter",
    ],
    prerequisites: "Fluent Quran reading ability with proper Tajweed.",
  },
  {
    id: "translation-holy-quran",
    slug: "translation-holy-quran",
    title: "Translation of The Holy Quran",
    subtitle: "Understand Divine Meanings, Quranic Arabic & Islamic Studies Online",
    shortDescription:
      "The Translation of The Holy Quran course helps youth and adult learners understand the divine meanings of Allah's words through word-for-word translation, Quranic Arabic grammar, and practical Tafseer.",
    fullDescription:
      "Reciting the Quran brings immense reward, and understanding its message transforms lives. Our online Quran translation and Islamic studies course breaks down Arabic root words, sentence structures, historical context (Asbab-al-Nuzul), and practical wisdom for everyday life. Taught by qualified Islamic scholars, this course enables students to connect deeply with Allah's guidance during prayer and daily life.",
    ageGroup: "10+ Years (Youth & Adults)",
    classDuration: "45 Minutes / class",
    image: "/courses/quran-translation.jpg",
    badge: "Spiritual Enrichment",
    level: "All Levels",
    topics: [
      "Word-for-Word Literal & Contextual English Translation",
      "Grammatical Breakdown of Key Quranic Arabic Roots",
      "Contextual Tafseer of Selected Surahs and Juz",
      "Core Islamic Studies: Beliefs (Aqeedah), Ethics & Jurisprudence",
      "Historical Background of Verses (Asbab al-Nuzul)",
      "Practical Application of Quranic Guidance in Daily Life",
    ],
    learningOutcomes: [
      "Understand the direct meaning of Quranic verses while reciting or listening",
      "Master essential Quranic Arabic vocabulary used throughout the Quran",
      "Ponder deeply (Tadabbur) upon divine wisdom and moral guidance",
      "Enhance concentration, humility, and Khushoo' in daily Salah",
    ],
    prerequisites: "Interest in learning Quranic Arabic & translation.",
  },
  {
    id: "women-quranic-course",
    slug: "women-quranic-course",
    title: "Women Quranic Course",
    subtitle: "Online Quran Classes for Women with Certified Female Scholars",
    shortDescription:
      "Our Women Quran Classes provide a comfortable, modest online learning environment taught exclusively by certified female scholars (Qarias & Huffaz) for sisters, mothers, and young girls worldwide.",
    fullDescription:
      "We understand the unique learning preferences and busy schedules of sisters and mothers. Our Women's Quran Course pairs female students with highly qualified, certified female Quran teachers. Whether learning basic Noorani Qaida, perfecting Tajweed rules, memorizing the Quran, or studying Islamic essentials for women, lessons are conducted with utmost modesty, 1-on-1 personalization, and flexible timings.",
    ageGroup: "All Ages (Sisters & Girls)",
    classDuration: "30 Minutes / class",
    image: "/courses/women-course.jpg",
    badge: "Dedicated Female Faculty",
    level: "All Levels",
    topics: [
      "Personalized 1-on-1 Sessions with Certified Female Tutors",
      "Tajweed Correction & Melodious Recitation Mastery",
      "Islamic Guidance for Women: Purification, Salah & Family Ethics",
      "Memorization of Daily Duas, Masnoon Supplications & Surahs",
      "Nurturing a Quranic Atmosphere in the Muslim Household",
      "Flexible Morning, Afternoon & Evening Class Schedules",
    ],
    learningOutcomes: [
      "Recite the Holy Quran with confidence, clarity, and authentic Tajweed",
      "Build a spiritually enriching, consistent daily Quran routine at home",
      "Gain authentic Islamic knowledge tailored to women's life stages",
      "Confidently teach and support children in their Quranic journey",
    ],
    prerequisites: "Open to all female students regardless of age or background.",
  },
  {
    id: "tajweed-course",
    slug: "tajweed-course",
    title: "Tajweed Masterclass",
    subtitle: "Learn Quran with Tajweed | Master 17 Makharij & Recitation Precision",
    shortDescription:
      "Learn Quran with Tajweed through our comprehensive Tajweed Course. Master classical recitation rules, 17 articulation points (Makharij), letter characteristics (Sifaat), and Ahkam of Noon & Meem Sakinah.",
    fullDescription:
      "Tajweed is the sacred science of giving every Arabic letter of the Quran its rights and dues. Our online Tajweed classes cover both theoretical principles (Ahkam) and rigorous oral practice (Talaqqi). Students learn heavy and light letters, elongation rules (Madd), nasalization (Ghunnah), echoing sounds (Qalqalah), and proper vocal pitch management under certified Qaris.",
    ageGroup: "6+ Years (Kids & Adults)",
    classDuration: "30 Minutes / class",
    image: "/courses/tajweed-course.jpg",
    badge: "Certification Available",
    level: "Intermediate",
    topics: [
      "Comprehensive Study of 17 Makharij (Articulation Points)",
      "Sifaat al-Huroof (Permanent & Conditional Letter Characteristics)",
      "Detailed Rules of Madd (Madd Asli, Muttasil, Munfasil, Lazim)",
      "Ahkam of Noon Sakinah, Tanween, and Meem Sakinah",
      "Rules of Heavy (Tafkheem) and Light (Tarqeeq) Letters",
      "Practical Oral Recitation Correction & Certification Exam",
    ],
    learningOutcomes: [
      "Recite the Holy Quran exactly according to verified classical Tajweed rules",
      "Identify and eliminate major (Jali) and minor (Khafi) recitation errors",
      "Master pitch modulation, breath control, and vocal resonance",
      "Receive an official Tajweed Course Certificate upon successful completion",
    ],
    prerequisites: "Basic Quran reading capability.",
  },
  {
    id: "beautiful-quran-recitation-course",
    slug: "beautiful-quran-recitation-course",
    title: "Beautiful Quran Recitation Course",
    subtitle: "Master Melodious Voice, Rhythmic Fluency & Heart-Touching Qirat",
    shortDescription:
      "The Beautiful Quran Recitation Course teaches students how to recite the Holy Quran with a soulful, melodious voice (Husn-e-Sawt), proper breath control, and classical recitation styles under expert Qaris.",
    fullDescription:
      "Reciting the Holy Quran with a beautiful, heartfelt voice fulfills the Sunnah of beautifying the Quran with our voices. In this specialized Quran recitation course, students learn the art of melodious recitation (Husn-e-Sawt), vocal pitch management, smooth rhythm, breath control, and aesthetic application of Tajweed rules. Guided 1-on-1 by certified Qaris, learners develop confidence to recite with deep reverence and touching resonance.",
    ageGroup: "All Ages (Kids & Adults)",
    classDuration: "30 Minutes / class",
    image: "/courses/quran-recitation.jpg",
    badge: "Specialized Qirat & Melody",
    level: "All Levels",
    topics: [
      "Fundamentals of Melodious Recitation (Husn-e-Sawt)",
      "Voice Modulation, Breath Control & Vocal Warm-Up Techniques",
      "Rhythmic Flow & Aesthetic Tajweed Integration",
      "Mastering Pausing (Waqf) and Resuming with Melodic Harmony",
      "Studying Classical Maqamat & Renowned World Qari Styles",
      "1-on-1 Personalized Recitation Polishing & Mentorship",
    ],
    learningOutcomes: [
      "Recite the Holy Quran with a soulful, beautiful, and confident voice",
      "Master breath control to recite longer verses with ease and control",
      "Apply Tajweed rules with effortless natural melody without straining",
      "Lead prayers and recitation gatherings with touching spiritual resonance",
    ],
    prerequisites: "Basic Quran reading ability with elementary Tajweed.",
  },
];
