import React from 'react';
import { Flame, BookOpen, Award, User, Menu, X, Printer, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, lessonId?: number) => void;
  onOpenProfile: () => void;
  onOpenPrintSummary: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenProfile,
  onOpenPrintSummary,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const { state, getOverallStats } = useProgress();
  const stats = getOverallStats();

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#0F0F0F] border-b border-[#2A2A2A] flex items-center justify-between px-4 md:px-8 select-none">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          id="btn-sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
          className="p-2 text-slate-400 hover:text-white hover:bg-[#161616] rounded border border-[#2A2A2A] transition-colors lg:hidden"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <button
          id="btn-nav-home"
          onClick={() => onNavigate('intro')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-8 h-8 rounded bg-[#E8873B] flex items-center justify-center text-[#0F0F0F] font-bold font-serif shadow-sm">
            C
          </div>
          <div>
            <span
              className="uppercase tracking-[0.2em] text-xs sm:text-sm text-white block leading-tight font-serif small-caps font-medium"
            >
              Confirmation for Young People
            </span>
            <span className="text-[10px] text-[#E8873B] tracking-widest uppercase block font-mono">
              Catholic Preparation
            </span>
          </div>
        </button>
      </div>

      {/* Center: Overall Progress Indicator */}
      <div className="hidden lg:flex items-center gap-4 bg-[#161616] border border-[#2A2A2A] rounded-full px-4 py-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-widest">
          <CheckCircle2 size={13} className="text-[#E8873B]" />
          <span className="text-[10px]">Progress</span>
          <span className="text-[#E8873B] font-mono font-bold text-xs">{stats.percentage}%</span>
        </div>
        <div className="w-24 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E8873B] transition-all duration-500"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
          {stats.completedLessonsCount}/{stats.totalLessons}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs uppercase tracking-widest text-slate-400">
        <button
          id="btn-nav-drill"
          onClick={() => onNavigate('drill')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all uppercase tracking-[0.15em] font-medium border ${
            currentView === 'drill'
              ? 'bg-[#E8873B] text-[#0F0F0F] border-[#E8873B] font-bold shadow-[0_0_15px_rgba(232,135,59,0.25)]'
              : 'border-[#2A2A2A] bg-[#161616] text-slate-300 hover:text-white hover:border-[#E8873B]'
          }`}
          title="38 Summary Catechism Questions Drill"
        >
          <Award size={13} className={currentView === 'drill' ? 'text-black' : 'text-[#E8873B]'} />
          <span className="hidden sm:inline">Recall Drill</span>
        </button>

        <button
          id="btn-nav-print-summary"
          onClick={onOpenPrintSummary}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs border border-[#2A2A2A] bg-[#161616] text-slate-400 hover:text-white hover:border-slate-500 transition-all uppercase tracking-[0.15em] font-medium"
          title="Print or Export Preparation Report"
        >
          <Printer size={13} className="text-slate-400" />
          <span>Report</span>
        </button>

        <button
          id="btn-nav-profile"
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-[#2A2A2A] bg-[#161616] text-slate-300 hover:border-[#E8873B] transition-colors"
          title="Candidate Profile & Settings"
        >
          <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#E8873B] border border-[#2A2A2A]">
            <User size={12} />
          </div>
          <span className="max-w-[80px] sm:max-w-[120px] truncate text-xs text-slate-200 normal-case">
            {state.profile.name.trim() || 'Profile'}
          </span>
        </button>
      </div>
    </header>
  );
};
