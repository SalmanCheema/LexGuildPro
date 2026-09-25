import React, { useState } from 'react';
import { Attorney, CaseReferral, Jurisdiction, PracticeArea } from '../types/legal';
import { JURISDICTIONS_LIST, PRACTICE_AREAS_LIST } from '../data/mockLegalData';
import { 
  Briefcase, 
  X, 
  Scale, 
  ShieldCheck, 
  AlertCircle, 
  FileCheck2, 
  Sparkles,
  DollarSign,
  Clock
} from 'lucide-react';

interface PostReferralModalProps {
  currentAttorney: Attorney;
  isOpen: boolean;
  onClose: () => void;
  onAddReferral: (newReferral: CaseReferral) => void;
}

export const PostReferralModal: React.FC<PostReferralModalProps> = ({
  currentAttorney,
  isOpen,
  onClose,
  onAddReferral,
}) => {
  const [title, setTitle] = useState('');
  const [practiceArea, setPracticeArea] = useState<PracticeArea>('Commercial & Chancery Litigation');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('Delaware (Chancery & Supreme)');
  const [courtForum, setCourtForum] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('$5,000,000+ Claim');
  const [referralFeePercent, setReferralFeePercent] = useState<number>(25);
  const [urgency, setUrgency] = useState<'Immediate (Within 48h)' | 'Urgent (This Week)' | 'Standard (30 Days)'>('Urgent (This Week)');
  const [summary, setSummary] = useState('');
  const [factPatternRedacted, setFactPatternRedacted] = useState('');
  const [deadline, setDeadline] = useState('Responsive pleading due in 20 days');
  const [requiredAdmission, setRequiredAdmission] = useState('Delaware Bar & Chancery Court Admitted');
  const [clientConsentObtained, setClientConsentObtained] = useState(true);
  const [redactionVerified, setRedactionVerified] = useState(true);

  if (!isOpen) return null;

  const handleFillSample = () => {
    setTitle('Antitrust Direct Purchaser Sherman Act § 1 Price-Fixing Action');
    setPracticeArea('Antitrust & Competition');
    setJurisdiction('Illinois (NDIL / 7th Cir)');
    setCourtForum('U.S. District Court, Northern District of Illinois (Chicago)');
    setEstimatedValue('$40,000,000+ Market Overcharge');
    setReferralFeePercent(25);
    setUrgency('Immediate (Within 48h)');
    setSummary('Direct enterprise buyers of agricultural inputs alleging coordinated price fixing via benchmark algorithms. Seeking local 7th Circuit antitrust trial boutique for co-lead role.');
    setFactPatternRedacted('Subpoenaed emails demonstrate concurrent 18% price hikes following executive summits. Client willing to serve as putative class representative. Multi-District Litigation (MDL) transfer petition pending.');
    setDeadline('Consolidated Complaint due in 30 days');
    setRequiredAdmission('Illinois Bar, 7th Circuit / NDIL Trial Bar, Complex MDL Experience');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !courtForum || !summary) return;

    const newReferral: CaseReferral = {
      id: `ref-${Date.now()}`,
      title,
      practiceArea,
      jurisdiction,
      courtForum,
      estimatedValue,
      referralFeePercent,
      rule15Compliant: true,
      clientConsentStatus: clientConsentObtained ? 'Obtained' : 'Ready upon Co-Counsel Match',
      summary,
      factPatternRedacted: factPatternRedacted || summary,
      deadline,
      conflictsCleared: true,
      status: 'Open',
      referringAttorney: currentAttorney,
      proposalsCount: 0,
      urgency,
      createdAt: 'Just now',
      requiredAdmissions: requiredAdmission.split(',').map(s => s.trim()),
      proposals: []
    };

    onAddReferral(newReferral);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0b1328] border border-[#2b3e6b] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#111e3b] via-[#17274c] to-[#0c162d] p-5 border-b border-[#23355d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#e5c07b]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-slate-100">
                  Post Case Referral / Co-Counsel Syndication
                </h3>
                <span className="bg-[#1c2c4e] text-[#e5c07b] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#d4af37]/30">
                  RULE 1.5(e) COMPLIANT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Referring Counsel: {currentAttorney.name} • {currentAttorney.barNumber}
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

        {/* Form Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Quick populate helper */}
          <div className="flex items-center justify-between bg-[#121e3b] border border-[#22355e] p-2.5 rounded-xl mb-4">
            <span className="text-xs text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#e5c07b]" />
              Need a quick demonstration matter template?
            </span>
            <button
              type="button"
              onClick={handleFillSample}
              className="text-xs px-2.5 py-1 bg-[#1a2c52] hover:bg-[#233b6e] text-[#e5c07b] rounded border border-[#d4af37]/30 font-medium"
            >
              Fill Sample Case
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Matter Title / Case Caption Description *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. S.D.N.Y. Securities Class Action Lead Counsel Referral"
                className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Practice Area *
                </label>
                <select
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value as PracticeArea)}
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                >
                  {PRACTICE_AREAS_LIST.filter(a => a !== 'All Practice Areas').map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Jurisdiction *
                </label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                >
                  {JURISDICTIONS_LIST.filter(j => j !== 'All Jurisdictions').map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Court / Arbitration Forum *
                </label>
                <input
                  type="text"
                  required
                  value={courtForum}
                  onChange={(e) => setCourtForum(e.target.value)}
                  placeholder="e.g. Delaware Court of Chancery (Wilmington)"
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Estimated Claim / Transaction Value *
                </label>
                <input
                  type="text"
                  required
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  placeholder="e.g. $10,000,000+ or $3,500,000 Claim"
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Proposed Referral / Co-Counsel Fee Split
                </label>
                <div className="flex items-center gap-2">
                  {[20, 25, 33.3, 40].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setReferralFeePercent(pct)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        referralFeePercent === pct
                          ? 'bg-[#1b2b4a] border-[#d4af37] text-[#e5c07b]'
                          : 'bg-[#0b1328] border-[#223356] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Subject to client written disclosure and approval under ABA Model Rule 1.5(e).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Urgency / Match Timeline
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Immediate (Within 48h)">Immediate (Within 48h)</option>
                  <option value="Urgent (This Week)">Urgent (This Week)</option>
                  <option value="Standard (30 Days)">Standard (30 Days)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Public Matter Overview (Keep General) *
              </label>
              <textarea
                rows={2}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="High-level description of dispute, posture, and co-counsel profile sought..."
                className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Redacted Fact Pattern (Client Identifiers Scrubbed) *
              </label>
              <textarea
                rows={3}
                required
                value={factPatternRedacted}
                onChange={(e) => setFactPatternRedacted(e.target.value)}
                placeholder="Provide sufficient procedural posture and claims without compromising privileged client work product..."
                className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Upcoming Deadline / Statute of Limitations
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. Preliminary Injunction hearing set for Oct 14"
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Required Bar Admissions / Credentials
                </label>
                <input
                  type="text"
                  value={requiredAdmission}
                  onChange={(e) => setRequiredAdmission(e.target.value)}
                  placeholder="e.g. Delaware Bar Member, Court of Chancery Lead"
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Ethics & Redaction confirmation */}
            <div className="bg-[#101b34] p-3.5 rounded-xl border border-[#22345a] space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={redactionVerified}
                  onChange={(e) => setRedactionVerified(e.target.checked)}
                  className="mt-0.5 rounded border-[#2c3d66] bg-[#0c1324] text-[#d4af37] focus:ring-0"
                />
                <span>
                  <strong className="text-slate-100">Privilege & Redaction:</strong> I certify that all specific party names, confidential trade secrets, and privileged communications have been redacted or generalized in compliance with Model Rule 1.6.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={clientConsentObtained}
                  onChange={(e) => setClientConsentObtained(e.target.checked)}
                  className="mt-0.5 rounded border-[#2c3d66] bg-[#0c1324] text-[#d4af37] focus:ring-0"
                />
                <span>
                  <strong className="text-slate-100">Client Consent Protocol:</strong> Client has been advised and will execute written agreement consenting to the co-counsel fee split prior to representation commencement.
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
                disabled={!redactionVerified || !clientConsentObtained || !title}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] disabled:opacity-50 text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
              >
                <Briefcase className="w-4 h-4" />
                Publish Matter to Exchange
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
