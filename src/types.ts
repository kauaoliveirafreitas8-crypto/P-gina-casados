export interface RoteiroStep {
  title: string;
  category: string;
  verseBook: string;
  verseText: string;
  contextText: string;
  targetObjective: string;
  questions: string[];
  exerciseTitle: string;
  exerciseDuration: number;
  exerciseInstructions: string[];
  prayerText: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    explanation: string;
  }[];
}

export interface BonusMaterial {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  iconName: string;
  originalPrice: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatarSeed: string;
  content: string;
  stars: number;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ComparisonItem {
  feature: string;
  premiumValue: string;
  premiumStatus: boolean;
  commonValue: string;
  commonStatus: boolean;
}
