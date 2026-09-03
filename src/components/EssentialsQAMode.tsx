import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Check,
  X,
  HelpCircle,
} from 'lucide-react';
import { EssentialQA } from '../types';
import { useProgress } from '../context/ProgressContext';

interface EssentialsQAModeProps {
  lessonId: number;
  essentials: EssentialQA[];
}

type TabMode = 'cards' | 'flashcards' | 'quiz';

export const EssentialsQAMode: React.FC<EssentialsQAModeProps> = ({ lessonId, essentials }) => {
  const { state, toggleQAMastered, toggleBookmarkQA } = useProgress();
  const [activeTab, setActiveTab] = useState<TabMode>('cards');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Gap Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedWord, setQuizSelectedWord] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const lessonProgress = state.lessons[lessonId];
  const masteredList = lessonProgress?.qaMastered || [];
  const currentCard = essentials[flashcardIndex];
  const currentQuizItem = essentials[quizIndex];

  return (
    <div className="space-y-4 font-serif">
      {/* Tab Switcher & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141414] border border-[#2A2A2A] p-1.5 rounded-xl">
        <div className="flex items-center gap-1">
          <button
            id="tab-qa-cards"
            onClick={() => {
              setActiveTab('cards');
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider transition-all font-serif ${
              activeTab === 'cards'
                ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            Study List (5)
          </button>

          <button
            id="tab-qa-flashcards"
            onClick={() => {
              setActiveTab('flashcards');
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider transition-all font-serif ${
              activeTab === 'flashcards'
                ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            Flip Flashcards
          </button>

          <button
            id="tab-qa-quiz"
            onClick={() => {
              setActiveTab('quiz');
              setQuizIndex(0);
              setQuizSelectedWord(null);
            }}
            className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider transition-all font-serif ${
              activeTab === 'quiz'
                ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            Interactive Quiz
          </button>
        </div>

        <div className="flex items-center gap-2 px-2 text-xs uppercase tracking-wider text-slate-400">
          <span>Mastery:</span>
          <span className="text-[#E8873B] font-bold">
            {masteredList.length}/{essentials.length}
          </span>
        </div>
      </div>

      {/* MODE 1: STUDY CARDS */}
      {activeTab === 'cards' && (
        <div className="space-y-3">
          {essentials.map((item, index) => {
            const isMastered = masteredList.includes(item.id);
            const isBookmarked = state.savedBookmarkedQAs.includes(item.id);

            return (
              <div
                key={item.id}
                id={`qa-card-${item.id}`}
                className={`p-5 rounded-xl border transition-all ${
                  isMastered
                    ? 'bg-[#141414] border-[#E8873B]/40'
                    : 'bg-[#141414] border-[#2A2A2A] hover:border-[#3A3A3A]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[#E8873B] text-xs font-serif font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h4 className="text-base font-serif text-white leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleBookmarkQA(item.id)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Question'}
                      className={`p-1.5 rounded transition-colors ${
                        isBookmarked
                          ? 'text-[#E8873B] bg-[#E8873B]/10'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-[#1A1A1A]'
                      }`}
                    >
                      <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
                    </button>

                    <button
                      onClick={() => toggleQAMastered(lessonId, item.id)}
                      className={`flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-1 rounded border transition-all ${
                        isMastered
                          ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B] font-bold'
                          : 'bg-[#161616] border-[#2A2A2A] text-slate-400 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      <CheckCircle2 size={13} />
                      <span>{isMastered ? 'Mastered' : 'Mark Learned'}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-3 pl-8">
                  <p className="text-base text-slate-300 font-serif italic font-light leading-relaxed">
                    {item.answer}
                  </p>

                  {item.keyTerms && item.keyTerms.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      <span className="text-[10px] text-[#E8873B] uppercase tracking-wider">
                        Key Terms:
                      </span>
                      {item.keyTerms.map((term, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] bg-[#161616] border border-[#2A2A2A] text-amber-200/80 px-2.5 py-0.5 rounded font-serif"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 2: FLIP FLASHCARDS */}
      {activeTab === 'flashcards' && currentCard && (
        <div className="space-y-4 font-serif">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[220px] bg-[#141414] border border-[#2A2A2A] hover:border-[#E8873B]/50 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all shadow-xl"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-[#E8873B] uppercase tracking-wider">
                Card {flashcardIndex + 1} of {essentials.length}
              </span>
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider bg-[#161616] border border-[#2A2A2A] px-2.5 py-1 rounded text-slate-300">
                <RotateCw size={11} /> Click to flip
              </span>
            </div>

            <div className="my-auto py-4 text-center">
              {!isFlipped ? (
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#E8873B] block mb-2 font-serif small-caps">
                    Question
                  </span>
                  <h3 className="text-lg md:text-xl font-serif text-white max-w-md mx-auto">
                    {currentCard.question}
                  </h3>
                  <p className="text-xs font-serif italic text-slate-400 mt-4">
                    (Recite the formal Catholic answer in your head, then click to flip)
                  </p>
                </div>
              ) : (
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#E8873B] block mb-2 font-serif small-caps">
                    Official Answer
                  </span>
                  <p className="text-base md:text-xl text-amber-100 font-serif italic font-light leading-relaxed max-w-lg mx-auto">
                    “{currentCard.answer}”
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#222222]">
              <span className="text-xs uppercase tracking-wider text-slate-500">
                {masteredList.includes(currentCard.id) ? 'Status: Mastered' : 'Status: In Review'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleQAMastered(lessonId, currentCard.id);
                }}
                className={`text-xs uppercase tracking-wider px-3.5 py-1 rounded border transition-all flex items-center gap-1.5 ${
                  masteredList.includes(currentCard.id)
                    ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B] font-bold'
                    : 'bg-[#161616] border-[#2A2A2A] text-slate-300 hover:text-white'
                }`}
              >
                <Check size={12} />
                <span>{masteredList.includes(currentCard.id) ? 'Mastered' : 'Mark Learned'}</span>
              </button>
            </div>
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : essentials.length - 1));
                setIsFlipped(false);
              }}
              className="flex items-center gap-1 text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-[#141414] border border-[#2A2A2A] px-4 py-2 rounded"
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <div className="flex items-center gap-1">
              {essentials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setFlashcardIndex(idx);
                    setIsFlipped(false);
                  }}
                  className={`h-1.5 rounded transition-all ${
                    flashcardIndex === idx ? 'bg-[#E8873B] w-6' : 'bg-[#2A2A2A] w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setFlashcardIndex((prev) => (prev < essentials.length - 1 ? prev + 1 : 0));
                setIsFlipped(false);
              }}
              className="flex items-center gap-1 text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-[#141414] border border-[#2A2A2A] px-4 py-2 rounded"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: GAP FILL QUIZ */}
      {activeTab === 'quiz' && currentQuizItem && (
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 md:p-6 space-y-4 font-serif">
          <div className="flex items-center justify-between border-b border-[#222222] pb-3 text-xs uppercase tracking-wider text-slate-400">
            <span className="text-[#E8873B]">
              Question {quizIndex + 1} of {essentials.length}
            </span>
            <span>Score: {quizScore}/{essentials.length}</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#E8873B] block mb-1 small-caps">
              Question:
            </span>
            <h4 className="text-base font-serif text-white">{currentQuizItem.question}</h4>
          </div>

          {currentQuizItem.gapVersion && (
            <div className="p-4 bg-[#161616] rounded-xl border border-[#2A2A2A] space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 block">
                Complete the Answer:
              </span>

              <p className="text-base md:text-lg text-slate-200 font-serif italic font-light leading-relaxed">
                {currentQuizItem.gapVersion.textWithBlanks.split(/\[(.*?)\]/g).map((part, pIdx) => {
                  if (pIdx % 2 === 0) return <span key={pIdx}>{part}</span>;
                  return (
                    <span
                      key={pIdx}
                      className="inline-block mx-1 px-3 py-0.5 rounded border border-[#E8873B] bg-[#E8873B]/15 text-[#E8873B] font-serif font-medium text-sm"
                    >
                      {quizSelectedWord || '_______'}
                    </span>
                  );
                })}
              </p>

              <div className="pt-2 border-t border-[#222222]">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Select the missing phrase:</p>
                <div className="flex flex-wrap gap-2">
                  {currentQuizItem.gapVersion.options.map((opt, oIdx) => {
                    const isCorrect = currentQuizItem.gapVersion?.missingWords.includes(opt);
                    const isChosen = quizSelectedWord === opt;

                    let btnClass = 'bg-[#141414] border-[#2A2A2A] text-slate-200 hover:bg-[#1A1A1A] hover:border-[#E8873B]/40';
                    if (quizSelectedWord) {
                      if (isCorrect) {
                        btnClass = 'bg-[#E8873B] border-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]';
                      } else if (isChosen) {
                        btnClass = 'bg-rose-900 border-rose-600 text-white';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={!!quizSelectedWord}
                        onClick={() => {
                          setQuizSelectedWord(opt);
                          if (isCorrect) {
                            setQuizScore((s) => s + 1);
                            toggleQAMastered(lessonId, currentQuizItem.id);
                          }
                        }}
                        className={`px-4 py-2 rounded border text-xs uppercase tracking-wider transition-all font-serif ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {quizSelectedWord && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-400">
                {currentQuizItem.gapVersion?.missingWords.includes(quizSelectedWord)
                  ? 'Correct!'
                  : 'Review the answer above.'}
              </span>
              <button
                onClick={() => {
                  if (quizIndex < essentials.length - 1) {
                    setQuizIndex((prev) => prev + 1);
                    setQuizSelectedWord(null);
                  } else {
                    setActiveTab('cards');
                  }
                }}
                className="px-6 py-2 rounded bg-[#E8873B] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(232,135,59,0.3)]"
              >
                {quizIndex < essentials.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
