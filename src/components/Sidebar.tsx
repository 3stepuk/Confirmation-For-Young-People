import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Award,
  Sparkles,
  Scroll,
  HeartHandshake,
  ShieldCheck,
  Flame,
  Info,
  ChevronRight,
  BookMarked,
  UserCheck,
} from 'lucide-react';
import { LESSONS_DATA } from '../data/lessons';
import { useProgress } from '../context/ProgressContext';

interface SidebarProps {
  currentView: string;
  selectedLessonId: number;
  selectedAppendixTab?: string;
  onNavigate: (view: string, lessonId?: number, appendixTab?: string) => void;
  onCloseMobileSidebar?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  selectedLessonId,
  selectedAppendixTab = 'rite',
  onNavigate,
  onCloseMobileSidebar,
}) => {
  const { state } = useProgress();

  const handleSelect = (view: string, lessonId?: number, appendixTab?: string) => {
    onNavigate(view, lessonId, appendixTab);
    if (onCloseMobileSidebar) {
      onCloseMobileSidebar();
    }
  };

  const completedCount = (Object.values(state.lessons) as { isRead: boolean }[]).filter(
    (l) => l.isRead
  ).length;
  const progressPercent = Math.round((completedCount / LESSONS_DATA.length) * 100);

  return (
    <aside className="w-80 h-full bg-[#121212] border-r border-[#2A2A2A] flex flex-col justify-between overflow-y-auto select-none">
      {/* Top Section */}
      <div className="p-5 space-y-6">
        {/* Navigation Core */}
        <div className="space-y-1">
          <button
            id="sidebar-btn-intro"
            onClick={() => handleSelect('intro')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-sm transition-all ${
              currentView === 'intro'
                ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#161616]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles size={15} className={currentView === 'intro' ? 'text-[#E8873B]' : 'text-slate-500'} />
              <span className="font-medium">Overview & Guide</span>
            </div>
            <ChevronRight size={13} className="text-slate-600" />
          </button>

          <button
            id="sidebar-btn-drill"
            onClick={() => handleSelect('drill')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-sm transition-all ${
              currentView === 'drill'
                ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#161616]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award size={15} className={currentView === 'drill' ? 'text-[#E8873B]' : 'text-slate-500'} />
              <div className="text-left leading-tight">
                <span>Master Recall Drill</span>
                <span className="block text-[10px] text-slate-500 font-mono">38 Summary Truths</span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[#E8873B] font-mono">
              Drill
            </span>
          </button>
        </div>

        {/* 12 Lessons */}
        <div className="pt-1">
          <div className="flex items-center justify-between px-1 mb-3">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-serif">
              The Twelve Lessons
            </h2>
            <span className="text-[11px] text-[#E8873B] font-mono font-medium">
              {completedCount}/12
            </span>
          </div>

          <div className="space-y-1">
            {LESSONS_DATA.map((lesson) => {
              const progress = state.lessons[lesson.id];
              const isRead = progress?.isRead;
              const isSelected = currentView === 'lesson' && selectedLessonId === lesson.id;
              const qaMasteredCount = progress?.qaMastered?.length || 0;
              const paddedNum = String(lesson.number).padStart(2, '0');

              return (
                <button
                  key={lesson.id}
                  id={`sidebar-lesson-${lesson.id}`}
                  onClick={() => handleSelect('lesson', lesson.id)}
                  className={`w-full text-left px-3 py-2.5 rounded transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white shadow-sm'
                      : 'hover:bg-[#161616] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs text-[#E8873B] flex-shrink-0 w-5">
                    {paddedNum}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate leading-snug ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                      {lesson.title}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {isRead ? (
                      <CheckCircle2 size={14} className="text-[#E8873B]" />
                    ) : qaMasteredCount > 0 ? (
                      <span className="text-[10px] font-mono text-slate-500">
                        {qaMasteredCount}/5
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Appendices & Reference */}
        <div className="pt-1">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-serif px-1 mb-3">
            Appendices & Resources
          </h2>

          <div className="space-y-1">
            <button
              id="sidebar-app-rite"
              onClick={() => handleSelect('appendix', undefined, 'rite')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                currentView === 'appendix' && selectedAppendixTab === 'rite'
                  ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white'
                  : 'text-slate-400 hover:bg-[#161616] hover:text-slate-200'
              }`}
            >
              <Scroll size={13} className="text-[#E8873B] flex-shrink-0" />
              <span className="truncate">App. A: Rite Step by Step</span>
            </button>

            <button
              id="sidebar-app-gifts"
              onClick={() => handleSelect('appendix', undefined, 'gifts')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                currentView === 'appendix' && selectedAppendixTab === 'gifts'
                  ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white'
                  : 'text-slate-400 hover:bg-[#161616] hover:text-slate-200'
              }`}
            >
              <Flame size={13} className="text-[#E8873B] flex-shrink-0" />
              <span className="truncate">App. B: Gifts & Fruits</span>
            </button>

            <button
              id="sidebar-app-sponsor"
              onClick={() => handleSelect('appendix', undefined, 'sponsor')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                currentView === 'appendix' && selectedAppendixTab === 'sponsor'
                  ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white'
                  : 'text-slate-400 hover:bg-[#161616] hover:text-slate-200'
              }`}
            >
              <HeartHandshake size={13} className="text-[#E8873B] flex-shrink-0" />
              <span className="truncate">App. C: Sponsor & Saint</span>
            </button>

            <button
              id="sidebar-app-prayers"
              onClick={() => handleSelect('appendix', undefined, 'prayers')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                currentView === 'appendix' && selectedAppendixTab === 'prayers'
                  ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white'
                  : 'text-slate-400 hover:bg-[#161616] hover:text-slate-200'
              }`}
            >
              <BookMarked size={13} className="text-[#E8873B] flex-shrink-0" />
              <span className="truncate">App. D: Prayers & Rule of Life</span>
            </button>

            <button
              id="sidebar-app-catechism"
              onClick={() => handleSelect('appendix', undefined, 'catechism')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                currentView === 'appendix' && selectedAppendixTab === 'catechism'
                  ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white'
                  : 'text-slate-400 hover:bg-[#161616] hover:text-slate-200'
              }`}
            >
              <BookOpen size={13} className="text-[#E8873B] flex-shrink-0" />
              <span className="truncate">App. E: Summary Catechism (38)</span>
            </button>

            <button
              id="sidebar-app-readiness"
              onClick={() => handleSelect('appendix', undefined, 'readiness')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                currentView === 'appendix' && selectedAppendixTab === 'readiness'
                  ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white'
                  : 'text-slate-400 hover:bg-[#161616] hover:text-slate-200'
              }`}
            >
              <ShieldCheck size={13} className="text-[#E8873B] flex-shrink-0" />
              <span className="truncate">App. F: Readiness & Review</span>
            </button>

            <button
              id="sidebar-app-sources"
              onClick={() => handleSelect('appendix', undefined, 'sources')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all ${
                currentView === 'appendix' && selectedAppendixTab === 'sources'
                  ? 'bg-[#1A1A1A] border-l-2 border-[#E8873B] text-white'
                  : 'text-slate-400 hover:bg-[#161616] hover:text-slate-200'
              }`}
            >
              <Info size={13} className="text-[#E8873B] flex-shrink-0" />
              <span className="truncate">Sources & References</span>
            </button>
          </div>
        </div>
      </div>

      {/* Artistic Flair Footer Section */}
      <div className="mt-auto p-5 bg-[#161616] border-t border-[#2A2A2A] space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-serif">
              Overall Progress
            </p>
            <p className="text-xl text-white font-light font-mono">
              {completedCount}
              <span className="text-slate-600 mx-1">/</span>12
            </p>
          </div>
          <div className="w-24 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E8873B] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Candidate Profile summary */}
        <div className="pt-2 border-t border-[#242424]">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-5 h-5 rounded-full bg-[#E8873B]/15 border border-[#E8873B]/30 flex items-center justify-center text-[#E8873B]">
              <UserCheck size={11} />
            </div>
            <span className="truncate font-medium text-slate-200">
              {state.profile.name.trim() || 'Candidate Profile'}
            </span>
          </div>
          {state.profile.mentorOrPriest && (
            <p className="text-[10px] text-slate-400 italic pl-7 truncate mt-0.5">
              Mentor: {state.profile.mentorOrPriest}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};
