import React, { useState } from 'react';
import {
  Scroll,
  Flame,
  HeartHandshake,
  BookMarked,
  BookOpen,
  ShieldCheck,
  Info,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Search,
  Award,
  Lock,
  Sparkles,
} from 'lucide-react';
import {
  APPENDIX_A_RITE,
  APPENDIX_A_NOTE,
  APPENDIX_B_GIFTS,
  APPENDIX_B_FRUITS,
  APPENDIX_C_SPONSOR_REQUIREMENTS,
  APPENDIX_C_NOTE,
  APPENDIX_C_SAINT_GUIDE,
  APPENDIX_D_PRAYERS,
  APPENDIX_D_RULE_ITEMS,
  APPENDIX_E_SUMMARY_CATECHISM,
  APPENDIX_F_AREAS,
  APPENDIX_F_SAFEGUARDING_NOTE,
  APPENDIX_F_CANONICAL_NOTE,
  DOCTRINAL_SOURCES,
} from '../data/appendices';
import { useProgress } from '../context/ProgressContext';

interface AppendicesViewProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const AppendicesView: React.FC<AppendicesViewProps> = ({ activeTab, onSelectTab }) => {
  const {
    state,
    updateProfile,
    toggleReadinessCheck,
    saveReadinessNotes,
    toggleRuleHabit,
    saveRuleHabitNote,
    recordSummaryCatechismResult,
  } = useProgress();

  const [copiedPrayerId, setCopiedPrayerId] = useState<string | null>(null);
  const [catechismSearch, setCatechismSearch] = useState('');

