import React from 'react';
import { X, Scale, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Download } from 'lucide-react';

interface Rule15ExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Rule15ExplainerModal: React.FC<Rule15ExplainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0b1328] border border-[#2b3e6b] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#111e3b] via-[#16274c] to-[#0c162d] p-5 border-b border-[#23355d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e5c07b]/10 border border-[#e5c07b]/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#e5c07b]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-100">
                ABA Model Rule 1.5(e) Compliance Protocol
              </h3>
              <p className="text-xs text-slate-400">
                Ethical division of legal fees between lawyers not in the same firm.
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

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-200 leading-relaxed">
          
          <div className="bg-[#080d1a] border border-[#1e2f50] rounded-xl p-4">
            <p className="font-mono text-[#e5c07b] text-xs font-semibold mb-2">
              TEXT OF ABA MODEL RULE 1.5(e):
            </p>
            <blockquote className="border-l-2 border-[#d4af37] pl-3 italic text-slate-300">
              "A division of a fee between lawyers who are not in the same firm may be made only if:
              <br />(1) the division is in proportion to the services performed by each lawyer or each lawyer assumes joint responsibility for the representation;
              <br />(2) the client agrees to the arrangement, including the share each lawyer will receive, and the agreement is confirmed in writing; and
              <br />(3) the total fee is reasonable."
            </blockquote>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-slate-100">
              The Three Core Pillars Enforced by LexGuild:
            </h4>

            <div className="bg-[#0e172e] p-3 rounded-xl border border-[#1f3054] space-y-1">
              <p className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                1. Joint Responsibility or Proportional Service
              </p>
              <p className="text-slate-300 text-[11px]">
                Both referring and receiving attorneys undertake joint ethical and malpractice responsibility for the client's matter under Model Rule 5.1.
              </p>
            </div>

            <div className="bg-[#0e172e] p-3 rounded-xl border border-[#1f3054] space-y-1">
              <p className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                2. Mandatory Written Client Disclosure & Consent
              </p>
              <p className="text-slate-300 text-[11px]">
                Prior to or at the time of co-counsel engagement, the client must be provided with written notice detailing the exact percentage split (e.g. 75% trial counsel / 25% referring counsel) and sign the acknowledgement.
              </p>
            </div>

            <div className="bg-[#0e172e] p-3 rounded-xl border border-[#1f3054] space-y-1">
              <p className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                3. Total Fee Reasonableness
              </p>
              <p className="text-slate-300 text-[11px]">
                The referral arrangement cannot inflate or increase the total contingency fee or hourly rate charged to the client.
              </p>
            </div>
          </div>

          {/* State Specific Notes */}
          <div className="bg-[#121c35] p-3.5 rounded-xl border border-[#233760] space-y-2">
            <h5 className="font-serif font-bold text-xs text-[#e5c07b]">
              Jurisdiction Nuances:
            </h5>
            <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
              <li><strong>California (CRPC 1.5.1):</strong> Requires written consent signed by the client explicitly disclosing the division of fees. Pure referral fees without joint responsibility are permitted if disclosed.</li>
              <li><strong>New York (Rule 1.5(g)):</strong> Referring counsel must write to the client confirming either joint responsibility or service proportion.</li>
              <li><strong>Texas (Rule 1.04(f)):</strong> Client must be advised and not object to participation of all attorneys.</li>
            </ul>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs tracking-wide shadow-md"
            >
              Acknowledged & Understood
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
