import React, { useState } from 'react';
import { Attorney, CaseReferral, ReferralProposal } from '../types/legal';
import { JURISDICTIONS_LIST, PRACTICE_AREAS_LIST } from '../data/mockLegalData';
import { SubmitProposalModal } from './SubmitProposalModal';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Scale, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  DollarSign, 
  ChevronRight, 
  ChevronDown, 
  Bookmark, 
  BookmarkCheck,
  Send, 
  Lock, 
  FileText, 
  PlusCircle,
  AlertTriangle,
  Building,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface ReferralExchangeProps {
  currentAttorney: Attorney;
  referrals: CaseReferral[];
  onOpenPostReferralModal: () => void;
  onOpenRule15Explainer: () => void;
  onSelectAttorneyDossier: (attorney: Attorney) => void;
  onOpenDirectMessage: (attorney: Attorney, referral?: CaseReferral) => void;
  onBookmarkReferral: (referralId: string) => void;
  bookmarkedReferralIds: string[];
  onSubmitProposal: (proposal: ReferralProposal) => void;
}

export const ReferralExchange: React.FC<ReferralExchangeProps> = ({
  currentAttorney,
  referrals,
  onOpenPostReferralModal,
  onOpenRule15Explainer,
  onSelectAttorneyDossier,
  onOpenDirectMessage,
  onBookmarkReferral,
  bookmarkedReferralIds,
  onSubmitProposal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('All Jurisdictions');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('All Practice Areas');
  const [selectedUrgency, setSelectedUrgency] = useState('All Urgencies');
  const [expandedReferralId, setExpandedReferralId] = useState<string | null>(referrals[0]?.id || null);
  const [activeProposalReferral, setActiveProposalReferral] = useState<CaseReferral | null>(null);

  const filteredReferrals = referrals.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courtForum.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.referringAttorney.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesJurisdiction =
      selectedJurisdiction === 'All Jurisdictions' || item.jurisdiction === selectedJurisdiction;

    const matchesArea =
      selectedPracticeArea === 'All Practice Areas' || item.practiceArea === selectedPracticeArea;

    const matchesUrgency =
      selectedUrgency === 'All Urgencies' || item.urgency === selectedUrgency;

    return matchesSearch && matchesJurisdiction && matchesArea && matchesUrgency;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Headline */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d162a] via-[#121f3d] to-[#0a1224] border border-[#243559] p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-full opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-[#1b2a4c] text-[#e5c07b] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                The Docket Exchange
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-mono">ABA Model Rule 1.5(e) Syndication</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Verified Case Referral & Co-Counsel Market
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Place matters with qualified local trial counsel and out-of-state specialists. All referral fee divisions adhere to ethical rules requiring joint responsibility and client consent.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenRule15Explainer}
              className="px-3.5 py-2 rounded-xl bg-[#14223f] hover:bg-[#1a2c52] text-xs font-medium text-[#c5a880] border border-[#2b3e67] transition-all flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Rule 1.5(e) Fee Guide
            </button>

            <button
              onClick={onOpenPostReferralModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs shadow-lg shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Refer a New Matter
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b1328] border border-[#203154] rounded-xl p-3.5 shadow-md space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case captions, jurisdictions, legal claims, court forums..."
              className="w-full pl-9 pr-4 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="px-3 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#d4af37]"
            >
              {JURISDICTIONS_LIST.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>

            <select
              value={selectedPracticeArea}
              onChange={(e) => setSelectedPracticeArea(e.target.value)}
              className="px-3 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#d4af37]"
            >
              {PRACTICE_AREAS_LIST.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>

            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="px-3 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#d4af37]"
            >
              <option value="All Urgencies">All Urgencies</option>
              <option value="Immediate (Within 48h)">Immediate (Within 48h)</option>
              <option value="Urgent (This Week)">Urgent (This Week)</option>
              <option value="Standard (30 Days)">Standard (30 Days)</option>
            </select>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-[#182643]">
          <span className="flex items-center gap-1.5">
            Showing <strong className="text-[#e5c07b] font-mono">{filteredReferrals.length}</strong> active referral matters
          </span>
          <span className="hidden sm:inline text-slate-500">
            All prospective co-counsel must clear ethical conflict screening prior to fee commitment
          </span>
        </div>
      </div>

      {/* Referrals Cards List */}
      <div className="space-y-4">
        {filteredReferrals.length === 0 ? (
          <div className="py-16 text-center bg-[#0b1328] border border-[#1c2b48] rounded-xl space-y-3">
            <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="font-serif text-slate-200 font-semibold">No Referrals Matched Criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your jurisdiction or practice area filters, or publish a new referral for your matters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedJurisdiction('All Jurisdictions');
                setSelectedPracticeArea('All Practice Areas');
                setSelectedUrgency('All Urgencies');
              }}
              className="px-3 py-1.5 text-xs bg-[#172648] text-[#e5c07b] rounded-lg border border-[#d4af37]/30"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredReferrals.map((referral) => {
            const isExpanded = expandedReferralId === referral.id;
            const isBookmarked = bookmarkedReferralIds.includes(referral.id);

            return (
              <div
                key={referral.id}
                className="bg-[#0b1328] border border-[#1e2f50] hover:border-[#2b416f] rounded-2xl shadow-lg transition-all overflow-hidden"
              >
                {/* Referral Summary Header */}
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    
                    {/* Referring Attorney Info */}
                    <div className="flex items-center gap-3">
                      <div 
                        onClick={() => onSelectAttorneyDossier(referral.referringAttorney)}
                        className="cursor-pointer group flex items-center gap-3"
                      >
                        <div className="relative">
                          <img
                            src={referral.referringAttorney.avatar}
                            alt={referral.referringAttorney.name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 text-black border border-[#0b1328]">
                            <ShieldCheck className="w-2.5 h-2.5" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-serif font-bold text-slate-100 group-hover:text-[#e5c07b] transition-colors">
                              {referral.referringAttorney.name}
                            </span>
                            <span className="text-[10px] bg-[#142340] text-[#e5c07b] px-1.5 py-0.2 rounded font-mono border border-[#d4af37]/20">
                              {referral.referringAttorney.barNumber}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {referral.referringAttorney.firm} • {referral.referringAttorney.barJurisdiction}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Terms & Badges */}
                    <div className="flex flex-wrap items-center gap-2 self-start">
                      <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-[#14223d] text-[#e5c07b] border border-[#d4af37]/30">
                        {referral.estimatedValue}
                      </span>

                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-[#11241f] text-emerald-300 border border-emerald-700/40 flex items-center gap-1">
                        <Scale className="w-3 h-3" />
                        {referral.referralFeePercent}% Rule 1.5(e) Split
                      </span>

                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        referral.urgency.includes('Immediate') 
                          ? 'bg-rose-950/70 text-rose-300 border border-rose-800/50' 
                          : 'bg-amber-950/50 text-amber-300 border border-amber-800/40'
                      }`}>
                        {referral.urgency}
                      </span>
                    </div>
                  </div>

                  {/* Caption & Title */}
                  <div className="mt-3.5">
                    <h3 className="font-serif text-lg font-bold text-slate-100 hover:text-[#e5c07b] transition-colors cursor-pointer"
                        onClick={() => setExpandedReferralId(isExpanded ? null : referral.id)}>
                      {referral.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Building className="w-3.5 h-3.5 text-[#c5a880]" />
                        {referral.courtForum}
                      </span>
                      <span>•</span>
                      <span className="bg-[#101b31] px-2 py-0.5 rounded text-slate-300 border border-[#1b2b4d]">
                        {referral.practiceArea}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {referral.createdAt}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                      {referral.summary}
                    </p>
                  </div>

                  {/* Expanded Matter Dossier */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#1c2c4d] space-y-4 animate-in fade-in">
                      
                      {/* Redacted Fact Pattern Box */}
                      <div className="bg-[#070c18] border border-[#203154] rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase font-bold tracking-wider text-[#e5c07b] flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-emerald-400" />
                            Confidential Fact Pattern (Rule 1.6 Privileged Redaction)
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Client Identifiers Masked
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {referral.factPatternRedacted}
                        </p>
                      </div>

                      {/* Procedural & Credential Requirements */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="bg-[#0e172e] p-3 rounded-xl border border-[#1f3156]">
                          <p className="text-slate-400 text-[11px] uppercase tracking-wide font-semibold mb-1">
                            Critical Court Deadlines
                          </p>
                          <p className="text-slate-200 font-medium">{referral.deadline}</p>
                          <p className="text-[10px] text-amber-400 mt-1">
                            Client Consent: {referral.clientConsentStatus}
                          </p>
                        </div>

                        <div className="bg-[#0e172e] p-3 rounded-xl border border-[#1f3156]">
                          <p className="text-slate-400 text-[11px] uppercase tracking-wide font-semibold mb-1">
                            Mandatory Bar Admissions
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {referral.requiredAdmissions.map((adm, i) => (
                              <span key={i} className="text-[10px] bg-[#17274a] text-slate-200 px-2 py-0.5 rounded border border-[#273d69]">
                                {adm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Proposals Submitted by Counsel */}
                      {referral.proposals && referral.proposals.length > 0 && (
                        <div className="mt-3 bg-[#0d162d] border border-[#1d2d4d] rounded-xl p-3">
                          <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Counsel Proposals Received ({referral.proposals.length})
                          </p>
                          <div className="space-y-2">
                            {referral.proposals.map((prop) => (
                              <div key={prop.id} className="bg-[#080e1c] p-2.5 rounded-lg border border-[#182743] flex items-start justify-between gap-3 text-xs">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-serif font-bold text-slate-100">{prop.attorney.name}</span>
                                    <span className="text-[10px] text-[#e5c07b] font-mono">{prop.attorney.barNumber}</span>
                                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                                      {prop.conflictCheckStatus}
                                    </span>
                                  </div>
                                  <p className="text-slate-300 text-[11px] mt-1 italic">
                                    "{prop.pitch}"
                                  </p>
                                </div>
                                <span className="text-[10px] text-slate-500 whitespace-nowrap">{prop.submittedAt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="mt-4 pt-3 border-t border-[#16233d] flex flex-wrap items-center justify-between gap-3">
                    
                    <button
                      onClick={() => setExpandedReferralId(isExpanded ? null : referral.id)}
                      className="text-xs text-[#c5a880] hover:text-[#e5c07b] flex items-center gap-1 font-medium transition-colors"
                    >
                      {isExpanded ? (
                        <>Collapse Matter Dossier <ChevronDown className="w-3.5 h-3.5 rotate-180" /></>
                      ) : (
                        <>Examine Redacted Brief & Requirements <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onBookmarkReferral(referral.id)}
                        title={isBookmarked ? 'Saved to Vault' : 'Save to Briefcase'}
                        className={`p-2 rounded-lg border text-xs transition-colors ${
                          isBookmarked 
                            ? 'bg-[#182a4c] border-[#d4af37] text-[#e5c07b]' 
                            : 'bg-[#0f1931] border-[#22355b] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onOpenDirectMessage(referral.referringAttorney, referral)}
                        className="px-3 py-1.5 rounded-lg bg-[#14223d] hover:bg-[#1b2d52] border border-[#24375f] text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3 h-3 text-[#c5a880]" />
                        Message Counsel
                      </button>

                      <button
                        onClick={() => setActiveProposalReferral(referral)}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        Pitch as Co-Counsel
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Submit Co-Counsel Proposal Modal */}
      {activeProposalReferral && (
        <SubmitProposalModal
          referral={activeProposalReferral}
          currentAttorney={currentAttorney}
          isOpen={!!activeProposalReferral}
          onClose={() => setActiveProposalReferral(null)}
          onSubmitProposal={(proposal) => {
            onSubmitProposal(proposal);
            setActiveProposalReferral(null);
          }}
        />
      )}
    </div>
  );
};
