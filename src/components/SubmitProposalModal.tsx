import React, { useState } from 'react';
import { Attorney, CaseReferral, ReferralProposal } from '../types/legal';
import { 
  Briefcase, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  AlertCircle,
  FileCheck2,
  Lock
} from 'lucide-react';

interface SubmitProposalModalProps {
  referral: CaseReferral | null;
  currentAttorney: Attorney;
  isOpen: boolean;
  onClose: () => void;
  onSubmitProposal: (proposal: ReferralProposal) => void;
}

export const SubmitProposalModal: React.FC<SubmitProposalModalProps> = ({
  referral,
  currentAttorney,
  isOpen,
  onClose,
  onSubmitProposal,
}) => {
  const [pitch, setPitch] = useState('');
  const [relevantMatters, setRelevantMatters] = useState('');
  const [conflictCleared, setConflictCleared] = useState(true);
  const [rule15Agreed, setRule15Agreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !referral) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch || !relevantMatters) return;

    const newProposal: ReferralProposal = {
      id: `prop-${Date.now()}`,
      referralId: referral.id,
      attorney: currentAttorney,
      pitch,
      relevantMatters,
      conflictCheckStatus: conflictCleared ? 'Clear - Zero Adverse Parties' : 'Pending Formal Run',
      rule15FeeSplitAgreed: rule15Agreed,
      submittedAt: 'Just now'
    };

    setSubmitted(true);
    setTimeout(() => {
      onSubmitProposal(newProposal);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#0b1328] border border-[#2b3e6b] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#111e3b] to-[#0c162d] p-5 border-b border-[#23355d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e5c07b]/10 border border-[#e5c07b]/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#e5c07b]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-100">
                Submit Co-Counsel Pitch
              </h3>
              <p className="text-xs text-slate-400">
                To: {referral.referringAttorney.name} ({referral.referringAttorney.firm})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a2745] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matter Summary Strip */}
        <div className="bg-[#0e1933] border-b border-[#1f2f53] px-5 py-3 text-xs">
          <p className="font-semibold text-slate-200">{referral.title}</p>
          <div className="flex items-center gap-3 mt-1 text-slate-400">
            <span>Forum: <strong className="text-slate-300">{referral.courtForum}</strong></span>
            <span>•</span>
            <span>Fee Split: <strong className="text-[#e5c07b]">{referral.referralFeePercent}% Rule 1.5(e)</strong></span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-slate-100">
                Co-Counsel Proposal Dispatched
              </h4>
              <p className="text-xs text-slate-400">
                Your credentials ({currentAttorney.barNumber}) and conflict clearance statement have been delivered to referring counsel.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Representative Matters & Forum Track Record *
                </label>
                <textarea
                  rows={2}
                  required
                  value={relevantMatters}
                  onChange={(e) => setRelevantMatters(e.target.value)}
                  placeholder="Detail your trial/motion experience in this specific court or practice area..."
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Pitch & Proposed Division of Responsibilities *
                </label>
                <textarea
                  rows={3}
                  required
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Explain why you or your firm are ideal co-counsel, your availability for expedited filings, and capacity..."
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Ethical Agreements */}
              <div className="bg-[#111c34] p-3.5 rounded-xl border border-[#23355a] space-y-2.5">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={conflictCleared}
                    onChange={(e) => setConflictCleared(e.target.checked)}
                    className="mt-0.5 rounded border-[#2c3d66] bg-[#0c1324] text-[#d4af37] focus:ring-0"
                  />
                  <span>
                    <strong className="text-slate-100">Conflict Clearance:</strong> I confirm our firm has run preliminary screening and has zero adverse representation conflicts with the stated parties.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rule15Agreed}
                    onChange={(e) => setRule15Agreed(e.target.checked)}
                    className="mt-0.5 rounded border-[#2c3d66] bg-[#0c1324] text-[#d4af37] focus:ring-0"
                  />
                  <span>
                    <strong className="text-slate-100">Rule 1.5(e) Split:</strong> I agree to the {referral.referralFeePercent}% co-counsel referral fee division, subject to client written consent and joint ethical responsibility.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[#2b3c63] text-slate-300 hover:bg-[#14203a] text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!conflictCleared || !rule15Agreed}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] disabled:opacity-50 text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
                >
                  <Briefcase className="w-4 h-4" />
                  Submit Official Pitch
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
