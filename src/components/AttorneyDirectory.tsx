import React, { useState } from 'react';
import { Attorney, PracticeArea } from '../types/legal';
import { JURISDICTIONS_LIST, PRACTICE_AREAS_LIST } from '../data/mockLegalData';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Award, 
  Scale, 
  Briefcase, 
  Mail, 
  Building2, 
  MapPin, 
  GraduationCap, 
  CheckCircle2,
  Lock,
  Send,
  Sparkles
} from 'lucide-react';

interface AttorneyDirectoryProps {
  attorneys: Attorney[];
  currentAttorney: Attorney;
  onSelectAttorneyDossier: (attorney: Attorney) => void;
  onOpenDirectMessage: (attorney: Attorney) => void;
  onOpenVerifyModal: () => void;
}

export const AttorneyDirectory: React.FC<AttorneyDirectoryProps> = ({
  attorneys,
  currentAttorney,
  onSelectAttorneyDossier,
  onOpenDirectMessage,
  onOpenVerifyModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('All');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('All Practice Areas');

  const filteredAttorneys = attorneys.filter((atty) => {
    const matchesSearch =
      atty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atty.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atty.barNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atty.officeLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atty.education.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesJurisdiction =
      selectedJurisdiction === 'All' ||
      atty.barJurisdiction.toLowerCase().includes(selectedJurisdiction.toLowerCase());

    const matchesArea =
      selectedPracticeArea === 'All Practice Areas' ||
      atty.practiceAreas.includes(selectedPracticeArea as PracticeArea);

    return matchesSearch && matchesJurisdiction && matchesArea;
  });

  return (
    <div className="space-y-6">
      
      {/* Directory Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d162a] via-[#121f3d] to-[#0a1224] border border-[#243559] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#1b2a4c] text-[#e5c07b] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 flex items-center gap-1.5 font-crest">
                <Users className="w-3.5 h-3.5" />
                ROLL OF ATTORNEYS
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-emerald-400 text-xs font-mono">100% Bar Credentials Validated</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
              Verified Legal Counsel Roster
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Locate trusted co-counsel, local trial leads, and practice area specialists across all 50 state bars and federal circuits.
            </p>
          </div>

          <button
            onClick={onOpenVerifyModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Award className="w-4 h-4" />
            Enroll Another Bar Member
          </button>
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
              placeholder="Search by attorney name, law firm, Bar #, or law school..."
              className="w-full pl-9 pr-4 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="px-3 py-2 bg-[#080d1a] border border-[#1e2e4e] rounded-lg text-slate-200 text-xs focus:outline-none focus:border-[#d4af37]"
            >
              <option value="All">All State Bars</option>
              <option value="New York">New York Bar</option>
              <option value="California">California Bar</option>
              <option value="Delaware">Delaware Bar</option>
              <option value="Texas">Texas Bar</option>
              <option value="District of Columbia">D.C. Bar</option>
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
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-[#182643]">
          <span>Found <strong className="text-[#e5c07b] font-mono">{filteredAttorneys.length}</strong> admitted counsel</span>
          <span className="text-slate-500">All counsel maintain verified malpractice coverage</span>
        </div>
      </div>

      {/* Attorney Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAttorneys.map((atty) => {
          const isCurrentUser = atty.id === currentAttorney.id;

          return (
            <div
              key={atty.id}
              className={`bg-[#0b1328] border rounded-2xl p-5 shadow-lg transition-all flex flex-col justify-between ${
                isCurrentUser
                  ? 'border-[#d4af37]/60 ring-1 ring-[#d4af37]/30'
                  : 'border-[#1e2f50] hover:border-[#2e4577]'
              }`}
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={atty.avatar}
                        alt={atty.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-[#d4af37]/40"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 text-black border-2 border-[#0b1328]">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-base font-bold text-slate-100">
                          {atty.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="bg-[#1b2b4d] text-[#e5c07b] text-[9px] px-1.5 py-0.2 rounded font-bold border border-[#d4af37]/30">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{atty.title}</p>
                      <p className="text-xs text-slate-400">{atty.firm}</p>
                    </div>
                  </div>

                  <span className="text-[10px] bg-emerald-950/70 text-emerald-300 border border-emerald-700/40 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Active Standing
                  </span>
                </div>

                {/* State Bar Credentials Strip */}
                <div className="mt-3.5 bg-[#070c18] border border-[#1b2844] rounded-xl p-2.5 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">State Bar License:</span>
                    <span className="font-mono text-[#e5c07b] font-semibold">{atty.barNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Bar Jurisdiction:</span>
                    <span className="font-medium text-slate-200">{atty.barJurisdiction} (Admitted {atty.admissionYear})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Trial Record:</span>
                    <span className="text-slate-200 truncate max-w-[200px]">{atty.trialExperience}</span>
                  </div>
                </div>

                {/* Bio Snippet */}
                <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {atty.bio}
                </p>

                {/* Practice Area Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {atty.practiceAreas.map((area, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-[#111c34] text-slate-300 px-2 py-0.5 rounded border border-[#203154]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3.5 border-t border-[#182643] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectAttorneyDossier(atty)}
                  className="px-3 py-1.5 rounded-lg bg-[#111e38] hover:bg-[#182a4e] text-slate-200 hover:text-white text-xs font-medium border border-[#22355b] transition-colors"
                >
                  View Full Dossier
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenDirectMessage(atty)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs shadow-md transition-all flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Counsel Direct
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
