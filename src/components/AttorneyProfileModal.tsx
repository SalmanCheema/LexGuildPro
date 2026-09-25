import React from 'react';
import { Attorney } from '../types/legal';
import { 
  ShieldCheck, 
  X, 
  Award, 
  Building2, 
  MapPin, 
  GraduationCap, 
  Scale, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Send,
  FileText,
  Gavel,
  Briefcase
} from 'lucide-react';

interface AttorneyProfileModalProps {
  attorney: Attorney | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDirectMessage: (attorney: Attorney) => void;
  onOpenPostReferralForAttorney?: (attorney: Attorney) => void;
}

export const AttorneyProfileModal: React.FC<AttorneyProfileModalProps> = ({
  attorney,
  isOpen,
  onClose,
  onOpenDirectMessage,
}) => {
  if (!isOpen || !attorney) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0b1328] border border-[#2b3e6b] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Cover Banner */}
        <div className="h-28 bg-gradient-to-r from-[#0d1833] via-[#14264d] to-[#0a1226] border-b border-[#22355b] relative p-4 flex items-start justify-between">
          <div className="flex items-center gap-2 text-xs font-crest text-[#e5c07b]">
            <Scale className="w-4 h-4" />
            <span>BAR DOSSIER & VERIFIED CREDENTIALS</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-black/40 hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="p-6 relative -mt-12 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Avatar and Basic Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-3.5">
              <div className="relative">
                <img
                  src={attorney.avatar}
                  alt={attorney.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 text-black border-2 border-[#0b1328]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl font-bold text-slate-100">
                    {attorney.name}
                  </h2>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-full font-mono">
                    Active Good Standing
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium">{attorney.title}</p>
                <p className="text-xs text-slate-400">{attorney.firm} • {attorney.officeLocation}</p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenDirectMessage(attorney);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              Message Counsel Privileged
            </button>
          </div>

          {/* Official Bar Verification Ledger */}
          <div className="bg-[#070c18] border border-[#1f2e4d] rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#172540] pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#e5c07b] flex items-center gap-1.5 font-crest">
                <Award className="w-4 h-4 text-[#e5c07b]" />
                Supreme Court Bar Admissions Record
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                0 Disciplinary Infractions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#0b1328] p-2.5 rounded-lg border border-[#1b2844]">
                <p className="text-slate-400 text-[10px] uppercase font-semibold">State Bar License</p>
                <p className="font-mono text-[#e5c07b] font-bold text-sm mt-0.5">{attorney.barNumber}</p>
              </div>

              <div className="bg-[#0b1328] p-2.5 rounded-lg border border-[#1b2844]">
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Jurisdiction & Year</p>
                <p className="text-slate-100 font-medium text-xs mt-0.5">{attorney.barJurisdiction} ({attorney.admissionYear})</p>
              </div>

              <div className="bg-[#0b1328] p-2.5 rounded-lg border border-[#1b2844]">
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Peer Concurrence Index</p>
                <p className="text-[#e5c07b] font-bold font-mono text-sm mt-0.5">{attorney.concurrenceScore} pts</p>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Primary Practice Areas & Specializations
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {attorney.practiceAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#111e3b] text-[#e5c07b] px-3 py-1 rounded-lg border border-[#243a68] font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Trial Experience & Record */}
          <div className="bg-[#0e172e] border border-[#1f2f53] rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Gavel className="w-3.5 h-3.5 text-[#c5a880]" />
              Trial & Appellate Record
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {attorney.trialExperience}
            </p>
            <p className="text-[11px] text-slate-400 italic">
              Education: {attorney.education}
            </p>
          </div>

          {/* Bio Overview */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Professional Background
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {attorney.bio}
            </p>
          </div>

          {/* Ethical Referral Standards */}
          <div className="bg-[#070c18] border border-[#182641] rounded-xl p-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#e5c07b]" />
              Standard Rule 1.5(e) fee split agreements accepted with client written concurrence.
            </span>
            <span className="text-emerald-400 font-mono text-[10px]">E&O INSURED</span>
          </div>

        </div>

      </div>
    </div>
  );
};
