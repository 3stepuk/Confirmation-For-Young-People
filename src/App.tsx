import React, { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { IntroView } from './components/IntroView';
import { ConversationView } from './components/ConversationView';
import { MasterRecallDrill } from './components/MasterRecallDrill';
import { AppendicesView } from './components/AppendicesView';
import { CandidateProfileModal } from './components/CandidateProfileModal';
import { LESSONS_DATA } from './data/lessons';

export function AppContent() {
  const [currentView, setCurrentView] = useState<'intro' | 'lesson' | 'drill' | 'appendix'>('intro');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [selectedAppendixTab, setSelectedAppendixTab] = useState<string>('rite');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const handleNavigate = (view: string, lessonId?: number, appendixTab?: string) => {
    if (view === 'intro') {
      setCurrentView('intro');
    } else if (view === 'lesson') {
      setCurrentView('lesson');
      if (lessonId) setSelectedLessonId(lessonId);
    } else if (view === 'drill') {
      setCurrentView('drill');
    } else if (view === 'appendix') {
      setCurrentView('appendix');
      if (appendixTab) setSelectedAppendixTab(appendixTab);
    }
  };

  const currentLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId) || LESSONS_DATA[0];

  return (
    <div className="h-screen w-full bg-[#0F0F0F] text-[#D1D5DB] flex flex-col font-serif overflow-hidden select-none">
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenPrintSummary={() => {
          // Trigger print preview of the page
          window.print();
        }}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div
          className={`hidden md:block transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-80' : 'w-0 overflow-hidden'
          }`}
        >
          <Sidebar
            currentView={currentView}
            selectedLessonId={selectedLessonId}
            selectedAppendixTab={selectedAppendixTab}
            onNavigate={handleNavigate}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex">
            <div className="w-4/5 max-w-sm h-full bg-[#121212]">
              <Sidebar
                currentView={currentView}
                selectedLessonId={selectedLessonId}
                selectedAppendixTab={selectedAppendixTab}
                onNavigate={handleNavigate}
                onCloseMobileSidebar={() => setIsSidebarOpen(false)}
              />
            </div>
            <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}

        {/* Primary Content View Container */}
        <main className="flex-1 overflow-y-auto bg-[#0F0F0F] p-4 sm:p-6 md:p-10 relative">
          {/* Subtle Artistic Flair Flame Watermark */}
          <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 pointer-events-none z-0">
            <svg
              width="280"
              height="280"
              viewBox="0 0 200 200"
              fill="none"
              stroke="#E8873B"
              strokeWidth="0.5"
            >
              <path d="M100 20 C100 20 60 80 100 120 C140 80 100 20 100 20" />
              <path d="M100 40 C100 40 75 85 100 115 C125 85 100 40 100 40" />
              <circle cx="100" cy="140" r="2" fill="#E8873B" />
            </svg>
          </div>

          <div className="relative z-10">
            {currentView === 'intro' && (
              <IntroView
                onStartLesson={(lessonId) => {
                  setSelectedLessonId(lessonId);
                  setCurrentView('lesson');
                }}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onOpenDrill={() => setCurrentView('drill')}
              />
            )}

            {currentView === 'lesson' && (
              <ConversationView
                lesson={currentLesson}
                onNavigateLesson={(id) => setSelectedLessonId(id)}
                totalLessons={LESSONS_DATA.length}
              />
            )}

            {currentView === 'drill' && <MasterRecallDrill />}

            {currentView === 'appendix' && (
              <AppendicesView
                activeTab={selectedAppendixTab}
                onSelectTab={(tab) => setSelectedAppendixTab(tab)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Artistic Flair Bottom Navigation Footer */}
      <footer className="h-16 md:h-20 bg-[#161616] border-t border-[#2A2A2A] flex items-center px-4 md:px-8 select-none z-30">
        <nav className="flex-1 flex justify-center gap-6 sm:gap-10 md:gap-12">
          <button
            id="footer-nav-intro"
            onClick={() => handleNavigate('intro')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              currentView === 'intro' ? 'text-[#E8873B]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest font-bold font-serif">Overview</span>
            <div
              className={`w-1 h-1 rounded-full ${
                currentView === 'intro' ? 'bg-[#E8873B]' : 'bg-transparent'
              } mt-1`}
            />
          </button>

          <button
            id="footer-nav-lessons"
            onClick={() => handleNavigate('lesson')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              currentView === 'lesson' ? 'text-[#E8873B]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest font-bold font-serif">Lessons</span>
            <div
              className={`w-1 h-1 rounded-full ${
                currentView === 'lesson' ? 'bg-[#E8873B]' : 'bg-transparent'
              } mt-1`}
            />
          </button>

          <button
            id="footer-nav-drills"
            onClick={() => handleNavigate('drill')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              currentView === 'drill' ? 'text-[#E8873B]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest font-bold font-serif">Drills</span>
            <div
              className={`w-1 h-1 rounded-full ${
                currentView === 'drill' ? 'bg-[#E8873B]' : 'bg-transparent'
              } mt-1`}
            />
          </button>

          <button
            id="footer-nav-appendices"
            onClick={() => handleNavigate('appendix')}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              currentView === 'appendix' ? 'text-[#E8873B]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest font-bold font-serif">Resources</span>
            <div
              className={`w-1 h-1 rounded-full ${
                currentView === 'appendix' ? 'bg-[#E8873B]' : 'bg-transparent'
              } mt-1`}
            />
          </button>

          <button
            id="footer-nav-profile"
            onClick={() => setIsProfileModalOpen(true)}
            className="flex flex-col items-center gap-1 cursor-pointer text-slate-500 hover:text-slate-300 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold font-serif">Profile</span>
            <div className="w-1 h-1 rounded-full bg-transparent mt-1" />
          </button>
        </nav>

        <div className="hidden sm:block w-48 text-right">
          <p className="text-[9px] uppercase tracking-widest text-slate-600 font-serif">
            Mentor Guidance
          </p>
          <p className="text-xs text-slate-400 italic font-serif">Fr. John Sullivan</p>
        </div>
      </footer>

      {/* Candidate Profile Modal */}
      <CandidateProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
