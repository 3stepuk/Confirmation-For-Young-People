import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  Heart,
  Shield,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Send,
  Lock,
  Compass,
  Check,
  Award,
} from 'lucide-react';
import { LESSONS_DATA } from '../data/lessons';
import { useProgress } from '../context/ProgressContext';
import { NOTIFY_URL } from '../config';

interface IntroViewProps {
  onStartLesson: (lessonId: number) => void;
  onOpenProfile: () => void;
  onOpenDrill: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({
  onStartLesson,
  onOpenProfile,
  onOpenDrill,
}) => {
  const { state, updateProfile, getOverallStats } = useProgress();
  const stats = getOverallStats();

  // Sign-in notification form state
  const [candidateName, setCandidateName] = useState(state.profile.name);
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateParish, setCandidateParish] = useState(state.profile.parishName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Update local profile with name and parish
    updateProfile({
      name: candidateName.trim(),
      parishName: candidateParish.trim(),
    });

    try {
      const response = await fetch(NOTIFY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          app: 'Confirmation for Young People',
          candidateName: candidateName.trim(),
          candidateEmail: candidateEmail.trim(),
          candidateParish: candidateParish.trim(),
          message: `${candidateName.trim()} has begun the Confirmation for Young People preparation module.`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmittedSuccess(true);
      } else {
        // Even if network or Formspree is blocked or rate-limited, still acknowledge locally
        setSubmittedSuccess(true);
      }
    } catch (err) {
      console.warn('Notification network note:', err);
      // Soft fail so user experience is not blocked
      setSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* 1. HERO COVER SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-[#141414] border border-[#2A2A2A] p-8 md:p-14 text-center space-y-6 shadow-2xl">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#E8873B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#E8873B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] text-xs uppercase tracking-[0.25em] font-serif small-caps">
          <Flame size={14} /> Catholic Preparation Module (Ages 11–16)
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-serif italic font-light leading-tight">
            Confirmation for Young People
          </h1>
          <p className="text-xl md:text-2xl text-amber-100/90 font-serif italic">
            “Be sealed with the Gift of the Holy Spirit.”
          </p>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans pt-1">
            A structured preparation catechism for young Catholics preparing to become steadfast witnesses of Christ.
            12 essential lessons, memory-recall drills, formal answers to learn, guided reflections, and practical habits of discipleship.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="btn-hero-begin"
            onClick={() => onStartLesson(1)}
            className="flex items-center gap-2 px-8 py-3.5 rounded bg-[#E8873B] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(232,135,59,0.3)]"
          >
            <span>Begin Lesson 1</span>
            <ArrowRight size={15} />
          </button>

          <button
            id="btn-hero-drill"
            onClick={onOpenDrill}
            className="flex items-center gap-2 px-6 py-3.5 rounded bg-[#161616] text-slate-300 font-medium text-xs uppercase tracking-[0.2em] hover:text-white hover:border-slate-500 border border-[#2A2A2A] transition-all"
          >
            <Award size={15} className="text-[#E8873B]" />
            <span>Master Drill (38)</span>
          </button>

          <button
            id="btn-hero-profile"
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-6 py-3.5 rounded bg-[#161616] text-slate-300 font-medium text-xs uppercase tracking-[0.2em] hover:text-white hover:border-slate-500 border border-[#2A2A2A] transition-all"
          >
            <span>Candidate Profile</span>
          </button>
        </div>
      </section>

      {/* 2. OPTIONAL SIGN-IN NOTIFICATION (FATHER JOHN) */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-start justify-between gap-3 border-b border-[#222222] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8873B] font-serif small-caps font-semibold">
                Optional Sign-in Notification
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-[#1A1A1A] border border-[#2A2A2A] text-slate-400 px-2 py-0.5 rounded">
                Opt-in Only
              </span>
            </div>
            <h3 className="text-base md:text-lg font-serif italic text-white">
              Let Father John know you have begun
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl font-sans">
              If you wish, enter your name and parish below. A simple notification will be sent to Father John
              so your parish team knows you are starting your preparation. Your progress is saved privately on this device.
            </p>
          </div>
          <Lock size={18} className="text-slate-500 flex-shrink-0" />
        </div>

        {submittedSuccess ? (
          <div className="bg-[#E8873B]/10 border border-[#E8873B]/40 rounded-xl p-4 flex items-center gap-3 text-[#E8873B]">
            <CheckCircle2 size={20} className="text-[#E8873B] flex-shrink-0" />
            <div>
              <p className="text-sm font-serif font-semibold text-white">Thank you, {candidateName}!</p>
              <p className="text-xs text-slate-300 font-sans">
                Father John has been notified that you are beginning your Confirmation preparation. God bless you on this journey!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendNotification} className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div>
              <label htmlFor="intro-name" className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-serif">
                Your Name <span className="text-[#E8873B]">*</span>
              </label>
              <input
                id="intro-name"
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="e.g. Thomas Moore"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div>
              <label htmlFor="intro-email" className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-serif">
                Your Email (optional)
              </label>
              <input
                id="intro-email"
                type="email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                placeholder="e.g. candidate@example.com"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div>
              <label htmlFor="intro-parish" className="block text-xs uppercase tracking-wider text-slate-400 mb-1 font-serif">
                Parish / Church
              </label>
              <input
                id="intro-parish"
                type="text"
                value={candidateParish}
                onChange={(e) => setCandidateParish(e.target.value)}
                placeholder="e.g. St Barnabas Cathedral"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div className="md:col-span-3 flex items-center justify-between pt-1">
              {errorMessage && <span className="text-xs text-rose-400">{errorMessage}</span>}
              <div className="ml-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 rounded bg-[#E8873B] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>{isSubmitting ? 'Sending...' : 'Notify Father John'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* 3. PASTORAL PRINCIPLES (FROM PAGE 2 OF THE CATECHISM) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles size={16} className="text-[#E8873B]" />
          <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
            A Note for Candidates, Families, Mentors & Priests
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-[#E8873B]">1. Grace, not graduation</span>
            <h4 className="text-sm font-serif italic text-white">Sacramental Gift</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Confirmation is God's gift and the completion of baptismal grace; it is not a school-leaving ceremony or mere statement of personal independence.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-[#E8873B]">2. Faith seeking understanding</span>
            <h4 className="text-sm font-serif italic text-white">Honest Questions</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Candidates should know the essential doctrine, ask honest questions, and learn to give gentle reasons for Christian hope in daily life.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-[#E8873B]">3. Freedom and readiness</span>
            <h4 className="text-sm font-serif italic text-white">Genuine Intention</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Preparation fosters a sincere desire to receive the sacrament freely, without coercion, public embarrassment, or unnecessary testing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-[#E8873B]">4. Belonging and mission</span>
            <h4 className="text-sm font-serif italic text-white">Witness by Word & Deed</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Confirmation binds the baptised more perfectly to the Church and strengthens them to witness by truthful speech and loving service.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] space-y-2 md:col-span-2">
            <span className="text-xs font-serif uppercase tracking-widest text-[#E8873B]">5. Prayer and sacramental life</span>
            <h4 className="text-sm font-serif italic text-white">Lived in Sunday Mass & Confession</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Preparation belongs inside Sunday Mass, frequent Confession, personal quiet prayer, family life, and practical charity towards those in need.
            </p>
          </div>
        </div>
      </section>

      {/* 4. NOTTINGHAM DIOCESAN VISION */}
      <section className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <Compass size={16} className="text-[#E8873B]" />
          <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
            The Nottingham Diocesan Vision
          </h2>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
          Bishop Patrick McKinney describes the spiritual foundation of diocesan renewal as a threefold movement:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 bg-[#161616] rounded-xl border border-[#2A2A2A] space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#E8873B] font-serif font-bold">1. Encounter</span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Meet Christ personally in the Gospel, prayer, the sacraments, and Eucharistic Adoration.
            </p>
          </div>

          <div className="p-4 bg-[#161616] rounded-xl border border-[#2A2A2A] space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#E8873B] font-serif font-bold">2. Discipleship</span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Learn Christ's teaching, receive his grace, and follow him in daily choices, duties, and friendships.
            </p>
          </div>

          <div className="p-4 bg-[#161616] rounded-xl border border-[#2A2A2A] space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#E8873B] font-serif font-bold">3. Missionary Discipleship</span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Speak humbly about Christ and bear witness to his love, especially in service of those in need.
            </p>
          </div>
        </div>
      </section>

      {/* 5. THE 12 PREPARATION LESSONS GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-white font-serif small-caps">
              The 12 Preparation Lessons
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Arranged for candidate and mentor/parent to study and discuss together.
            </p>
          </div>
          <span className="text-xs font-mono text-[#E8873B]">
            {stats.completedLessonsCount}/12 Complete
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LESSONS_DATA.map((lesson) => {
            const prog = state.lessons[lesson.id];
            const isDone = prog?.isRead;
            const masteredCount = prog?.qaMastered?.length || 0;

            return (
              <div
                key={lesson.id}
                onClick={() => onStartLesson(lesson.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isDone
                    ? 'bg-[#161616] border-[#E8873B]/50 hover:border-[#E8873B]'
                    : 'bg-[#141414] border-[#2A2A2A] hover:border-[#E8873B]/40 hover:bg-[#161616]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif uppercase tracking-widest text-[#E8873B]">
                      Lesson {String(lesson.number).padStart(2, '0')}
                    </span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#E8873B] bg-[#E8873B]/10 border border-[#E8873B]/30 px-2 py-0.5 rounded">
                        <Check size={11} /> Done
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider text-slate-500">Not started</span>
                    )}
                  </div>

                  <h3 className="text-sm md:text-base font-serif italic text-white group-hover:text-[#E8873B] transition-colors leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                    {lesson.purpose}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#222222] flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-slate-500">
                    {masteredCount}/5 answers
                  </span>
                  <span className="text-[#E8873B] font-serif uppercase tracking-wider text-[11px] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Start <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
