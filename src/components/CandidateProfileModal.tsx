import React, { useState } from 'react';
import {
  X,
  User,
  HeartHandshake,
  Church,
  Calendar,
  Sparkles,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { state, updateProfile, exportDataJSON, importDataJSON, resetAllProgress } = useProgress();

  const [formData, setFormData] = useState(state.profile);
  const [saveMessage, setSaveMessage] = useState(false);
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveMessage(true);
    setTimeout(() => {
      setSaveMessage(false);
      onClose();
    }, 1200);
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `confirmation_progress_${formData.name.toLowerCase().replace(/\s+/g, '_') || 'candidate'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        setImportError('');
        onClose();
      } else {
        setImportError('Invalid backup file. Please ensure it was exported from this app.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your preparation progress on this device?')) {
      resetAllProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-serif">
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded bg-[#161616] border border-[#2A2A2A]"
          aria-label="Close profile modal"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#E8873B]/10 border border-[#E8873B]/30 text-[#E8873B] flex items-center justify-center">
            <User size={18} />
          </div>
          <div>
            <span className="text-[#E8873B] uppercase tracking-[0.25em] text-xs font-serif small-caps block">
              Candidate Preparation
            </span>
            <h2 className="text-xl md:text-2xl font-serif italic text-white">
              Candidate Profile
            </h2>
          </div>
        </div>

        {saveMessage && (
          <div className="p-3 bg-[#E8873B]/10 border border-[#E8873B]/30 rounded text-xs text-[#E8873B] flex items-center gap-2">
            <CheckCircle2 size={15} />
            <span>Profile details successfully updated!</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Candidate Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Thomas Moore"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Parish / Church
              </label>
              <input
                type="text"
                value={formData.parishName}
                onChange={(e) => setFormData({ ...formData, parishName: e.target.value })}
                placeholder="e.g. St Barnabas Cathedral, Nottingham"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Confirmation Date
              </label>
              <input
                type="text"
                value={formData.confirmationDate}
                onChange={(e) => setFormData({ ...formData, confirmationDate: e.target.value })}
                placeholder="e.g. Pentecost Sunday 2026"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Sponsor / Mentor
              </label>
              <input
                type="text"
                value={formData.sponsor}
                onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                placeholder="e.g. Mary Harrison"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            {/* Requested module-specific field */}
            <div className="md:col-span-2">
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Priest / Deacon / Mentor <span className="text-slate-500 font-sans normal-case">(Guiding your preparation)</span>
              </label>
              <input
                type="text"
                value={formData.mentorOrPriest}
                onChange={(e) => setFormData({ ...formData, mentorOrPriest: e.target.value })}
                placeholder="e.g. Father John"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Why I chose my sponsor:
              </label>
              <textarea
                rows={2}
                value={formData.sponsorReason}
                onChange={(e) => setFormData({ ...formData, sponsorReason: e.target.value })}
                placeholder="e.g. For their faithful Catholic life, prayerfulness, and encouragement in living the Gospel..."
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Confirmation Name / Patron Saint
              </label>
              <input
                type="text"
                value={formData.patronSaint}
                onChange={(e) => setFormData({ ...formData, patronSaint: e.target.value })}
                placeholder="e.g. Saint Thérèse of Lisieux"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-slate-400 mb-1">
                Virtue I hope to imitate
              </label>
              <input
                type="text"
                value={formData.virtueToImitate}
                onChange={(e) => setFormData({ ...formData, virtueToImitate: e.target.value })}
                placeholder="e.g. Humility and trusting surrender to God"
                className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#E8873B] rounded px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none font-sans"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 rounded bg-[#E8873B] text-[#0F0F0F] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(232,135,59,0.3)] font-serif"
            >
              <Save size={14} />
              <span>Save Details</span>
            </button>
          </div>
        </form>

        {/* Data Backup & Restore */}
        <div className="pt-4 border-t border-[#222222] space-y-3 font-serif">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">
            Data Storage & Backup (Local to this device)
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#161616] hover:bg-[#1F1F1F] border border-[#2A2A2A] text-xs uppercase tracking-wider text-slate-300 transition-colors"
            >
              <Download size={13} className="text-[#E8873B]" />
              <span>Export Backup</span>
            </button>

            <label className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#161616] hover:bg-[#1F1F1F] border border-[#2A2A2A] text-xs uppercase tracking-wider text-slate-300 cursor-pointer transition-colors">
              <Upload size={13} className="text-[#E8873B]" />
              <span>Restore Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-rose-950/20 hover:bg-rose-900/30 border border-rose-900/40 text-xs uppercase tracking-wider text-rose-300 transition-colors ml-auto"
            >
              <RotateCcw size={13} />
              <span>Reset Progress</span>
            </button>
          </div>

          {importError && (
            <p className="text-xs text-rose-400 mt-1 font-sans">{importError}</p>
          )}
        </div>
      </div>
    </div>
  );
};
