import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CandidateProfile,
  LessonProgress,
  RuleOfLifeHabit,
  UserProgressState,
} from '../types';
import { LESSONS_DATA } from '../data/lessons';
import { APPENDIX_D_RULE_ITEMS, APPENDIX_F_AREAS } from '../data/appendices';

const STORAGE_KEY = 'confirmation_young_people_progress_v1';

const initialProfile: CandidateProfile = {
  name: '',
  parishName: '',
  confirmationDate: '',
  sponsor: '',
  mentorOrPriest: '',
  sponsorReason: '',
  patronSaint: '',
  virtueToImitate: '',
  isSet: false,
};

function getInitialState(): UserProgressState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        profile: { ...initialProfile, ...parsed.profile },
        lessons: parsed.lessons || {},
        summaryCatechismMastery: parsed.summaryCatechismMastery || {},
        readinessChecks: parsed.readinessChecks || {},
        ruleOfLifeHabits: parsed.ruleOfLifeHabits || {},
        savedBookmarkedQAs: parsed.savedBookmarkedQAs || [],
      };
    }
  } catch (e) {
    console.error('Error loading saved progress:', e);
  }

  // Default empty state
  const initialLessons: Record<number, LessonProgress> = {};
  LESSONS_DATA.forEach((lesson) => {
    initialLessons[lesson.id] = {
      isRead: false,
      reflectionNotes: '',
      weeklyTaskDone: false,
      weeklyTaskNotes: '',
      prayerDone: false,
      memoryGapsMastered: [],
      qaMastered: [],
    };
  });

  const initialReadiness: Record<string, { reviewed: boolean; notes: string }> = {};
  APPENDIX_F_AREAS.forEach((area) => {
    initialReadiness[area.id] = { reviewed: false, notes: '' };
  });

  const initialRuleHabits: Record<string, RuleOfLifeHabit> = {};
  APPENDIX_D_RULE_ITEMS.forEach((item) => {
    initialRuleHabits[item.id] = {
      id: item.id,
      rhythm: item.rhythm,
      practice: item.practice,
      committed: false,
      userCommitmentNote: '',
    };
  });

  return {
    profile: initialProfile,
    lessons: initialLessons,
    summaryCatechismMastery: {},
    readinessChecks: initialReadiness,
    ruleOfLifeHabits: initialRuleHabits,
    savedBookmarkedQAs: [],
  };
}

