import React, { useState } from 'react';
import { Check, RotateCcw, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { MemoryGapItem } from '../types';

interface MemoryGapExerciseProps {
  item: MemoryGapItem;
  onMastered: () => void;
  isAlreadyMastered?: boolean;
}

export const MemoryGapExercise: React.FC<MemoryGapExerciseProps> = ({
  item,
  onMastered,
  isAlreadyMastered = false,
}) => {
  // Store user selection for each gap index
  const [selectedWords, setSelectedWords] = useState<Record<number, string>>({});
  const [activeGapIndex, setActiveGapIndex] = useState<number | null>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  // Parse sentence into segments and bracketed slots
  // Pattern: matches "[word]"
  const parts = item.sentenceWithBlanks.split(/\[(.*?)\]/g);

  // Check if all gaps filled correctly
  const allCorrect = item.gaps.every((gap) => selectedWords[gap.index] === gap.word);

  const handleSelectOption = (gapIndex: number, option: string) => {
    const nextSelections = { ...selectedWords, [gapIndex]: option };
    setSelectedWords(nextSelections);

    const isOptionCorrect = option === item.gaps[gapIndex]?.word;

    // If correct, advance to next unfinished gap
    if (isOptionCorrect) {
      const nextGap = item.gaps.find(
        (g) => g.index > gapIndex && nextSelections[g.index] !== g.word
      );
      if (nextGap) {
        setActiveGapIndex(nextGap.index);
      } else {
        // Check if all gaps are now complete
        const finished = item.gaps.every((g) => nextSelections[g.index] === g.word);
        if (finished) {
          setActiveGapIndex(null);
          setJustCompleted(true);
          onMastered();
        }
      }
    }
  };

  const handleReset = () => {
    setSelectedWords({});
    setActiveGapIndex(0);
    setShowHint(false);
    setJustCompleted(false);
  };

  // Find active gap
  const currentGap = item.gaps.find((g) => g.index === activeGapIndex);

  return (
    <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-5 md:p-6 space-y-5 font-serif">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#222222] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-[#E8873B]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#E8873B] font-serif small-caps font-semibold">
            Memory Recall Drill
          </span>
          {(allCorrect || isAlreadyMastered) && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium bg-[#E8873B]/10 text-[#E8873B] px-2 py-0.5 rounded border border-[#E8873B]/30">
              <Check size={11} /> Mastered
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {item.gaps.some((g) => g.hint) && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-[#161616] border border-[#2A2A2A] hover:border-slate-500 transition-colors uppercase tracking-wider text-[11px]"
            >
              <HelpCircle size={12} />
              <span>Hint</span>
            </button>
          )}
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-[#161616] border border-[#2A2A2A] hover:border-slate-500 transition-colors uppercase tracking-wider text-[11px]"
            title="Reset Drill"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Sentence with Blanks */}
      <div className="text-base md:text-xl text-white leading-relaxed font-serif italic font-light">
        {parts.map((part, i) => {
          // Even index = regular text, Odd index = gap placeholder
          if (i % 2 === 0) {
            return <span key={i}>{part}</span>;
          }

          const gapIndex = Math.floor(i / 2);
          const gapInfo = item.gaps[gapIndex];
          const selected = selectedWords[gapIndex];
          const isCorrect = selected === gapInfo?.word;
          const isActive = activeGapIndex === gapIndex;

          return (
            <button
              key={i}
              onClick={() => setActiveGapIndex(gapIndex)}
              className={`inline-block mx-1 px-3 py-1 rounded border text-sm sm:text-base font-serif font-medium transition-all ${
                isCorrect
                  ? 'bg-[#E8873B]/15 border-[#E8873B] text-[#E8873B]'
                  : selected
                  ? 'bg-rose-950/40 border-rose-600 text-rose-300'
                  : isActive
                  ? 'bg-[#1A1A1A] border-[#E8873B] text-white ring-1 ring-[#E8873B]/30'
                  : 'bg-[#161616] border-[#2A2A2A] text-slate-400 hover:border-slate-500'
              }`}
            >
              {selected || '_______'}
            </button>
          );
        })}
      </div>

      {/* Hint Alert if opened */}
      {showHint && currentGap?.hint && (
        <div className="bg-[#1A1813] border border-[#E8873B]/30 rounded-xl p-3 text-xs text-amber-200/90 flex items-start gap-2 font-sans">
          <HelpCircle size={14} className="text-[#E8873B] flex-shrink-0 mt-0.5" />
          <span>
            <strong className="font-serif">Hint for blank {currentGap.index + 1}:</strong> {currentGap.hint}
          </span>
        </div>
      )}

      {/* Options for currently selected gap */}
      {currentGap && !allCorrect && (
        <div className="space-y-2 pt-2 border-t border-[#222222]">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-serif">
            Choose the correct word for blank {currentGap.index + 1}:
          </p>
          <div className="flex flex-wrap gap-2">
            {currentGap.options.map((option, idx) => {
              const isSelected = selectedWords[currentGap.index] === option;
              const isCorrect = option === currentGap.word;

              let btnStyle =
                'bg-[#161616] border-[#2A2A2A] text-slate-300 hover:bg-[#1A1A1A] hover:border-[#E8873B]/40 hover:text-white';
              if (isSelected) {
                btnStyle = isCorrect
                  ? 'bg-[#E8873B] border-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                  : 'bg-rose-900 border-rose-600 text-white';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentGap.index, option)}
                  className={`px-4 py-2 rounded border text-xs uppercase tracking-wider transition-all font-serif ${btnStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Success Banner */}
      {(allCorrect || justCompleted) && (
        <div className="bg-[#E8873B]/10 border border-[#E8873B]/30 rounded-xl p-4 flex items-center justify-between gap-3 text-[#E8873B]">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-[#E8873B]" />
            <div>
              <p className="text-sm font-serif font-bold text-white">Central Truth Mastered!</p>
              <p className="text-xs text-slate-300 font-sans">
                You have committed this fundamental doctrine to memory.
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-xs font-serif uppercase tracking-wider text-slate-300 hover:text-white px-3 py-1.5 rounded bg-[#161616] hover:bg-[#1F1F1F] border border-[#2A2A2A]"
          >
            Practice Again
          </button>
        </div>
      )}
    </div>
  );
};
