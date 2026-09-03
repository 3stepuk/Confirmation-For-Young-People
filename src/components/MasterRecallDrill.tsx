import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Search,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  RotateCw,
  BookOpen,
} from 'lucide-react';
import { APPENDIX_E_SUMMARY_CATECHISM } from '../data/appendices';
import { useProgress } from '../context/ProgressContext';
import { MasterCatechismItem } from '../types';

export const MasterRecallDrill: React.FC = () => {
  const { state, recordSummaryCatechismResult } = useProgress();

  const [drillMode, setDrillMode] = useState<'quiz' | 'flashcards' | 'browse'>('quiz');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Drill Question index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Flashcard state
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  // Categories list
  const categories = [
    'All',
    'The Holy Spirit & Trinity',
    'Christian Initiation',
    'Minister & Rite',
    'Effects & Character',
    'Gifts, Fruits & Virtues',
    'Baptismal Promises',
    'Preparation & Reception',
  ];

  // Filter items
  const filteredItems = APPENDIX_E_SUMMARY_CATECHISM.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentItem: MasterCatechismItem | undefined = filteredItems[currentIndex] || filteredItems[0];
  const itemMastery = currentItem ? state.summaryCatechismMastery[currentItem.id] : undefined;
  const isCurrentMastered = itemMastery?.mastered;

  const totalMasteredCount = (Object.values(state.summaryCatechismMastery) as { mastered: boolean }[]).filter(
    (m) => m.mastered
  ).length;

  const handleSelectQuizWord = (word: string) => {
    if (!currentItem) return;
    setSelectedWord(word);
    const isCorrect = currentItem.gapPrompt.correctWords.includes(word);
    if (isCorrect) {
      recordSummaryCatechismResult(currentItem.id, true);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedWord(null);
      setCardFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedWord(null);
      setCardFlipped(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 font-serif">
      {/* Header */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
              <Award size={18} />
            </div>
            <div>
              <span className="text-[#E8873B] uppercase tracking-[0.25em] text-xs font-serif small-caps block">
                Doctrinal Mastery
              </span>
              <h1 className="text-xl md:text-2xl font-serif italic text-white">
                Master Recall Drill
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#161616] border border-[#2A2A2A] px-3.5 py-1.5 rounded text-xs uppercase tracking-wider text-slate-300">
            <span>Total Mastered:</span>
            <span className="text-[#E8873B] font-bold">
              {totalMasteredCount}/38
            </span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#222222]">
          <div className="flex items-center gap-1.5 bg-[#161616] p-1 rounded border border-[#2A2A2A]">
            <button
              onClick={() => {
                setDrillMode('quiz');
                setSelectedWord(null);
              }}
              className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider transition-all font-serif ${
                drillMode === 'quiz'
                  ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Quiz
            </button>
            <button
              onClick={() => {
                setDrillMode('flashcards');
                setCardFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider transition-all font-serif ${
                drillMode === 'flashcards'
                  ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Flip Flashcards
            </button>
            <button
              onClick={() => setDrillMode('browse')}
              className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider transition-all font-serif ${
                drillMode === 'browse'
                  ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Complete Browse (38)
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Search doctrine..."
              className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none font-sans"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setSelectedWord(null);
                setCardFlipped(false);
              }}
              className={`px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-all font-serif ${
                selectedCategory === cat
                  ? 'bg-[#E8873B]/20 text-[#E8873B] border border-[#E8873B]/50'
                  : 'bg-[#161616] text-slate-400 hover:text-slate-200 border border-[#2A2A2A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-8 text-center bg-[#141414] rounded-2xl border border-[#2A2A2A] text-slate-400">
          No catechism items match your search or filter.
        </div>
      ) : (
        <>
          {/* 1. QUIZ MODE */}
          {drillMode === 'quiz' && currentItem && (
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#222222] pb-3 text-xs uppercase tracking-wider text-slate-400">
                <span className="text-[#E8873B]">
                  Question {currentIndex + 1} of {filteredItems.length}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#161616] border border-[#2A2A2A] text-slate-400 text-[11px]">
                  {currentItem.category}
                </span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#E8873B] block mb-1 small-caps">
                  Question:
                </span>
                <h3 className="text-lg md:text-xl font-serif text-white leading-snug">
                  {currentItem.question}
                </h3>
              </div>

              {/* Gap Fill Section */}
              <div className="p-5 bg-[#161616] rounded-xl border border-[#2A2A2A] space-y-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 block">
                  Complete the Catholic truth:
                </span>

                <p className="text-base md:text-lg text-slate-200 font-serif italic font-light leading-relaxed">
                  {currentItem.gapPrompt.textWithGaps.split(/\[(.*?)\]/g).map((part, pIdx) => {
                    if (pIdx % 2 === 0) return <span key={pIdx}>{part}</span>;
                    return (
                      <span
                        key={pIdx}
                        className="inline-block mx-1 px-3 py-0.5 rounded border border-[#E8873B] bg-[#E8873B]/15 text-[#E8873B] font-serif font-medium text-sm"
                      >
                        {selectedWord || '_______'}
                      </span>
                    );
                  })}
                </p>

                <div className="pt-3 border-t border-[#222222]">
                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Select the missing phrase:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.gapPrompt.options.map((option, oIdx) => {
                      const isCorrect = currentItem.gapPrompt.correctWords.includes(option);
                      const isChosen = selectedWord === option;

                      let btnStyle = 'bg-[#141414] border-[#2A2A2A] text-slate-200 hover:bg-[#1A1A1A] hover:border-[#E8873B]/40';
                      if (selectedWord) {
                        if (isCorrect) {
                          btnStyle = 'bg-[#E8873B] border-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]';
                        } else if (isChosen) {
                          btnStyle = 'bg-rose-900 border-rose-600 text-white';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={!!selectedWord}
                          onClick={() => handleSelectQuizWord(option)}
                          className={`px-4 py-2 rounded border text-xs uppercase tracking-wider transition-all font-serif ${btnStyle}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={handlePrevious}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs uppercase tracking-wider transition-all ${
                    currentIndex === 0
                      ? 'opacity-30 cursor-not-allowed text-slate-600'
                      : 'bg-[#161616] text-slate-300 hover:text-white border border-[#2A2A2A]'
                  }`}
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      recordSummaryCatechismResult(currentItem.id, !isCurrentMastered);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded text-xs uppercase tracking-wider border transition-all ${
                      isCurrentMastered
                        ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B] font-bold'
                        : 'bg-[#161616] border-[#2A2A2A] text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    <span>{isCurrentMastered ? 'Mastered' : 'Mark Learned'}</span>
                  </button>

                  <button
                    disabled={currentIndex >= filteredItems.length - 1}
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-6 py-2 rounded bg-[#E8873B] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(232,135,59,0.3)] disabled:opacity-30"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. FLASHCARDS MODE */}
          {drillMode === 'flashcards' && currentItem && (
            <div className="space-y-4 font-serif">
              <div
                onClick={() => setCardFlipped(!cardFlipped)}
                className="min-h-[250px] bg-[#141414] border border-[#2A2A2A] hover:border-[#E8873B]/50 rounded-2xl p-8 flex flex-col justify-between cursor-pointer transition-all shadow-xl"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[#E8873B] uppercase tracking-wider">
                    Truth {currentIndex + 1} of {filteredItems.length}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider bg-[#161616] border border-[#2A2A2A] px-2.5 py-1 rounded text-slate-300">
                    <RotateCw size={11} /> Click to flip
                  </span>
                </div>

                <div className="my-auto py-4 text-center">
                  {!cardFlipped ? (
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-[#E8873B] block mb-2 font-serif small-caps">
                        Question
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif text-white max-w-xl mx-auto leading-snug">
                        {currentItem.question}
                      </h3>
                      <p className="text-xs font-serif italic text-slate-500 mt-4">
                        (Recite the answer in your head, then click to check)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-[#E8873B] block mb-2 font-serif small-caps">
                        Sacramental Truth
                      </span>
                      <p className="text-lg md:text-2xl text-amber-100 font-serif italic font-light leading-relaxed max-w-xl mx-auto">
                        “{currentItem.answer}”
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#222222]">
                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    Category: {currentItem.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      recordSummaryCatechismResult(currentItem.id, !isCurrentMastered);
                    }}
                    className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded border transition-all flex items-center gap-1.5 ${
                      isCurrentMastered
                        ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B] font-bold'
                        : 'bg-[#161616] border-[#2A2A2A] text-slate-300 hover:text-white'
                    }`}
                  >
                    <Check size={13} />
                    <span>{isCurrentMastered ? 'Mastered' : 'Mark Learned'}</span>
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button
                  disabled={currentIndex === 0}
                  onClick={handlePrevious}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-[#141414] border border-[#2A2A2A] px-4 py-2 rounded disabled:opacity-30"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                <span className="text-xs uppercase tracking-wider text-slate-400">
                  {currentIndex + 1} / {filteredItems.length}
                </span>

                <button
                  disabled={currentIndex >= filteredItems.length - 1}
                  onClick={handleNext}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#0F0F0F] font-bold bg-[#E8873B] hover:bg-white hover:text-black transition-all px-6 py-2 rounded shadow-[0_0_15px_rgba(232,135,59,0.3)] disabled:opacity-30"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* 3. BROWSE ALL 38 QUESTIONS */}
          {drillMode === 'browse' && (
            <div className="space-y-3 font-serif">
              {filteredItems.map((item) => {
                const isMastered = state.summaryCatechismMastery[item.id]?.mastered;

                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isMastered
                        ? 'bg-[#141414] border-[#E8873B]/40'
                        : 'bg-[#141414] border-[#2A2A2A]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded bg-[#161616] border border-[#2A2A2A] text-[#E8873B] text-xs font-serif font-bold flex items-center justify-center flex-shrink-0">
                          {item.id}
                        </span>
                        <div>
                          <span className="text-[10px] text-[#E8873B] uppercase tracking-wider block">
                            {item.category}
                          </span>
                          <h4 className="text-sm md:text-base font-serif text-white">
                            {item.question}
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={() => recordSummaryCatechismResult(item.id, !isMastered)}
                        className={`text-xs uppercase tracking-wider px-3 py-1 rounded border transition-all flex items-center gap-1 flex-shrink-0 ${
                          isMastered
                            ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B] font-bold'
                            : 'bg-[#161616] border-[#2A2A2A] text-slate-400 hover:text-white'
                        }`}
                      >
                        <Check size={12} />
                        <span>{isMastered ? 'Mastered' : 'Mark Learned'}</span>
                      </button>
                    </div>

                    <div className="mt-3 pl-8">
                      <p className="text-sm md:text-base text-slate-300 font-serif italic font-light leading-relaxed">
                        “{item.answer}”
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