interface ProgressContextValue {
  state: UserProgressState;
  updateProfile: (updates: Partial<CandidateProfile>) => void;
  markLessonRead: (lessonId: number, isRead?: boolean) => void;
  saveReflectionNotes: (lessonId: number, notes: string) => void;
  toggleWeeklyTask: (lessonId: number) => void;
  saveWeeklyTaskNotes: (lessonId: number, notes: string) => void;
  togglePrayerDone: (lessonId: number) => void;
  markMemoryGapMastered: (lessonId: number, gapId: string) => void;
  toggleQAMastered: (lessonId: number, qaId: number) => void;
  recordSummaryCatechismResult: (questionId: number, mastered: boolean) => void;
  toggleReadinessCheck: (areaId: string, reviewed?: boolean) => void;
  saveReadinessNotes: (areaId: string, notes: string) => void;
  toggleRuleHabit: (habitId: string, committed?: boolean) => void;
  saveRuleHabitNote: (habitId: string, note: string) => void;
  toggleBookmarkQA: (qaId: number) => void;
  getOverallStats: () => {
    completedLessonsCount: number;
    totalLessons: number;
    masteredQAsCount: number;
    totalQAs: number;
    summaryCatechismMasteredCount: number;
    totalSummaryCatechism: number;
    weeklyTasksDoneCount: number;
    readinessReviewedCount: number;
    percentage: number;
  };
  resetAllProgress: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserProgressState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [state]);

  const updateProfile = (updates: Partial<CandidateProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates,
        isSet: true,
      },
    }));
  };

  const markLessonRead = (lessonId: number, isRead?: boolean) => {
    setState((prev) => {
      const current = prev.lessons[lessonId] || {
        isRead: false,
        reflectionNotes: '',
        weeklyTaskDone: false,
        weeklyTaskNotes: '',
        prayerDone: false,
        memoryGapsMastered: [],
        qaMastered: [],
      };
      const nextRead = isRead !== undefined ? isRead : !current.isRead;
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...current,
            isRead: nextRead,
            completedAt: nextRead ? new Date().toISOString() : undefined,
          },
        },
      };
    });
  };

  const saveReflectionNotes = (lessonId: number, notes: string) => {
    setState((prev) => {
      const current = prev.lessons[lessonId] || {
        isRead: false,
        reflectionNotes: '',
        weeklyTaskDone: false,
        weeklyTaskNotes: '',
        prayerDone: false,
        memoryGapsMastered: [],
        qaMastered: [],
      };
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...current,
            reflectionNotes: notes,
          },
        },
      };
    });
  };

  const toggleWeeklyTask = (lessonId: number) => {
    setState((prev) => {
      const current = prev.lessons[lessonId] || {
        isRead: false,
        reflectionNotes: '',
        weeklyTaskDone: false,
        weeklyTaskNotes: '',
        prayerDone: false,
        memoryGapsMastered: [],
        qaMastered: [],
      };
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...current,
            weeklyTaskDone: !current.weeklyTaskDone,
          },
        },
      };
    });
  };

  const saveWeeklyTaskNotes = (lessonId: number, notes: string) => {
    setState((prev) => {
      const current = prev.lessons[lessonId] || {
        isRead: false,
        reflectionNotes: '',
        weeklyTaskDone: false,
        weeklyTaskNotes: '',
        prayerDone: false,
        memoryGapsMastered: [],
        qaMastered: [],
      };
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...current,
            weeklyTaskNotes: notes,
          },
        },
      };
    });
  };

  const togglePrayerDone = (lessonId: number) => {
    setState((prev) => {
      const current = prev.lessons[lessonId] || {
        isRead: false,
        reflectionNotes: '',
        weeklyTaskDone: false,
        weeklyTaskNotes: '',
        prayerDone: false,
        memoryGapsMastered: [],
        qaMastered: [],
      };
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...current,
            prayerDone: !current.prayerDone,
          },
        },
      };
    });
  };

  const markMemoryGapMastered = (lessonId: number, gapId: string) => {
    setState((prev) => {
      const current = prev.lessons[lessonId] || {
        isRead: false,
        reflectionNotes: '',
        weeklyTaskDone: false,
        weeklyTaskNotes: '',
        prayerDone: false,
        memoryGapsMastered: [],
        qaMastered: [],
      };
      if (current.memoryGapsMastered.includes(gapId)) return prev;
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...current,
            memoryGapsMastered: [...current.memoryGapsMastered, gapId],
          },
        },
      };
    });
  };

  const toggleQAMastered = (lessonId: number, qaId: number) => {
    setState((prev) => {
      const current = prev.lessons[lessonId] || {
        isRead: false,
        reflectionNotes: '',
        weeklyTaskDone: false,
        weeklyTaskNotes: '',
        prayerDone: false,
        memoryGapsMastered: [],
        qaMastered: [],
      };
      const exists = current.qaMastered.includes(qaId);
      const updated = exists
        ? current.qaMastered.filter((id) => id !== qaId)
        : [...current.qaMastered, qaId];

      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...current,
            qaMastered: updated,
          },
        },
      };
    });
  };

  const recordSummaryCatechismResult = (questionId: number, mastered: boolean) => {
    setState((prev) => {
      const current = prev.summaryCatechismMastery[questionId] || {
        mastered: false,
        attempts: 0,
      };
      return {
        ...prev,
        summaryCatechismMastery: {
          ...prev.summaryCatechismMastery,
          [questionId]: {
            mastered,
            attempts: current.attempts + 1,
            lastTested: new Date().toISOString(),
          },
        },
      };
    });
  };

  const toggleReadinessCheck = (areaId: string, reviewed?: boolean) => {
    setState((prev) => {
      const current = prev.readinessChecks[areaId] || { reviewed: false, notes: '' };
      return {
        ...prev,
        readinessChecks: {
          ...prev.readinessChecks,
          [areaId]: {
            ...current,
            reviewed: reviewed !== undefined ? reviewed : !current.reviewed,
          },
        },
      };
    });
  };

  const saveReadinessNotes = (areaId: string, notes: string) => {
    setState((prev) => {
      const current = prev.readinessChecks[areaId] || { reviewed: false, notes: '' };
      return {
        ...prev,
        readinessChecks: {
          ...prev.readinessChecks,
          [areaId]: {
            ...current,
            notes,
          },
        },
      };
    });
  };

  const toggleRuleHabit = (habitId: string, committed?: boolean) => {
    setState((prev) => {
      const current = prev.ruleOfLifeHabits[habitId] || {
        id: habitId,
        rhythm: 'Daily',
        practice: '',
        committed: false,
        userCommitmentNote: '',
      };
      return {
        ...prev,
        ruleOfLifeHabits: {
          ...prev.ruleOfLifeHabits,
          [habitId]: {
            ...current,
            committed: committed !== undefined ? committed : !current.committed,
          },
        },
      };
    });
  };

  const saveRuleHabitNote = (habitId: string, note: string) => {
    setState((prev) => {
      const current = prev.ruleOfLifeHabits[habitId] || {
        id: habitId,
        rhythm: 'Daily',
        practice: '',
        committed: false,
        userCommitmentNote: '',
      };
      return {
        ...prev,
        ruleOfLifeHabits: {
          ...prev.ruleOfLifeHabits,
          [habitId]: {
            ...current,
            userCommitmentNote: note,
          },
        },
      };
    });
  };

  const toggleBookmarkQA = (qaId: number) => {
    setState((prev) => {
      const exists = prev.savedBookmarkedQAs.includes(qaId);
      return {
        ...prev,
        savedBookmarkedQAs: exists
          ? prev.savedBookmarkedQAs.filter((id) => id !== qaId)
          : [...prev.savedBookmarkedQAs, qaId],
      };
    });
  };

  const getOverallStats = () => {
    const totalLessons = LESSONS_DATA.length;
    let completedLessonsCount = 0;
    let masteredQAsCount = 0;
    let weeklyTasksDoneCount = 0;

    (Object.values(state.lessons) as LessonProgress[]).forEach((l) => {
      if (l.isRead) completedLessonsCount++;
      if (l.weeklyTaskDone) weeklyTasksDoneCount++;
      masteredQAsCount += l.qaMastered.length;
    });

    const totalQAs = totalLessons * 5; // 60 essential QAs
    const totalSummaryCatechism = 38;
    let summaryCatechismMasteredCount = 0;
    (Object.values(state.summaryCatechismMastery) as { mastered: boolean }[]).forEach((m) => {
      if (m.mastered) summaryCatechismMasteredCount++;
    });

    let readinessReviewedCount = 0;
    (Object.values(state.readinessChecks) as { reviewed: boolean }[]).forEach((r) => {
      if (r.reviewed) readinessReviewedCount++;
    });

    // Weighted percentage
    // Lessons read: 35%, QAs mastered: 35%, Summary catechism: 15%, Tasks & Readiness: 15%
    const lessonScore = completedLessonsCount / totalLessons;
    const qaScore = masteredQAsCount / totalQAs;
    const summaryScore = summaryCatechismMasteredCount / totalSummaryCatechism;
    const taskScore = (weeklyTasksDoneCount / totalLessons + readinessReviewedCount / 9) / 2;

    const percentage = Math.round(
      (lessonScore * 0.35 + qaScore * 0.35 + summaryScore * 0.15 + taskScore * 0.15) * 100
    );

    return {
      completedLessonsCount,
      totalLessons,
      masteredQAsCount,
      totalQAs,
      summaryCatechismMasteredCount,
      totalSummaryCatechism,
      weeklyTasksDoneCount,
      readinessReviewedCount,
      percentage: Math.min(100, Math.max(0, percentage)),
    };
  };

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(getInitialState());
  };

  const exportDataJSON = () => {
    return JSON.stringify(state, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        setState({
          profile: { ...initialProfile, ...(parsed.profile || {}) },
          lessons: parsed.lessons || {},
          summaryCatechismMastery: parsed.summaryCatechismMastery || {},
          readinessChecks: parsed.readinessChecks || {},
          ruleOfLifeHabits: parsed.ruleOfLifeHabits || {},
          savedBookmarkedQAs: parsed.savedBookmarkedQAs || [],
        });
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON data:', e);
    }
    return false;
  };

  return (
    <ProgressContext.Provider
      value={{
        state,
        updateProfile,
        markLessonRead,
        saveReflectionNotes,
        toggleWeeklyTask,
        saveWeeklyTaskNotes,
        togglePrayerDone,
        markMemoryGapMastered,
        toggleQAMastered,
        recordSummaryCatechismResult,
        toggleReadinessCheck,
        saveReadinessNotes,
        toggleRuleHabit,
        saveRuleHabitNote,
        toggleBookmarkQA,
        getOverallStats,
        resetAllProgress,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
};
