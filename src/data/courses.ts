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
    subtitle: "Master the Fundamentals of Arabic & Quran Recitation",
    shortDescription:
      "The Quranic Qaida course is designed for beginners who want to learn how to read the Quran correctly from the very basics. In this course, students are taught Arabic letters, pronunciation, and essential Tajweed rules step by step.",
    fullDescription:
      "Our Quranic Qaida course provides a structured foundation for learners of all ages. Beginning with individual Arabic alphabets, sound articulation points (Makharij), and vowel marks (Fatha, Kasra, Damma), students progress towards joining letters, understanding Sukoon, Tanween, and basic rules of Tajweed. Designed specifically for kids and adults starting from scratch, our tutors maintain a patient, gentle pace to ensure accurate pronunciation.",
    ageGroup: "4+ Years",
    classDuration: "30 Minutes / class",
    image: "/courses/quranic-qaida.jpg",
    badge: "Most Popular for Beginners",
    level: "Beginner",
    topics: [
      "Arabic Alphabet Recognition & Pronunciation",
      "Correct Articulation Points (Makharij)",
      "Short Vowels (Harakat) & Long Vowels (Madd)",
      "Tanween, Sukoon, and Tashdeed Rules",
      "Joining Letters & Word Formation",
      "Essential Rules for Noon & Meem Sakinah",
    ],
    learningOutcomes: [
      "Recognize and correctly pronounce every Arabic letter",
      "Recite simple Quranic words with proper phonetics",
      "Develop confidence in reading Arabic text independently",
      "Transition seamlessly into full Quran recitation",
    ],
    prerequisites: "No prior Arabic knowledge required.",
  },
  {
    id: "quran-gateway",
    slug: "quran-gateway",
    title: "Quran Gateway",
    subtitle: "Bridge the Gap to Fluent Quran Recitation & Understanding",
    shortDescription:
      "The Quran Gateway course is designed to help students move beyond the basics and develop a deeper connection with the Quran. Students improve their recitation, strengthen Tajweed, and begin to understand Quranic meanings.",
    fullDescription:
      "Quran Gateway serves as a comprehensive bridge course for students who have completed basic Qaida or possess elementary reading ability. This course focuses on continuous flow, rhythmic Tajweed application, stopping and starting rules (Waqf), and contextual vocabulary comprehension. Learners receive 1-on-1 personalized feedback to polish rhythm, eliminate hesitation, and build a lasting spiritual relationship with Allah's words.",
    ageGroup: "7+ Years",
    classDuration: "30 Minutes / class",
    image: "/courses/quran-gateway.jpg",
    badge: "Recommended for Intermediate Learners",
    level: "Intermediate",
    topics: [
      "Fluency & Rhythm Enhancement in Recitation",
      "Practical Rules of Waqf (Pausing & Resuming)",
      "Intermediate Tajweed: Ghunna, Ikhfa, Idgham, Iqlab",
      "Key Vocabulary & Commonly Repeated Words in the Quran",
      "Memorization of Short Surahs & Daily Adhkar",
      "Character Building through Quranic Lessons",
    ],
    learningOutcomes: [
      "Recite the Quran with smooth, natural flow without stammering",
      "Apply intermediate Tajweed rules instinctively during reading",
      "Understand core themes and message of selected Surahs",
      "Establish a consistent daily Quran reading habit",
    ],
    prerequisites: "Basic ability to read Arabic letters or completion of Qaida.",
  },
  {
    id: "quran-memorizing",
    slug: "quran-memorizing",
    title: "Quran Memorizing (Hifz)",
    subtitle: "Commit the Divine Message to Heart with Certified Huffaz",
    shortDescription:
      "The Quran Memorizing course is designed for students who wish to memorize the Holy Quran with proper guidance and discipline. Our teachers support students with structured lessons, regular revision, and retention techniques.",
    fullDescription:
      "Embarking on the journey of Hifz-ul-Quran is one of the highest honors in Islam. Our structured Hifz program features daily 1-on-1 sessions divided into three core pillars: Sabaq (New Lesson), Sabqi (Recent Revision), and Manzil (Old Revision). Experienced male and female Hafiz teachers tailor daily quotas to student capacity, incorporating proven memory retainment strategies, tajweed accuracy, and character development.",
    ageGroup: "7+ Years",
    classDuration: "45 Minutes / class",
    image: "/courses/quran-hifz.jpg",
    badge: "Comprehensive Hifz Program",
    level: "Advanced",
    topics: [
      "Customized Daily Memorization Targets (Sabaq)",
      "Daily Sabqi & Manzil Revision System",
      "Advanced Tajweed Application & Melodic Tone (Maqamat)",
      "Techniques to Overcome Memory Blocks & Similarity Mistakes (Mutashabihat)",
      "Parental Tracking & Monthly Progress Evaluation",
      "Spiritual & Behavioral Coaching for Huffaz",
    ],
    learningOutcomes: [
      "Memorize chosen Juz or the complete Holy Quran with precision",
      "Retain memorized Surahs securely through disciplined revision",
      "Recite effortlessly from memory in Daily Prayers & Taraweeh",
      "Earn the honor and crown of dignity for parents in the Hereafter",
    ],
    prerequisites: "Fluent Quran reading ability with proper Tajweed.",
  },
  {
    id: "translation-holy-quran",
    slug: "translation-holy-quran",
    title: "Translation of The Holy Quran",
    subtitle: "Uncover the Divine Guidance & Tafseer of Allah's Words",
    shortDescription:
      "The Translation of the Holy Quran course is designed to help students understand the meanings and message of the Quran in a clear and simple way. Explore teachings, guidance, and practical application in daily life.",
    fullDescription:
      "Reciting the Quran brings immense reward, but understanding its message transforms lives. Our Translation & Tafseer course breaks down Arabic root words, sentence structures, historical context (Asbab-al-Nuzul), and practical wisdom for modern challenges. Taught by qualified Islamic scholars, this course enables students to connect deeply with Allah's guidance during prayer and daily decision-making.",
    ageGroup: "10+ Years",
    classDuration: "45 Minutes / class",
    image: "/courses/quran-translation.jpg",
    badge: "Spiritual Enrichment",
    level: "All Levels",
    topics: [
      "Word-for-Word Literal & Meaningful Translation",
      "Grammatical Structure & Key Quranic Arabic Roots",
      "Contextual Tafseer of Selected Surahs & Juz",
      "Lessons on Islamic Faith, Ethics, and Jurisprudence",
      "Historical Background (Asbab al-Nuzul)",
      "Applying Quranic Principles to Family & Professional Life",
    ],
    learningOutcomes: [
      "Understand the direct meaning of Quranic verses while listening or reciting",
      "Grasp key Arabic vocabulary used throughout the Holy Quran",
      "Ponder deeply upon divine wisdom and moral guidance",
      "Enhance focus and Khushoo' in daily Salah",
    ],
    prerequisites: "Interest in learning Quranic Arabic & translation.",
  },
  {
    id: "women-quranic-course",
    slug: "women-quranic-course",
    title: "Women Quranic Course",
    subtitle: "Exclusive Female Tutors for Sisters, Mothers & Girls",
    shortDescription:
      "The Women Quranic Course is specially designed for sisters who want to learn the Holy Quran in a comfortable and supportive environment. Female teachers provide step-by-step guidance in recitation, Tajweed, and Islamic manners.",
    fullDescription:
      "We understand the unique learning preferences and schedules of female students. Our Women Quranic Course pairs sisters with highly qualified, certified female scholars (Qarias & Huffaz). Whether learning basic Tajweed, revising memorization, or studying Islamic jurisprudence related to women's affairs, lessons are conducted with utmost modesty, flexibility, and maternal care.",
    ageGroup: "All Ages (Sisters)",
    classDuration: "30 Minutes / class",
    image: "/courses/women-course.jpg",
    badge: "Dedicated Female Faculty",
    level: "All Levels",
    topics: [
      "Personalized 1-on-1 Female Tutor Sessions",
      "Tajweed Correction & Beautiful Recitation",
      "Fiqh for Women (Purification, Prayer, Family Rights)",
      "Memorization of Essential Surahs & Supplications",
      "Islamic Character Building & Nurturing Muslim Families",
      "Flexible Morning, Afternoon, and Evening Schedules",
    ],
    learningOutcomes: [
      "Recite the Quran with confidence, clarity, and correct Tajweed",
      "Build a comforting spiritual routine at home",
      "Gain authentic Islamic knowledge tailored to women's life stages",
      "Teach and guide children in Quranic studies with authority",
    ],
    prerequisites: "Open to all female students regardless of experience.",
  },
  {
    id: "tajweed-course",
    slug: "tajweed-course",
    title: "Tajweed Masterclass",
    subtitle: "Master the Art of Precise Articulation & Classical Recitation",
    shortDescription:
      "The Tajweed Course is designed to help students master the correct pronunciation and recitation of the Holy Quran. Learn detailed Tajweed rules in a simple and practical way to recite with accuracy and beauty.",
    fullDescription:
      "Tajweed is the science of giving every letter of the Quran its rights and dues according to the rules of Arabic phonology. This course covers both theoretical principles (Ahkam) and rigorous oral practice (Talaqqi). Students learn heavy and light letters, elongation rules (Madd), nasalization (Ghunnah), echoing sounds (Qalqalah), and proper vocal pitch management under expert Qaris.",
    ageGroup: "6+ Years",
    classDuration: "30 Minutes / class",
    image: "/courses/tajweed-course.jpg",
    badge: "Certification Available",
    level: "Intermediate",
    topics: [
      "Comprehensive Study of Makharij (17 Articulation Points)",
      "Sifaat (Characteristics of Arabic Letters)",
      "Detailed Rules of Madd (Madd Asli, Muttasil, Munfasil, Lazim)",
      "Ahkam of Noon Sakinah, Tanween & Meem Sakinah",
      "Rules of Heavy & Light Letters (Tafkheem & Tarqeeq)",
      "Practical Recitation Practice & Correction",
    ],
    learningOutcomes: [
      "Recite the Holy Quran exactly as revealed to Prophet Muhammad ﷺ",
      "Identify and eliminate major and minor errors in recitation",
      "Master pitch control, breath management, and vocal resonance",
      "Receive Tajweed completion certificate upon passing final exam",
    ],
    prerequisites: "Basic Quran reading capability.",
  },
  {
    id: "beautiful-quran-recitation-course",
    slug: "beautiful-quran-recitation-course",
    title: "Beautiful Quran Recitation Course",
    subtitle: "Master Melodious Voice, Rhythmic Fluency & Heart-Touching Qirat",
    shortDescription:
      "The Beautiful Quran Recitation Course is designed for students who want to recite the Holy Quran with a melodious tone, proper rhythm, and touching resonance. Learn voice modulation, breath control, and classic recitation styles under expert Qaris.",
    fullDescription:
      "Reciting the Holy Quran with a beautiful, heartfelt voice brings peace to the soul and fulfills the Sunnah of beautifying the Quran with our voices. In this specialized course, students learn the art of melodious recitation (Husn-e-Sawt), vocal pitch management, smooth rhythm, breath control, and aesthetic application of Tajweed rules. Guided 1-on-1 by certified Qaris, learners develop confidence to recite with deep reverence and touching resonance.",
    ageGroup: "All Ages",
    classDuration: "30 Minutes / class",
    image: "/courses/quran-recitation.jpg",
    badge: "Specialized Qirat & Melody",
    level: "All Levels",
    topics: [
      "Fundamentals of Melodious Recitation (Husn-e-Sawt)",
      "Voice Modulation, Breath Control & Vocal Warm-ups",
      "Rhythmic Flow & Aesthetic Tajweed Application",
      "Mastering Stopping and Pausing with Melodic Flow",
      "Practicing Classical Maqamat & World-Famous Qari Styles",
      "1-on-1 Personalized Recitation Polishing & Correction",
    ],
    learningOutcomes: [
      "Recite the Holy Quran with a soulful, beautiful, and confident voice",
      "Master breath control to recite longer verses with ease",
      "Apply Tajweed with effortless natural melody without straining",
      "Lead prayers and recitation gatherings with spiritual resonance",
    ],
    prerequisites: "Basic Quran reading ability with elementary Tajweed.",
  },
];
