import React, { useState } from 'react';
import { Attorney } from '../types/legal';
import { 
  ShieldCheck, 
  Scale, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Bookmark, 
  PlusCircle, 
  ChevronDown, 
  CheckCircle2, 
  Lock, 
  Award,
  Bell,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentAttorney: Attorney;
  attorneys: Attorney[];
  onSelectAttorney: (attorney: Attorney) => void;
  activeTab: 'chambers' | 'referrals' | 'directory' | 'messages' | 'vault';
  onSelectTab: (tab: 'chambers' | 'referrals' | 'directory' | 'messages' | 'vault') => void;
  onOpenVerifyModal: () => void;
  onOpenPostReferralModal: () => void;
  onOpenCreateChambersPostModal: () => void;
  onOpenRule15Explainer: () => void;
  unreadMessagesCount: number;
  openReferralsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentAttorney,
  attorneys,
  onSelectAttorney,
  activeTab,
  onSelectTab,
  onOpenVerifyModal,
  onOpenPostReferralModal,
  onOpenCreateChambersPostModal,
  onOpenRule15Explainer,
  unreadMessagesCount,
  openReferralsCount,
}) => {
  const [showAttorneyDropdown, setShowAttorneyDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090f20]/95 backdrop-blur-md border-b border-[#223354] shadow-2xl">
      {/* Top Bar for Bar Integrity & Rule 1.5(e) Notice */}
      <div className="bg-[#050a16] border-b border-[#1b2742] px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[#e5c07b] font-medium tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e5c07b]" />
              BAR-VERIFIED ENCLAVE
            </span>
            <span className="text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Restricted to verified Juris Doctors in good standing with state licensing authorities.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenRule15Explainer}
              className="text-[#c5a880] hover:text-[#e5c07b] hover:underline flex items-center gap-1 text-[11px] transition-colors"
            >
              <Scale className="w-3 h-3" />
              ABA Model Rule 1.5(e) Fee Protocol
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
              <Lock className="w-3 h-3 text-emerald-400" />
              End-to-End Privileged
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Seal & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('chambers')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1c2d54] via-[#0f1d3c] to-[#0a1226] border border-[#d4af37]/60 flex items-center justify-center shadow-lg shadow-[#0f1d3c]/50">
              <Scale className="w-5 h-5 text-[#e5c07b]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-crest text-xl font-bold tracking-wider text-slate-100 flex items-center gap-1.5">
                  LEX<span className="text-[#e5c07b]">GUILD</span>
                </span>
                <span className="bg-[#1b2848] text-[#e5c07b] text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded border border-[#d4af37]/30">
                  ESQ. ONLY
                </span>
              </div>
              <p className="text-[11px] tracking-wide text-slate-400 font-sans">
                The Verified Attorney Exchange & Chambers
              </p>
            </div>
          </div>

          {/* Core Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d162a]/90 p-1 rounded-xl border border-[#1e2f50]">
            <button
              onClick={() => onSelectTab('chambers')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
                activeTab === 'chambers'
                  ? 'bg-gradient-to-r from-[#172545] to-[#1e325c] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121f3a]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              The Chambers
            </button>

            <button
              onClick={() => onSelectTab('referrals')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
                activeTab === 'referrals'
                  ? 'bg-gradient-to-r from-[#172545] to-[#1e325c] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121f3a]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Case Referrals
              {openReferralsCount > 0 && (
                <span className="bg-[#e5c07b] text-[#0a1124] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {openReferralsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('directory')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
                activeTab === 'directory'
                  ? 'bg-gradient-to-r from-[#172545] to-[#1e325c] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121f3a]'
              }`}
            >
              <Users className="w-4 h-4" />
              Roll of Attorneys
            </button>

            <button
              onClick={() => onSelectTab('messages')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2 transition-all relative ${
                activeTab === 'messages'
                  ? 'bg-gradient-to-r from-[#172545] to-[#1e325c] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121f3a]'
              }`}
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              Counsel Direct
              {unreadMessagesCount > 0 && (
                <span className="bg-emerald-500 text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('vault')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide flex items-center gap-2 transition-all ${
                activeTab === 'vault'
                  ? 'bg-gradient-to-r from-[#172545] to-[#1e325c] text-[#e5c07b] border border-[#d4af37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#121f3a]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Briefcase & Vault
            </button>
          </nav>

          {/* Action CTAs & Attorney Identity Badge */}
          <div className="flex items-center gap-3">
            {/* Quick Actions Button */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onOpenCreateChambersPostModal}
                className="px-3 py-2 rounded-lg border border-[#2b3c63] text-slate-200 hover:text-white hover:border-[#43598d] hover:bg-[#15223e] text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#c5a880]" />
                Brief Chambers
              </button>

              <button
                onClick={onOpenPostReferralModal}
                className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-semibold text-xs tracking-wide shadow-md shadow-[#d4af37]/20 transition-all flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#090f20]" />
                Refer a Matter
              </button>
            </div>

            {/* Verified Attorney Profile & Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowAttorneyDropdown(!showAttorneyDropdown)}
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl bg-[#111c34] border border-[#24355a] hover:border-[#d4af37]/50 transition-all text-left"
              >
                <div className="relative">
                  <img
                    src={currentAttorney.avatar}
                    alt={currentAttorney.name}
                    className="w-9 h-9 rounded-lg object-cover border border-[#d4af37]/40"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 text-black border border-[#0b132b]">
                    <ShieldCheck className="w-2.5 h-2.5" />
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-100 max-w-[130px] truncate">
                      {currentAttorney.name}
                    </span>
                    <span className="bg-[#1b294a] text-[#e5c07b] text-[9px] px-1 rounded font-mono border border-[#d4af37]/20">
                      {currentAttorney.barJurisdiction.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="font-mono text-emerald-400">{currentAttorney.barNumber}</span>
                  </div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {/* Attorney Switcher & Bar Verifier Dropdown */}
              {showAttorneyDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0d162b] border border-[#26385d] rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="pb-2.5 mb-2.5 border-b border-[#1c2a47]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                        Current Verified Counsel
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
                        <CheckCircle2 className="w-3 h-3" />
                        Active Standing
                      </span>
                    </div>
                    <p className="text-xs font-serif font-bold text-slate-100 mt-1">
                      {currentAttorney.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {currentAttorney.firm}
                    </p>
                    <div className="mt-2 text-[10px] bg-[#14203a] p-2 rounded border border-[#203154] text-slate-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bar License:</span>
                        <span className="font-mono text-[#e5c07b] font-medium">{currentAttorney.barNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Admitted:</span>
                        <span>{currentAttorney.admissionYear} ({currentAttorney.barJurisdiction})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Trial Records:</span>
                        <span className="text-slate-200">{currentAttorney.trialExperience.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1.5">
                      Switch Counsel Persona (Live Demo)
                    </p>
                    <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                      {attorneys.map((atty) => (
                        <button
                          key={atty.id}
                          onClick={() => {
                            onSelectAttorney(atty);
                            setShowAttorneyDropdown(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                            atty.id === currentAttorney.id
                              ? 'bg-[#1e2f54] text-white border border-[#d4af37]/30'
                              : 'hover:bg-[#131e36] text-slate-300'
                          }`}
                        >
                          <img src={atty.avatar} alt={atty.name} className="w-7 h-7 rounded-md object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium truncate">{atty.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{atty.barJurisdiction} • {atty.barNumber}</p>
                          </div>
                          {atty.id === currentAttorney.id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#e5c07b] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1c2a47]">
                    <button
                      onClick={() => {
                        setShowAttorneyDropdown(false);
                        onOpenVerifyModal();
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-[#182645] hover:bg-[#203259] text-[#e5c07b] border border-[#d4af37]/30 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Verify Another Bar License
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="flex lg:hidden items-center justify-between gap-1 mt-3 pt-2.5 border-t border-[#1a2744] overflow-x-auto text-xs pb-1">
          <button
            onClick={() => onSelectTab('chambers')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'chambers' ? 'bg-[#1d2d50] text-[#e5c07b] font-medium' : 'text-slate-300'
            }`}
          >
            Chambers
          </button>
          <button
            onClick={() => onSelectTab('referrals')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'referrals' ? 'bg-[#1d2d50] text-[#e5c07b] font-medium' : 'text-slate-300'
            }`}
          >
            Referrals ({openReferralsCount})
          </button>
          <button
            onClick={() => onSelectTab('directory')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'directory' ? 'bg-[#1d2d50] text-[#e5c07b] font-medium' : 'text-slate-300'
            }`}
          >
            Attorney Roll
          </button>
          <button
            onClick={() => onSelectTab('messages')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'messages' ? 'bg-[#1d2d50] text-[#e5c07b] font-medium' : 'text-slate-300'
            }`}
          >
            Messages {unreadMessagesCount > 0 && `(${unreadMessagesCount})`}
          </button>
          <button
            onClick={() => onSelectTab('vault')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'vault' ? 'bg-[#1d2d50] text-[#e5c07b] font-medium' : 'text-slate-300'
            }`}
          >
            Briefcase
          </button>
        </div>

      </div>
    </header>
  );
};
