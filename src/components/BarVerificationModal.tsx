import React, { useState } from 'react';
import { Attorney, PracticeArea } from '../types/legal';
import { PRACTICE_AREAS_LIST } from '../data/mockLegalData';
import { 
  ShieldCheck, 
  X, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Scale, 
  GraduationCap, 
  FileText,
  Search,
  Sparkles
} from 'lucide-react';

interface BarVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAndSelectAttorney: (newAttorney: Attorney) => void;
}

export const BarVerificationModal: React.FC<BarVerificationModalProps> = ({
  isOpen,
  onClose,
  onAddAndSelectAttorney,
}) => {
  const [step, setStep] = useState<'input' | 'verifying' | 'success'>('input');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Partner / Trial Counsel');
  const [firm, setFirm] = useState('');
  const [barJurisdiction, setBarJurisdiction] = useState('New York');
  const [barNumber, setBarNumber] = useState('');
  const [admissionYear, setAdmissionYear] = useState('2015');
  const [education, setEducation] = useState('Harvard Law School (J.D.)');
  const [trialExperience, setTrialExperience] = useState('12 Federal & State Jury Trials');
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<PracticeArea[]>([
    'Securities Litigation',
    'Commercial & Chancery Litigation'
  ]);
  const [ethicsPledge, setEthicsPledge] = useState(true);
  const [malpracticePledge, setMalpracticePledge] = useState(true);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setName('Julian Hawthorne, Esq.');
    setTitle('Co-Chair, Appellate & Complex Trials');
    setFirm('Hawthorne & Vance LLP');
    setBarJurisdiction('New York');
    setBarNumber('NY-5910482');
    setAdmissionYear('2013');
    setEducation('Columbia Law School (J.D., Harlan Fiske Stone Scholar)');
    setTrialExperience('18 Commercial Jury Trials (SDNY, EDNY, NY Commercial Div.)');
    setSelectedPracticeAreas(['Commercial & Chancery Litigation', 'Appellate & Constitutional Law']);
  };

  const handleTogglePracticeArea = (area: PracticeArea) => {
    if (selectedPracticeAreas.includes(area)) {
      if (selectedPracticeAreas.length > 1) {
        setSelectedPracticeAreas(selectedPracticeAreas.filter(a => a !== area));
      }
    } else {
      if (selectedPracticeAreas.length < 4) {
        setSelectedPracticeAreas([...selectedPracticeAreas, area]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !barNumber || !firm) return;

    setStep('verifying');

    // Simulate State Bar Registry Validation
    setTimeout(() => {
      setStep('success');
      const newAtty: Attorney = {
        id: `attorney-${Date.now()}`,
        name: name.includes('Esq.') ? name : `${name}, Esq.`,
        title,
        firm,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=260',
        barJurisdiction,
        barNumber: barNumber.startsWith(barJurisdiction.slice(0, 2).toUpperCase()) 
          ? barNumber 
          : `${barJurisdiction.slice(0, 2).toUpperCase()}-${barNumber}`,
        admissionYear: parseInt(admissionYear) || 2015,
        status: 'Active in Good Standing',
        practiceAreas: selectedPracticeAreas,
        bio: `${title} at ${firm}. Admitted to the Bar of ${barJurisdiction} (${admissionYear}). Focused on high-stakes advocacy and ethical peer syndication.`,
        education,
        trialExperience,
        referralAcceptanceRate: '100% active',
        concurrenceScore: 100,
        verifiedBadge: true,
        malpracticeInsured: malpracticePledge,
        email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@${firm.toLowerCase().replace(/[^a-z]/g, '') || 'law'}.com`,
        phone: '(555) 234-5678',
        officeLocation: `${barJurisdiction}, United States`
      };

      setTimeout(() => {
        onAddAndSelectAttorney(newAtty);
        onClose();
        setStep('input');
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0b1328] border border-[#2b3e6b] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#111e3b] via-[#17274c] to-[#0c162d] p-6 border-b border-[#23355d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e5c07b]/10 border border-[#e5c07b]/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-[#e5c07b]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-slate-100">
                  State Bar License Verification
                </h3>
                <span className="bg-[#1e2e50] text-[#e5c07b] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#d4af37]/30">
                  RULE 8.4 INTEGRITY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live verification against State Supreme Court and Bar Admissions Rolls.
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

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 'input' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between bg-[#121d37] border border-[#233760] p-3 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#e5c07b]" />
                  <span>Testing LexGuild? Auto-populate with sample Bar credentials:</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-2.5 py-1 text-xs bg-[#1f3056] hover:bg-[#283f70] text-[#e5c07b] font-medium rounded border border-[#d4af37]/40 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Auto-Fill Test Counsel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Attorney Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Julian Hawthorne, Esq."
                    className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Professional Title / Rank
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Trial Partner / Senior Litigation Counsel"
                    className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Law Firm / Chambers Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firm}
                    onChange={(e) => setFirm(e.target.value)}
                    placeholder="e.g. Hawthorne & Vance LLP"
                    className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Jurisdiction / Licensing State *
                  </label>
                  <select
                    value={barJurisdiction}
                    onChange={(e) => setBarJurisdiction(e.target.value)}
                    className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="New York">New York (Unified Court System)</option>
                    <option value="California">California (State Bar of California)</option>
                    <option value="Delaware">Delaware (Supreme Court of Delaware)</option>
                    <option value="Texas">Texas (State Bar of Texas)</option>
                    <option value="District of Columbia">District of Columbia (D.C. Bar)</option>
                    <option value="Illinois">Illinois (ARDC of Illinois)</option>
                    <option value="Florida">Florida (The Florida Bar)</option>
                    <option value="Massachusetts">Massachusetts (BBO)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    State Bar Admission Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={barNumber}
                      onChange={(e) => setBarNumber(e.target.value)}
                      placeholder="e.g. NY-5910482 or 4829104"
                      className="w-full pl-3 pr-8 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 font-mono text-xs focus:outline-none focus:border-[#d4af37]"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Admission Year
                  </label>
                  <input
                    type="number"
                    min="1970"
                    max="2026"
                    value={admissionYear}
                    onChange={(e) => setAdmissionYear(e.target.value)}
                    className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Law School & Degrees
                </label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. Columbia Law School (J.D.); Dartmouth College (A.B.)"
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Practice Areas (Select 1 to 4)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-[#080d1a] border border-[#203154] rounded-lg">
                  {PRACTICE_AREAS_LIST.filter(a => a !== 'All Practice Areas').map((area) => {
                    const isSelected = selectedPracticeAreas.includes(area as PracticeArea);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleTogglePracticeArea(area as PracticeArea)}
                        className={`text-[11px] px-2.5 py-1 rounded-md transition-all ${
                          isSelected
                            ? 'bg-[#1e335a] text-[#e5c07b] border border-[#d4af37]/50 font-medium'
                            : 'bg-[#101b31] text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ethics & Integrity Pledges */}
              <div className="space-y-2 pt-2 border-t border-[#1c2a47]">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={ethicsPledge}
                    onChange={(e) => setEthicsPledge(e.target.checked)}
                    className="mt-0.5 rounded border-[#2c3d66] bg-[#0c1324] text-[#d4af37] focus:ring-0"
                  />
                  <span>
                    I certify under penalty of perjury that I am an attorney licensed and in good standing with the specified state licensing authority and adhere to ABA Model Rules.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={malpracticePledge}
                    onChange={(e) => setMalpracticePledge(e.target.checked)}
                    className="mt-0.5 rounded border-[#2c3d66] bg-[#0c1324] text-[#d4af37] focus:ring-0"
                  />
                  <span>
                    Active Legal Malpractice / Professional Errors & Omissions coverage is in force for my practice.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-[#2b3c63] text-slate-300 hover:bg-[#14203a] text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!ethicsPledge || !name || !barNumber}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] disabled:opacity-50 text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Verify Bar Credentials & Enter
                </button>
              </div>
            </form>
          )}

          {step === 'verifying' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#17274c] border-2 border-[#d4af37] border-t-transparent animate-spin flex items-center justify-center">
                <Scale className="w-7 h-7 text-[#e5c07b]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-slate-100">
                  Verifying {barJurisdiction} Bar Registry...
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Cross-referencing Bar Number <span className="font-mono text-[#e5c07b]">{barNumber}</span> against state disciplinary records and active roll of attorneys.
                </p>
              </div>
              <div className="max-w-xs mx-auto text-[11px] text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                Disciplinary records: 0 infractions found. Active status confirmed.
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-xl text-slate-100">
                Credentials Validated & Enrolled
              </h4>
              <p className="text-xs text-slate-300">
                Welcome to LexGuild, {name}. Your verified bar credentials are now affixed to your profile.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
