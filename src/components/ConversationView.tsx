import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Flame,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Heart,
  CalendarCheck,
  BookOpen,
  Eye,
  Maximize2,
  X,
  Send,
  HelpCircle,
} from 'lucide-react';
import { Lesson } from '../types';
import { useProgress } from '../context/ProgressContext';
import { MemoryGapExercise } from './MemoryGapExercise';
import { EssentialsQAMode } from './EssentialsQAMode';

interface ConversationViewProps {
  lesson: Lesson;
  onNavigateLesson: (lessonId: number) => void;
  totalLessons: number;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  lesson,
  onNavigateLesson,
  totalLessons,
}) => {
  const {
    state,
    markLessonRead,
    saveReflectionNotes,
    toggleWeeklyTask,
    saveWeeklyTaskNotes,
    togglePrayerDone,
    markMemoryGapMastered,
  } = useProgress();

  const [showGuide, setShowGuide] = useState(false);
  const [activeRememberMode, setActiveRememberMode] = useState<'text' | 'drill'>('drill');
  const [prayerFocusOpen, setPrayerFocusOpen] = useState(false);

  const progress = state.lessons[lesson.id] || {
    isRead: false,
    reflectionNotes: '',
    weeklyTaskDone: false,
    weeklyTaskNotes: '',
    prayerDone: false,
    memoryGapsMastered: [],
    qaMastered: [],
  };

  const isMasteredRemember =
    lesson.rememberGaps && progress.memoryGapsMastered.includes(lesson.rememberGaps.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* 1. LESSON HEADER */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-10 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[#E8873B] uppercase tracking-[0.3em] text-xs font-serif small-caps">
              Lesson {String(lesson.number).padStart(2, '0')} of {String(totalLessons).padStart(2, '0')}
            </span>
            {lesson.scriptureReferences && (
              <span className="text-xs text-slate-500 font-mono hidden sm:inline border-l border-[#2A2A2A] pl-3">
                {lesson.scriptureReferences}
              </span>
            )}
          </div>

          <button
            id={`btn-complete-lesson-${lesson.id}`}
            onClick={() => markLessonRead(lesson.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs uppercase tracking-[0.15em] font-medium transition-all border ${
              progress.isRead
                ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B]'
                : 'bg-[#161616] hover:bg-[#1F1F1F] text-slate-400 hover:text-white border-[#2A2A2A]'
            }`}
          >
            {progress.isRead ? (
              <>
                <CheckCircle2 size={14} className="text-[#E8873B]" />
                <span>Lesson Completed</span>
              </>
            ) : (
              <>
                <Circle size={14} className="text-slate-500" />
                <span>Mark Completed</span>
              </>
            )}
          </button>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif italic font-light leading-tight">
            {lesson.title}
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
            {lesson.purpose}
          </p>
        </div>
      </div>

      {/* 2. REMEMBER: ONE CENTRAL TRUTH */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
              <Sparkles size={15} />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
              Remember: One Central Truth
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-[#161616] p-1 rounded border border-[#2A2A2A]">
            <button
              onClick={() => setActiveRememberMode('text')}
              className={`px-3 py-1 rounded text-xs uppercase tracking-wider transition-colors ${
                activeRememberMode === 'text'
                  ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Text
            </button>
            <button
              onClick={() => setActiveRememberMode('drill')}
              className={`px-3 py-1 rounded text-xs uppercase tracking-wider transition-colors ${
                activeRememberMode === 'drill'
                  ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Recall Drill
            </button>
          </div>
        </div>

        {activeRememberMode === 'text' ? (
          <div className="pl-6 border-l-2 border-[#E8873B] bg-[#161616] p-6 rounded-r-lg space-y-2">
            <p className="italic text-[#E8873B] text-xs uppercase tracking-widest font-serif">The Central Truth</p>
            <p className="text-white text-xl sm:text-2xl font-serif italic font-light leading-snug">
              “{lesson.remember}”
            </p>
          </div>
        ) : lesson.rememberGaps ? (
          <MemoryGapExercise
            item={lesson.rememberGaps}
            isAlreadyMastered={isMasteredRemember}
            onMastered={() => {
              if (lesson.rememberGaps) {
                markMemoryGapMastered(lesson.id, lesson.rememberGaps.id);
              }
            }}
          />
        ) : (
          <div className="pl-6 border-l-2 border-[#E8873B] bg-[#161616] p-6 rounded-r-lg space-y-2">
            <p className="italic text-[#E8873B] text-xs uppercase tracking-widest font-serif">The Central Truth</p>
            <p className="text-white text-xl sm:text-2xl font-serif italic font-light leading-snug">
              “{lesson.remember}”
            </p>
          </div>
        )}
      </section>

      {/* 3. CONCISE CATHOLIC TEACHING */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#222222] pb-3">
          <div className="w-7 h-7 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
            <BookOpen size={15} />
          </div>
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
            Concise Catholic Teaching
          </h2>
        </div>

        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base font-sans">
          {lesson.teachingParagraphs.map((para, idx) => (
            <p key={idx} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* 4. TALK ABOUT IT */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
              <MessageCircle size={15} />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
              Talk About It
            </h2>
          </div>

          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-[#161616] border border-[#2A2A2A] px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
          >
            <HelpCircle size={13} />
            <span>{showGuide ? 'Hide Guidance' : 'Discussion Guidance'}</span>
          </button>
        </div>

        <div className="p-5 bg-[#161616] rounded-xl border border-[#2A2A2A]">
          <span className="text-xs uppercase tracking-widest text-[#E8873B] font-serif block mb-1">
            Question for candidate, mentor & family:
          </span>
          <p className="text-base md:text-lg text-white font-serif italic">
            “{lesson.talkAboutIt}”
          </p>
        </div>

        {showGuide && (
          <div className="p-4 bg-[#1A1813] border border-[#E8873B]/30 rounded-xl text-xs md:text-sm text-amber-200/90 space-y-1">
            <span className="font-semibold block uppercase tracking-wider text-[#E8873B] text-[11px] font-serif">
              Discussion Focus:
            </span>
            <p className="leading-relaxed">{lesson.talkAboutItGuide}</p>
          </div>
        )}

        {/* Reflection Notes Textarea */}
        <div className="space-y-2 pt-2">
          <label
            htmlFor={`reflection-${lesson.id}`}
            className="block text-xs uppercase tracking-wider text-slate-400 font-serif"
          >
            My Thoughts & Discussion Notes (Saved locally)
          </label>
          <textarea
            id={`reflection-${lesson.id}`}
            rows={3}
            value={progress.reflectionNotes}
            onChange={(e) => saveReflectionNotes(lesson.id, e.target.value)}
            placeholder="Write down what you and your sponsor, mentor or parents discussed..."
            className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 transition-all resize-y outline-none"
          />
        </div>
      </section>

      {/* 5. LEARN THESE ANSWERS */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
              <BookOpen size={15} />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
              Learn These Answers
            </h2>
          </div>
          <span className="text-xs text-[#E8873B] font-mono">5 Core Questions</span>
        </div>

        <p className="text-xs text-slate-400">
          These five concise answers express the Catholic faith. Study them carefully, test yourself with flashcards, and master them before Confirmation.
        </p>

        <EssentialsQAMode lessonId={lesson.id} essentials={lesson.essentials} />
      </section>

      {/* 6. PRAYER */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
              <Heart size={15} />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
              Prayer
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPrayerFocusOpen(true)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-[#161616] px-3 py-1.5 rounded border border-[#2A2A2A] uppercase tracking-wider"
              title="Focus Mode"
            >
              <Maximize2 size={13} />
              <span className="hidden sm:inline">Focus</span>
            </button>

            <button
              onClick={() => togglePrayerDone(lesson.id)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all uppercase tracking-wider ${
                progress.prayerDone
                  ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B] font-semibold'
                  : 'bg-[#161616] border-[#2A2A2A] text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 size={13} />
              <span>{progress.prayerDone ? 'Prayed' : 'Mark as Prayed'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 bg-[#161616] border border-[#2A2A2A] rounded-xl">
          <p className="text-base md:text-xl text-amber-100 font-scripture leading-relaxed text-center italic">
            “{lesson.prayer}”
          </p>
        </div>
      </section>

      {/* 7. THIS WEEK: PRACTICAL ACTION */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
              <CalendarCheck size={15} />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
              This Week: Practical Action
            </h2>
          </div>

          <button
            onClick={() => toggleWeeklyTask(lesson.id)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all uppercase tracking-wider ${
              progress.weeklyTaskDone
                ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B] font-semibold'
                : 'bg-[#161616] border-[#2A2A2A] text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 size={13} />
            <span>{progress.weeklyTaskDone ? 'Completed' : 'Mark Completed'}</span>
          </button>
        </div>

        <div className="p-4 bg-[#161616] rounded-xl border border-[#2A2A2A] flex items-start gap-3">
          <div className="mt-0.5">
            <Flame size={16} className="text-[#E8873B]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm md:text-base font-medium text-white leading-relaxed">
              {lesson.thisWeek}
            </p>
          </div>
        </div>

        {/* Task Notes Input */}
        <div className="space-y-1 pt-1">
          <label
            htmlFor={`task-notes-${lesson.id}`}
            className="block text-xs uppercase tracking-wider text-slate-400 font-serif"
          >
            Notes on how you put this into practice:
          </label>
          <input
            id={`task-notes-${lesson.id}`}
            type="text"
            value={progress.weeklyTaskNotes}
            onChange={(e) => saveWeeklyTaskNotes(lesson.id, e.target.value)}
            placeholder="e.g. Completed on Tuesday evening with my family..."
            className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 transition-all outline-none"
          />
        </div>
      </section>

      {/* 8. NAVIGATION FOOTER */}
      <div className="flex items-center justify-between pt-6 border-t border-[#2A2A2A]">
        <button
          disabled={lesson.id <= 1}
          onClick={() => onNavigateLesson(lesson.id - 1)}
          className={`flex items-center gap-2 px-6 py-3 rounded text-xs uppercase tracking-[0.2em] font-medium transition-all ${
            lesson.id <= 1
              ? 'opacity-30 cursor-not-allowed text-slate-600 border border-transparent'
              : 'bg-transparent text-slate-300 hover:text-white border border-[#2A2A2A] hover:border-slate-500'
          }`}
        >
          <ChevronLeft size={15} />
          <span>Previous Lesson</span>
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Lesson {lesson.number} / {totalLessons}
        </span>

        <button
          disabled={lesson.id >= totalLessons}
          onClick={() => onNavigateLesson(lesson.id + 1)}
          className={`flex items-center gap-2 px-8 py-3 rounded text-xs uppercase tracking-[0.2em] font-bold transition-all ${
            lesson.id >= totalLessons
              ? 'opacity-30 cursor-not-allowed text-slate-600 border border-transparent'
              : 'bg-[#E8873B] text-[#0F0F0F] hover:bg-white hover:text-black shadow-[0_0_20px_rgba(232,135,59,0.3)]'
          }`}
        >
          <span>Next Lesson</span>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Prayer Focus Modal Overlay */}
      {prayerFocusOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#E8873B]/40 rounded-3xl max-w-2xl w-full p-8 md:p-12 text-center space-y-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPrayerFocusOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-[#1F1F1F]"
              aria-label="Close prayer focus"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#E8873B]/20 text-[#E8873B] flex items-center justify-center mx-auto">
              <Flame size={24} />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#E8873B] font-display">
                Lesson {lesson.number} Prayer
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                Quiet Your Heart
              </h3>
            </div>

            <p className="text-xl md:text-3xl text-amber-100 font-scripture leading-relaxed italic max-w-xl mx-auto">
              “{lesson.prayer}”
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  togglePrayerDone(lesson.id);
                  setPrayerFocusOpen(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#E8873B] text-black font-semibold text-sm hover:bg-[#F29D56] transition-colors"
              >
                Amen (Mark as Prayed)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
