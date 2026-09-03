export interface MemoryGapItem {
  id: string;
  sentenceWithBlanks: string; // e.g. "The Holy Spirit is the [third Person] of the Blessed Trinity: true God, [one in being] with the Father and the Son."
  gaps: {
    index: number;
    word: string;
    options: string[];
    hint?: string;
  }[];
  explanation?: string;
}

export interface EssentialQA {
  id: number;
  question: string;
  answer: string;
  keyTerms?: string[];
  gapVersion?: {
    textWithBlanks: string;
    missingWords: string[];
    options: string[];
  };
}

export interface Lesson {
  id: number;
  number: number;
  title: string;
  purpose: string;
  remember: string;
  rememberGaps?: MemoryGapItem;
  teachingParagraphs: string[];
  talkAboutIt: string;
  talkAboutItGuide: string;
  essentials: EssentialQA[];
  prayer: string;
  thisWeek: string;
  scriptureReferences?: string;
}

export interface CandidateProfile {
  name: string;
  parishName: string;
  confirmationDate: string;
  sponsor: string; // Sponsor / Mentor
  mentorOrPriest: string; // Priest / Deacon / Mentor (module-specific requested field)
  sponsorReason: string;
  patronSaint: string;
  virtueToImitate: string;
  isSet: boolean;
}

export interface LessonProgress {
  isRead: boolean;
  completedAt?: string;
  reflectionNotes: string;
  weeklyTaskDone: boolean;
  weeklyTaskNotes: string;
  prayerDone: boolean;
  memoryGapsMastered: string[]; // ids of mastered memory gaps
  qaMastered: number[]; // ids of mastered QAs
}

export interface MasterCatechismItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  gapPrompt: {
    textWithGaps: string;
    correctWords: string[];
    options: string[];
  };
}

export interface ReadinessCheckItem {
  id: string;
  area: string;
  description: string;
  reviewed: boolean;
  personalNotes?: string;
}

export interface RuleOfLifeHabit {
  id: string;
  rhythm: 'Daily' | 'Weekly' | 'Regularly' | 'In decisions' | 'In the parish';
  practice: string;
  committed: boolean;
  userCommitmentNote?: string;
}

export interface UserProgressState {
  profile: CandidateProfile;
  lessons: Record<number, LessonProgress>;
  summaryCatechismMastery: Record<number, { mastered: boolean; lastTested?: string; attempts: number }>;
  readinessChecks: Record<string, { reviewed: boolean; notes: string }>;
  ruleOfLifeHabits: Record<string, RuleOfLifeHabit>;
  savedBookmarkedQAs: number[];
}
