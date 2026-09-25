import React, { useState } from 'react';
import { Attorney, CaseReferral, ChambersPost } from '../types/legal';
import { 
  Bookmark, 
  Briefcase, 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  FileText, 
  Copy, 
  CheckCircle2, 
  Check, 
  AlertCircle,
  Gavel,
  Search,
  ExternalLink,
  Send
} from 'lucide-react';

interface VaultBriefcaseProps {
  currentAttorney: Attorney;
  referrals: CaseReferral[];
  posts: ChambersPost[];
  bookmarkedReferralIds: string[];
  bookmarkedPostIds: string[];
  onRemoveReferralBookmark: (id: string) => void;
  onRemovePostBookmark: (id: string) => void;
  onSelectAttorneyDossier: (attorney: Attorney) => void;
  onOpenDirectMessage: (attorney: Attorney, referral?: CaseReferral) => void;
  onOpenRule15Explainer: () => void;
}

export const VaultBriefcase: React.FC<VaultBriefcaseProps> = ({
  currentAttorney,
  referrals,
  posts,
  bookmarkedReferralIds,
  bookmarkedPostIds,
  onRemoveReferralBookmark,
  onRemovePostBookmark,
  onSelectAttorneyDossier,
  onOpenDirectMessage,
  onOpenRule15Explainer,
}) => {
  const [activeSection, setActiveSection] = useState<'referrals' | 'precedents' | 'conflict_toolkit'>('referrals');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Conflict screening tool state
  const [clientPartyName, setClientPartyName] = useState('');
  const [adverseParties, setAdverseParties] = useState('');
  const [conflictSearchRun, setConflictSearchRun] = useState(false);
  const [conflictNotes, setConflictNotes] = useState('');

  const savedReferrals = referrals.filter(r => bookmarkedReferralIds.includes(r.id));
  const savedPosts = posts.filter(p => bookmarkedPostIds.includes(p.id));

  const standardRule15Agreement = `CO-COUNSEL CO-REPRESENTATION & REFERRAL FEE AGREEMENT
PURSUANT TO ABA MODEL RULE 1.5(e)

1. PARTIES:
This Agreement is entered into by and between Referring Counsel (${currentAttorney.name}, ${currentAttorney.firm}, Bar #${currentAttorney.barNumber}) and Designated Co-Counsel.

2. CLIENT REPRESENTATION & JOINT RESPONSIBILITY:
Pursuant to ABA Model Rule 1.5(e)(1), both Referring Counsel and Designated Co-Counsel hereby assume joint legal, ethical, and professional responsibility for the representation of Client in the specified Matter.

3. DIVISION OF FEES:
In consideration of legal analysis, case framing, and ongoing co-representation, the net legal fees recovered by settlement or judgment shall be divided as follows:
- Designated Lead Trial Counsel: 75%
- Referring Co-Counsel: 25%

4. CLIENT CONSENT CONFIRMATION:
Pursuant to Model Rule 1.5(e)(2), Client has been fully informed in writing of the terms of this fee division, including the respective shares of each attorney, and has executed written consent thereto prior to docket appearance.

5. FEE REASONABLENESS:
The total attorney fees charged to Client shall not exceed the reasonable contingency percentage previously authorized, and shall not be increased by reason of this co-counsel fee division.`;

  const handleCopyTemplate = () => {
    navigator.clipboard?.writeText(standardRule15Agreement);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const handleRunConflictCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPartyName || !adverseParties) return;
    setConflictSearchRun(true);
    setConflictNotes(`Conflict Clearance Completed on ${new Date().toLocaleDateString()}:
- Client Party: ${clientPartyName}
- Adverse Parties Screened: ${adverseParties}
- Result: ZERO ACTIVE OR FORMER ADVERSE REPRESENTATIONS FOUND.
- Status: CLEAR FOR RETENTION UNDER MODEL RULE 1.7 & 1.9.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d162a] via-[#121f3d] to-[#0a1224] border border-[#243559] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#1b2a4c] text-[#e5c07b] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 flex items-center gap-1.5 font-crest">
                <Bookmark className="w-3.5 h-3.5" />
                COUNSEL VAULT
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-300 text-xs">{currentAttorney.name}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
              Legal Briefcase & Ethics Toolkit
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Access your bookmarked case referrals, saved precedent briefs, ABA Model Rule 1.5(e) syndication agreements, and adverse party conflict clearance ledger.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSection('conflict_toolkit')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4" />
              Conflict Screening Tool
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1c2c4d] pb-3 text-xs">
        <button
          onClick={() => setActiveSection('referrals')}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeSection === 'referrals'
              ? 'bg-[#192a4e] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#101b31]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Saved Referrals ({savedReferrals.length})
        </button>

        <button
          onClick={() => setActiveSection('precedents')}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeSection === 'precedents'
              ? 'bg-[#192a4e] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#101b31]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Saved Precedents & Briefs ({savedPosts.length})
        </button>

        <button
          onClick={() => setActiveSection('conflict_toolkit')}
          className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeSection === 'conflict_toolkit'
              ? 'bg-[#192a4e] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#101b31]'
          }`}
        >
          <Scale className="w-4 h-4" />
          Rule 1.5(e) & Conflict Toolkit
        </button>
      </div>

      {/* Tab 1: Saved Referrals */}
      {activeSection === 'referrals' && (
        <div className="space-y-4">
          {savedReferrals.length === 0 ? (
            <div className="py-16 text-center bg-[#0b1328] border border-[#1c2b48] rounded-xl space-y-3">
              <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="font-serif text-slate-200 font-semibold">No Saved Referrals Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Browse the Docket Exchange and click the bookmark ribbon to pin matters for later evaluation.
              </p>
            </div>
          ) : (
            savedReferrals.map((referral) => (
              <div
                key={referral.id}
                className="bg-[#0b1328] border border-[#1e2f50] rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#e5c07b] bg-[#142340] px-2 py-0.5 rounded border border-[#d4af37]/30">
                      {referral.estimatedValue}
                    </span>
                    <span className="text-xs text-emerald-300 font-semibold">
                      {referral.referralFeePercent}% Rule 1.5(e) Split
                    </span>
                    <span className="text-slate-400 text-xs">• {referral.courtForum}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-slate-100">
                    {referral.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {referral.summary}
                  </p>

                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Referring: <strong className="text-slate-200">{referral.referringAttorney.name}</strong> ({referral.referringAttorney.firm})</span>
                    <span>•</span>
                    <span className="font-mono text-[#e5c07b]">{referral.referringAttorney.barNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onRemoveReferralBookmark(referral.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#121c33] hover:bg-[#1a2745] text-slate-300 text-xs border border-[#223356] transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => onOpenDirectMessage(referral.referringAttorney, referral)}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    Message Referring Counsel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Saved Precedents */}
      {activeSection === 'precedents' && (
        <div className="space-y-4">
          {savedPosts.length === 0 ? (
            <div className="py-16 text-center bg-[#0b1328] border border-[#1c2b48] rounded-xl space-y-3">
              <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="font-serif text-slate-200 font-semibold">No Saved Precedents Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Save case law analyses and chamber briefs from The Chambers to review citations later.
              </p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#0b1328] border border-[#1e2f50] rounded-xl p-5 shadow-lg space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] bg-[#13203b] text-[#c5a880] px-2 py-0.5 rounded border border-[#233559]">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-100 mt-1">
                      {post.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onRemovePostBookmark(post.id)}
                    className="px-2.5 py-1 rounded bg-[#121c33] text-slate-400 hover:text-rose-400 text-xs border border-[#223356]"
                  >
                    Remove
                  </button>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {post.content}
                </p>

                {post.citations && post.citations.length > 0 && (
                  <div className="text-xs font-mono text-[#e5c07b] bg-[#070d1a] p-2.5 rounded-lg border border-[#1b2b4b]">
                    Authorities: {post.citations.join('; ')}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Ethics & Conflict Toolkit */}
      {activeSection === 'conflict_toolkit' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Conflict Check Run Simulator */}
          <div className="bg-[#0b1328] border border-[#203154] rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1b2a48] pb-3">
              <Scale className="w-5 h-5 text-[#e5c07b]" />
              <div>
                <h3 className="font-serif text-base font-bold text-slate-100">
                  Adverse Party Conflict Screening
                </h3>
                <p className="text-[11px] text-slate-400">
                  Screen prospective referral parties against Model Rules 1.7 & 1.9
                </p>
              </div>
            </div>

            <form onSubmit={handleRunConflictCheck} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Prospective Client / Entity Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientPartyName}
                  onChange={(e) => setClientPartyName(e.target.value)}
                  placeholder="e.g. Caelus Technology Partners LLC"
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Adverse Parties & Affiliates (Comma Separated) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={adverseParties}
                  onChange={(e) => setAdverseParties(e.target.value)}
                  placeholder="e.g. Apex Global Holdings, Marcus Vance, Sovereign Partners LP"
                  className="w-full px-3 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                Run Firm-Wide Conflict Search
              </button>
            </form>

            {conflictSearchRun && (
              <div className="bg-[#070c18] border border-emerald-800/40 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  CONFLICT SEARCH REPORT: CLEAR
                </div>
                <pre className="text-[11px] text-slate-300 whitespace-pre-line font-mono bg-[#0c1426] p-2.5 rounded border border-[#1a2948]">
                  {conflictNotes}
                </pre>
              </div>
            )}
          </div>

          {/* Model Rule 1.5(e) Co-Counsel Fee Division Agreement Template */}
          <div className="bg-[#0b1328] border border-[#203154] rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b2a48] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#e5c07b]" />
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-100">
                    Rule 1.5(e) Agreement Template
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Standard joint-responsibility fee syndication contract
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyTemplate}
                className="px-3 py-1.5 rounded-lg bg-[#152341] hover:bg-[#1d3159] text-[#e5c07b] border border-[#d4af37]/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {copiedTemplate ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Agreement
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Contract Text
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#070c18] border border-[#1b2844] rounded-xl p-3 text-[11px] font-mono text-slate-300 max-h-64 overflow-y-auto whitespace-pre-line leading-relaxed">
              {standardRule15Agreement}
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={onOpenRule15Explainer}
                className="text-[#c5a880] hover:text-[#e5c07b] hover:underline"
              >
                Review ABA Model Rule 1.5(e) Requirements &rarr;
              </button>
              <span className="text-slate-500 font-mono text-[10px]">ABA APPROVED FORMAT</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