  const handleCopyPrayer = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrayerId(id);
    setTimeout(() => setCopiedPrayerId(null), 2000);
  };

  const tabs = [
    { id: 'rite', label: 'App. A: Rite Step by Step', icon: Scroll },
    { id: 'gifts', label: 'App. B: Gifts & Fruits', icon: Flame },
    { id: 'sponsor', label: 'App. C: Sponsor & Saint', icon: HeartHandshake },
    { id: 'prayers', label: 'App. D: Prayers & Rule', icon: BookMarked },
    { id: 'catechism', label: 'App. E: Summary Catechism (38)', icon: BookOpen },
    { id: 'readiness', label: 'App. F: Readiness Guide', icon: ShieldCheck },
    { id: 'sources', label: 'Sources & References', icon: Info },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 font-serif">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#141414] border border-[#2A2A2A] p-2 rounded-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs uppercase tracking-wider transition-all font-serif ${
                isActive
                  ? 'bg-[#E8873B] text-[#0F0F0F] font-bold shadow-[0_0_15px_rgba(232,135,59,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-[#161616]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-black' : 'text-[#E8873B]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB A: THE RITE OF CONFIRMATION STEP BY STEP */}
      {/* ========================================================================= */}
      {activeTab === 'rite' && (
        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-2 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] text-xs uppercase tracking-[0.25em] font-serif small-caps font-semibold">
              <Scroll size={13} /> Appendix A
            </div>
            <h2 className="text-2xl md:text-3xl font-serif italic text-white">
              The Rite of Confirmation Step by Step
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-serif">
              Knowing what happens at each moment of the liturgy helps you take part with understanding, reverence, and peace of heart.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-[#161616] border-b border-[#2A2A2A] text-xs uppercase text-slate-400 tracking-wider font-serif">
                  <tr>
                    <th className="py-3.5 px-4 md:px-6 w-1/4">Moment</th>
                    <th className="py-3.5 px-4 md:px-6 w-2/5">What happens</th>
                    <th className="py-3.5 px-4 md:px-6 w-1/3">How I take part</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222]">
                  {APPENDIX_A_RITE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#181818]/60 transition-colors">
                      <td className="py-4 px-4 md:px-6 font-serif font-semibold text-white">
                        <span className="text-xs text-[#E8873B] mr-2">
                          {idx + 1}.
                        </span>
                        {row.moment}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-slate-300 font-serif italic font-light">
                        {row.whatHappens}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-amber-200/90 font-serif">
                        {row.howITakePart}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Updated practice note */}
          <div className="p-5 rounded-2xl bg-[#181613] border border-[#E8873B]/30 text-xs md:text-sm text-amber-200/90 flex items-start gap-3">
            <Info size={18} className="text-[#E8873B] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#E8873B] uppercase tracking-wider block text-xs mb-1 font-serif small-caps">
                Liturgical Note
              </span>
              <p className="font-serif italic leading-relaxed">{APPENDIX_A_NOTE}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB B: THE GIFTS AND FRUITS AT A GLANCE */}
      {/* ========================================================================= */}
      {activeTab === 'gifts' && (
        <div className="space-y-8">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8873B]/10 text-[#E8873B] text-xs font-mono font-semibold">
              <Flame size={13} /> Appendix B
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
              The Gifts and Fruits at a Glance
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
              Foretold by Isaiah and bestowed in their fullness in Confirmation, the seven gifts perfect the virtues and bear holy fruits in daily life.
            </p>
          </div>

          {/* Seven Gifts Table */}
          <div className="bg-[#141414] border border-[#242424] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Flame size={18} className="text-[#E8873B]" />
              <span>The Seven Gifts of the Holy Spirit</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {APPENDIX_B_GIFTS.map((g, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#181818] border border-[#262626] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-[#E8873B] font-display">
                      {idx + 1}. {g.gift}
                    </h4>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300">
                    <strong className="text-white">What it perfects:</strong> {g.whatItPerfects}
                  </p>
                  <div className="p-3 bg-[#1F1D19] border border-[#E8873B]/20 rounded-lg text-xs text-amber-200/90 italic">
                    Discernment: “{g.questionForDiscernment}”
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Twelve Fruits Grid */}
          <div className="bg-[#141414] border border-[#242424] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Sparkles size={18} className="text-[#E8873B]" />
              <span>The Twelve Traditional Fruits of the Holy Spirit</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {APPENDIX_B_FRUITS.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#181818] border border-[#262626] space-y-1"
                >
                  <span className="text-xs font-bold text-white font-display block">
                    {idx + 1}. {f.fruit}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {f.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB C: CHOOSING A SPONSOR AND, WHERE CUSTOMARY, A SAINT */}
      {/* ========================================================================= */}
      {activeTab === 'sponsor' && (
        <div className="space-y-8">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8873B]/10 text-[#E8873B] text-xs font-mono font-semibold">
              <HeartHandshake size={13} /> Appendix C
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
              Choosing a Sponsor and a Patron Saint
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
              Canonical guidance for selecting a suitable sponsor, plus discerning a patron saint or confirmation name.
            </p>
          </div>

          {/* Sponsor Canonical Table */}
          <div className="bg-[#141414] border border-[#242424] rounded-2xl p-6 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white font-display">
              Canonical Requirements for a Sponsor (Canons 874 & 893)
            </h3>

            <div className="divide-y divide-[#222222]">
              {APPENDIX_C_SPONSOR_REQUIREMENTS.map((r, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className="w-44 font-semibold text-[#E8873B] text-sm">
                    {r.requirement}:
                  </span>
                  <span className="text-xs md:text-sm text-slate-300 flex-1">
                    {r.whatItMeans}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#181818] rounded-xl text-xs text-slate-400 leading-relaxed border border-[#262626]">
              {APPENDIX_C_NOTE}
            </div>
          </div>

          {/* Confirmation Name Guide */}
          <div className="bg-[#141414] border border-[#242424] rounded-2xl p-6 space-y-3">
            <h3 className="text-base md:text-lg font-bold text-white font-display">
              {APPENDIX_C_SAINT_GUIDE.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {APPENDIX_C_SAINT_GUIDE.description}
            </p>
            <div className="p-4 bg-[#1F1D18] border border-[#E8873B]/30 rounded-xl text-xs text-amber-200/90 space-y-1">
              <strong className="text-[#E8873B] uppercase tracking-wider block text-[11px]">
                Good Discernment:
              </strong>
              <p>{APPENDIX_C_SAINT_GUIDE.goodDiscernment}</p>
            </div>
          </div>

          {/* Candidate Personal Discernment Form */}
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white font-display">
              Candidate Discernment Records
            </h3>
            <p className="text-xs text-slate-400">
              Fill these fields in. They will be saved to your local Candidate Profile and included in your summary report.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Sponsor / Mentor
                </label>
                <input
                  type="text"
                  value={state.profile.sponsor}
                  onChange={(e) => updateProfile({ sponsor: e.target.value })}
                  placeholder="e.g. Mary Harrison"
                  className="w-full bg-[#181818] border border-[#2B2B2B] focus:border-[#E8873B] rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Priest / Deacon / Mentor
                </label>
                <input
                  type="text"
                  value={state.profile.mentorOrPriest}
                  onChange={(e) => updateProfile({ mentorOrPriest: e.target.value })}
                  placeholder="e.g. Fr. John"
                  className="w-full bg-[#181818] border border-[#2B2B2B] focus:border-[#E8873B] rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-slate-400 mb-1">
                  Why I chose my sponsor:
                </label>
                <textarea
                  rows={2}
                  value={state.profile.sponsorReason}
                  onChange={(e) => updateProfile({ sponsorReason: e.target.value })}
                  placeholder="e.g. Because of their faithful Catholic witness and regular practice of Sunday Mass..."
                  className="w-full bg-[#181818] border border-[#2B2B2B] focus:border-[#E8873B] rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  My saint or baptismal patron:
                </label>
                <input
                  type="text"
                  value={state.profile.patronSaint}
                  onChange={(e) => updateProfile({ patronSaint: e.target.value })}
                  placeholder="e.g. Saint Thérèse of Lisieux / Saint Thomas More"
                  className="w-full bg-[#181818] border border-[#2B2B2B] focus:border-[#E8873B] rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  The virtue I hope to imitate:
                </label>
                <input
                  type="text"
                  value={state.profile.virtueToImitate}
                  onChange={(e) => updateProfile({ virtueToImitate: e.target.value })}
                  placeholder="e.g. Courage in speaking truth / Gentleness in small duties"
                  className="w-full bg-[#181818] border border-[#2B2B2B] focus:border-[#E8873B] rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB D: PRAYERS AND A RULE OF LIFE */}
      {/* ========================================================================= */}
      {activeTab === 'prayers' && (
        <div className="space-y-8">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8873B]/10 text-[#E8873B] text-xs font-mono font-semibold">
              <BookMarked size={13} /> Appendix D
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
              Prayers and a Rule of Life
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
              Traditional Catholic prayers for preparation and a sustainable rule of life to persevere in grace after Confirmation.
            </p>
          </div>

          {/* Prayers List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Flame size={18} className="text-[#E8873B]" />
              <span>Prayers for Candidates</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {APPENDIX_D_PRAYERS.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-white font-display">
                        {p.title}
                      </h4>
                      {p.latin && (
                        <span className="text-[11px] text-[#E8873B] font-mono">
                          {p.latin}
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-amber-100/90 font-scripture leading-relaxed italic">
                      “{p.text}”
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#222222] flex justify-end">
                    <button
                      onClick={() => handleCopyPrayer(p.id, p.text)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-[#1C1C1C] transition-colors"
                    >
                      {copiedPrayerId === p.id ? (
                        <>
                          <Check size={12} className="text-[#E8873B]" />
                          <span className="text-[#E8873B]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* A Simple Rule of Life Table */}
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                A Simple Rule of Life After Confirmation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Commit to these regular Catholic habits so that the grace of Confirmation continues to bear fruit.
              </p>
            </div>

            <div className="divide-y divide-[#222222] space-y-4">
              {APPENDIX_D_RULE_ITEMS.map((item) => {
                const habitState = state.ruleOfLifeHabits[item.id] || {
                  committed: false,
                  userCommitmentNote: '',
                };

                return (
                  <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E8873B]/15 text-[#E8873B] text-xs font-mono font-semibold">
                          {item.rhythm}
                        </span>
                        <h4 className="text-sm md:text-base font-semibold text-white">
                          {item.practice}
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleRuleHabit(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border transition-all flex-shrink-0 ${
                          habitState.committed
                            ? 'bg-[#E8873B]/20 border-[#E8873B] text-[#E8873B] font-semibold'
                            : 'bg-[#1C1C1C] border-[#303030] text-slate-400 hover:text-white'
                        }`}
                      >
                        <CheckCircle2 size={13} />
                        <span>{habitState.committed ? 'Committed' : 'Commit'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 pl-2 border-l-2 border-[#2B2B2B]">
                      {item.advice}
                    </p>

                    <input
                      type="text"
                      value={habitState.userCommitmentNote || ''}
                      onChange={(e) => saveRuleHabitNote(item.id, e.target.value)}
                      placeholder="My practical plan for this rhythm (e.g. Sunday 10am Mass at St Barnabas)..."
                      className="w-full bg-[#181818] border border-[#282828] focus:border-[#E8873B] rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB E: SUMMARY CATECHISM (38 QUESTIONS) */}
      {/* ========================================================================= */}
      {activeTab === 'catechism' && (
        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8873B]/10 text-[#E8873B] text-xs font-mono font-semibold mb-2">
                  <BookOpen size={13} /> Appendix E
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
                  Summary Catechism
                </h2>
                <p className="text-xs md:text-sm text-slate-400">
                  The complete 38 foundational questions and answers from pages 20–21 of the Catechism.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={catechismSearch}
                  onChange={(e) => setCatechismSearch(e.target.value)}
                  placeholder="Search 38 questions..."
                  className="w-full bg-[#1A1A1A] border border-[#2C2C2C] focus:border-[#E8873B] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {APPENDIX_E_SUMMARY_CATECHISM.filter(
              (item) =>
                item.question.toLowerCase().includes(catechismSearch.toLowerCase()) ||
                item.answer.toLowerCase().includes(catechismSearch.toLowerCase())
            ).map((item) => {
              const isMastered = state.summaryCatechismMastery[item.id]?.mastered;

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isMastered
                      ? 'bg-[#181818] border-[#E8873B]/40'
                      : 'bg-[#141414] border-[#242424]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#242424] text-[#E8873B] text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                        {item.id}
                      </span>
                      <div>
                        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono block">
                          {item.category}
                        </span>
                        <h4 className="text-sm md:text-base font-bold text-white">
                          {item.question}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => recordSummaryCatechismResult(item.id, !isMastered)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-all flex items-center gap-1 flex-shrink-0 ${
                        isMastered
                          ? 'bg-[#E8873B]/20 border-[#E8873B] text-[#E8873B]'
                          : 'bg-[#1E1E1E] border-[#303030] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Check size={12} />
                      <span>{isMastered ? 'Mastered' : 'Mark Learned'}</span>
                    </button>
                  </div>

                  <div className="mt-3 pl-8">
                    <p className="text-sm md:text-base text-slate-300 font-scripture leading-relaxed">
                      “{item.answer}”
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB F: READINESS AND REVIEW GUIDE */}
      {/* ========================================================================= */}
      {activeTab === 'readiness' && (
        <div className="space-y-8">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8873B]/10 text-[#E8873B] text-xs font-mono font-semibold">
              <ShieldCheck size={13} /> Appendix F
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
              Readiness and Review Guide
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
              A comprehensive checklist across 9 pastoral areas to ensure genuine readiness without anxiety or public interrogation.
            </p>
          </div>

          <div className="space-y-4">
            {APPENDIX_F_AREAS.map((area, idx) => {
              const checkData = state.readinessChecks[area.id] || { reviewed: false, notes: '' };

              return (
                <div
                  key={area.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    checkData.reviewed
                      ? 'bg-[#181818] border-[#E8873B]/40'
                      : 'bg-[#141414] border-[#242424]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleReadinessCheck(area.id)}
                        className="mt-0.5 text-slate-500 hover:text-white"
                      >
                        {checkData.reviewed ? (
                          <CheckCircle2 size={18} className="text-[#E8873B]" />
                        ) : (
                          <Circle size={18} />
                        )}
                      </button>

                      <div className="space-y-1">
                        <span className="text-xs font-mono text-[#E8873B] uppercase">
                          Area {idx + 1}: {area.area}
                        </span>
                        <p className="text-sm md:text-base text-slate-200 font-medium">
                          {area.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleReadinessCheck(area.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex-shrink-0 ${
                        checkData.reviewed
                          ? 'bg-[#E8873B]/20 border-[#E8873B] text-[#E8873B] font-semibold'
                          : 'bg-[#1E1E1E] border-[#303030] text-slate-400 hover:text-white'
                      }`}
                    >
                      {checkData.reviewed ? 'Reviewed' : 'Mark Reviewed'}
                    </button>
                  </div>

                  <div className="mt-3 pl-7">
                    <input
                      type="text"
                      value={checkData.notes || ''}
                      onChange={(e) => saveReadinessNotes(area.id, e.target.value)}
                      placeholder="Notes for discussion with sponsor, mentor or priest..."
                      className="w-full bg-[#181818] border border-[#282828] focus:border-[#E8873B] rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pastoral & Safeguarding Note */}
          <div className="p-5 rounded-2xl bg-[#181613] border border-[#E8873B]/30 space-y-2 text-xs md:text-sm text-amber-200/90">
            <div className="flex items-center gap-2 text-[#E8873B] font-bold font-display">
              <ShieldCheck size={16} />
              <span>Pastoral and Safeguarding Note</span>
            </div>
            <p className="leading-relaxed">{APPENDIX_F_SAFEGUARDING_NOTE}</p>
          </div>

          {/* Canonical Note */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#282828] space-y-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 uppercase tracking-wider block font-display">
              Canonical Note
            </span>
            <p className="leading-relaxed">{APPENDIX_F_CANONICAL_NOTE}</p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB SOURCES: SOURCES AND DOCTRINAL REFERENCES */}
      {/* ========================================================================= */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8873B]/10 text-[#E8873B] text-xs font-mono font-semibold">
              <Info size={13} /> Official Sources
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
              Sources and Doctrinal References
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
              Every lesson and question in this module is drawn faithfully from Sacred Scripture, the Magisterium of the Catholic Church, and liturgical books.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-1.5">
              <h4 className="text-sm font-bold text-[#E8873B] font-display">
                1. Sacred Scripture
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {DOCTRINAL_SOURCES.sacredScripture}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-1.5">
              <h4 className="text-sm font-bold text-[#E8873B] font-display">
                2. Catechism of the Catholic Church (CCC)
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {DOCTRINAL_SOURCES.ccc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-1.5">
              <h4 className="text-sm font-bold text-[#E8873B] font-display">
                3. Compendium of the Catechism of the Catholic Church
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {DOCTRINAL_SOURCES.compendium}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-1.5">
              <h4 className="text-sm font-bold text-[#E8873B] font-display">
                4. Code of Canon Law (CIC 1983)
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {DOCTRINAL_SOURCES.canonLaw}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-1.5">
              <h4 className="text-sm font-bold text-[#E8873B] font-display">
                5. Order of Confirmation
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {DOCTRINAL_SOURCES.orderOfConfirmation}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-1.5">
              <h4 className="text-sm font-bold text-[#E8873B] font-display">
                6. Historical Source: Joseph Deharbe, S.J.
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {DOCTRINAL_SOURCES.josephDeharbe}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#181613] border border-[#E8873B]/30 space-y-1.5 text-xs md:text-sm text-amber-200/90">
              <h4 className="text-sm font-bold text-[#E8873B] font-display">
                Doctrinal Standard & Diocesan Authority
              </h4>
              <p className="leading-relaxed">
                {DOCTRINAL_SOURCES.doctrinalStandard}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
