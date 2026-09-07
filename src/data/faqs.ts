export interface FAQItem {
  id: string;
  category: "General" | "Classes" | "Tutors" | "Technical" | "Payments";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "How do online Quran classes work at Al Tanzeel Quran Academy?",
    answer:
      "Our online Quran classes are conducted 1-on-1 via interactive video communication tools such as Zoom, Teams, or Skype. After booking a Free Trial Class, we match you or your child with a certified male or female tutor based on your preferred time slot, language, and goals. Lessons include live digital Quran screen-sharing and interactive audio-visual feedback.",
  },
  {
    id: "faq-2",
    category: "Tutors",
    question: "Are female Quran teachers available for sisters and young girls?",
    answer:
      "Yes! We have a dedicated team of highly qualified, certified female Quran teachers (Huffaz & Qarias) who are fluent in English. Sisters and female children can take 1-on-1 private lessons in a modest, supportive, and comfortable learning environment.",
  },
  {
    id: "faq-3",
    category: "Classes",
    question: "Do you offer online Tajweed classes and recitation correction?",
    answer:
      "Yes. Our Tajweed Masterclass covers all theoretical and practical rules of Tajweed, including the 17 Makharij articulation points, Noon and Meem Sakinah rules, Madd elongation, and Waqf pausing rules, taught by certified Qaris with Ijazah.",
  },
  {
    id: "faq-4",
    category: "Classes",
    question: "Do you offer online Quran memorization (Hifz) classes?",
    answer:
      "Yes, we provide structured 1-on-1 Quran memorization (Hifz-ul-Quran) programs for kids and adults. Students follow a proven daily revision system consisting of Sabaq (new lesson), Sabqi (recent revision), and Manzil (old revision) under certified Huffaz.",
  },
  {
    id: "faq-5",
    category: "Classes",
    question: "How do online Quran classes for kids work?",
    answer:
      "For children (ages 4–15), lessons are designed to be fun, engaging, and interactive. Certified teachers use digital screen pointers, gamified letter challenges, and positive encouragement to teach Noorani Qaida, basic Tajweed, short Surahs, and daily Duas.",
  },
  {
    id: "faq-6",
    category: "Classes",
    question: "How can I schedule a Free Trial Class?",
    answer:
      "You can schedule a Free Trial Class easily by clicking the 'Free Trial Class' or 'Book a Demo' buttons anywhere on our website, or by contacting us via WhatsApp. Our academic coordinator will arrange your trial session within a few hours.",
  },
  {
    id: "faq-7",
    category: "Classes",
    question: "What age groups do you teach?",
    answer:
      "We teach students of all age groups starting from young children aged 4+ up to senior adults. Our curriculum is custom-tailored: children start with engaging Qaida exercises, while adults and revert Muslims receive patient, structured instruction suited to their goals.",
  },
  {
    id: "faq-8",
    category: "Technical",
    question: "What software or devices do I need for online classes?",
    answer:
      "You only need a laptop, tablet, desktop computer, or smartphone with a reliable internet connection and a microphone/headset. We utilize user-friendly platforms like Zoom, Skype, or Microsoft Teams, and our technical support team assists you with setup if needed.",
  },
  {
    id: "faq-9",
    category: "Classes",
    question: "Can I choose class timings according to my Western timezone (USA, UK, Canada, Australia)?",
    answer:
      "Absolutely. Our academy operates 24/7 across all global timezones including EST, CST, PST, GMT, and AEST. You can choose flexible morning, afternoon, or weekend slots that seamlessly integrate into your school or work schedule.",
  },
  {
    id: "faq-10",
    category: "General",
    question: "Can adults with no prior Arabic background start learning Quran online?",
    answer:
      "Yes, many of our adult learners start with zero knowledge of the Arabic language. Our step-by-step Noorani Qaida course teaches letter sounds and shapes from the absolute beginning, allowing adult students to read full Quranic verses with Tajweed within a few months.",
  },
  {
    id: "faq-11",
    category: "Payments",
    question: "What are the fee structures and payment methods?",
    answer:
      "We offer affordable monthly plans based on how many classes per week you choose (e.g., 2, 3, or 5 days a week). Payments are securely processed via PayPal, credit/debit card, or bank transfer. We also provide family discounts for multiple students.",
  },
];
