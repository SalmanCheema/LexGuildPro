import React, { useState } from 'react';
import { Attorney, CaseReferral, ChambersPost, DirectMessage, ReferralProposal } from './types/legal';
import { 
  INITIAL_ATTORNEYS, 
  INITIAL_CASE_REFERRALS, 
  INITIAL_CHAMBERS_POSTS, 
  INITIAL_MESSAGES 
} from './data/mockLegalData';
import { Header } from './components/Header';
import { ChambersFeed } from './components/ChambersFeed';
import { ReferralExchange } from './components/ReferralExchange';
import { AttorneyDirectory } from './components/AttorneyDirectory';
import { VaultBriefcase } from './components/VaultBriefcase';
import { BarVerificationModal } from './components/BarVerificationModal';
import { PostReferralModal } from './components/PostReferralModal';
import { CreateChambersPostModal } from './components/CreateChambersPostModal';
import { AttorneyProfileModal } from './components/AttorneyProfileModal';
import { CounselMessengerModal } from './components/CounselMessengerModal';
import { Rule15ExplainerModal } from './components/Rule15ExplainerModal';
import { Scale, ShieldCheck } from 'lucide-react';

export default function App() {
  const [attorneys, setAttorneys] = useState<Attorney[]>(INITIAL_ATTORNEYS);
  const [currentAttorney, setCurrentAttorney] = useState<Attorney>(INITIAL_ATTORNEYS[0]);
  const [activeTab, setActiveTab] = useState<'chambers' | 'referrals' | 'directory' | 'messages' | 'vault'>('chambers');
  
  const [referrals, setReferrals] = useState<CaseReferral[]>(INITIAL_CASE_REFERRALS);
  const [posts, setPosts] = useState<ChambersPost[]>(INITIAL_CHAMBERS_POSTS);
  const [messages, setMessages] = useState<DirectMessage[]>(INITIAL_MESSAGES);
  
  const [bookmarkedReferralIds, setBookmarkedReferralIds] = useState<string[]>(['ref-101']);
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState<string[]>(['post-201']);

  // Modals
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isPostReferralModalOpen, setIsPostReferralModalOpen] = useState(false);
  const [isCreateChambersPostModalOpen, setIsCreateChambersPostModalOpen] = useState(false);
  const [isRule15ExplainerOpen, setIsRule15ExplainerOpen] = useState(false);
  const [selectedDossierAttorney, setSelectedDossierAttorney] = useState<Attorney | null>(null);
  
  // Messenger state
  const [messengerRecipient, setMessengerRecipient] = useState<Attorney | null>(null);
  const [messengerReferral, setMessengerReferral] = useState<CaseReferral | null>(null);

  // Handlers
  const handleAddAndSelectAttorney = (newAttorney: Attorney) => {
    setAttorneys((prev) => [newAttorney, ...prev]);
    setCurrentAttorney(newAttorney);
  };

  const handleAddReferral = (newReferral: CaseReferral) => {
    setReferrals((prev) => [newReferral, ...prev]);
    setActiveTab('referrals');
  };

  const handleSubmitProposal = (proposal: ReferralProposal) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === proposal.referralId) {
          const currentProposals = r.proposals || [];
          return {
            ...r,
            proposalsCount: r.proposalsCount + 1,
            proposals: [proposal, ...currentProposals],
          };
        }
        return r;
      })
    );

    // Create an encrypted notice in Direct Messages
    const targetReferral = referrals.find((r) => r.id === proposal.referralId);
    if (targetReferral) {
      const noticeMsg: DirectMessage = {
        id: `msg-${Date.now()}`,
        senderId: currentAttorney.id,
        recipientId: targetReferral.referringAttorney.id,
        content: `Co-Counsel Pitch Submitted for "${targetReferral.title}". Our firm confirms: "${proposal.pitch}". Preliminary conflict screening status: ${proposal.conflictCheckStatus}.`,
        timestamp: 'Just now',
        isPrivileged: true,
        attachment: {
          type: 'case_referral',
          title: targetReferral.title,
          referenceId: targetReferral.id,
        },
      };
      setMessages((prev) => [...prev, noticeMsg]);
    }
  };

  const handleAddChambersPost = (newPost: ChambersPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setActiveTab('chambers');
  };

  const handleConcurPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          if (p.userVote === 'concur') {
            return { ...p, concurCount: p.concurCount - 1, userVote: undefined };
          }
          const prevDissent = p.userVote === 'dissent' ? 1 : 0;
          return {
            ...p,
            concurCount: p.concurCount + 1,
            dissentCount: Math.max(0, p.dissentCount - prevDissent),
            userVote: 'concur',
          };
        }
        return p;
      })
    );
  };

  const handleDissentPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          if (p.userVote === 'dissent') {
            return { ...p, dissentCount: p.dissentCount - 1, userVote: undefined };
          }
          const prevConcur = p.userVote === 'concur' ? 1 : 0;
          return {
            ...p,
            dissentCount: p.dissentCount + 1,
            concurCount: Math.max(0, p.concurCount - prevConcur),
            userVote: 'dissent',
          };
        }
        return p;
      })
    );
  };

  const handleBookmarkPost = (postId: string) => {
    setBookmarkedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const handleBookmarkReferral = (referralId: string) => {
    setBookmarkedReferralIds((prev) =>
      prev.includes(referralId) ? prev.filter((id) => id !== referralId) : [...prev, referralId]
    );
  };

  const handleAddComment = (postId: string, commentText: string, citationText?: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      author: currentAttorney,
      content: commentText,
      citations: citationText ? [citationText] : undefined,
      createdAt: 'Just now',
      concurs: 1,
      hasConcurred: true,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
  };

  const handleConcurComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.map((c) => {
              if (c.id === commentId) {
                const already = c.hasConcurred;
                return {
                  ...c,
                  concurs: already ? c.concurs - 1 : c.concurs + 1,
                  hasConcurred: !already,
                };
              }
              return c;
            }),
          };
        }
        return p;
      })
    );
  };

  const handleSendMessage = (msg: DirectMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleOpenDirectMessage = (recipient: Attorney, referral?: CaseReferral) => {
    setMessengerRecipient(recipient);
    setMessengerReferral(referral || null);
  };

  // If the user clicks Counsel Direct from nav tab, default recipient can be first other attorney
  const handleNavToMessages = () => {
    const otherAttorney = attorneys.find((a) => a.id !== currentAttorney.id) || attorneys[1] || attorneys[0];
    setMessengerRecipient(otherAttorney);
    setMessengerReferral(null);
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-white">
      
      {/* Sovereign Header */}
      <Header
        currentAttorney={currentAttorney}
        attorneys={attorneys}
        onSelectAttorney={setCurrentAttorney}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'messages') {
            handleNavToMessages();
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        onOpenPostReferralModal={() => setIsPostReferralModalOpen(true)}
        onOpenCreateChambersPostModal={() => setIsCreateChambersPostModalOpen(true)}
        onOpenRule15Explainer={() => setIsRule15ExplainerOpen(true)}
        unreadMessagesCount={2}
        openReferralsCount={referrals.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'chambers' && (
          <ChambersFeed
            currentAttorney={currentAttorney}
            posts={posts}
            onOpenCreateModal={() => setIsCreateChambersPostModalOpen(true)}
            onSelectAttorneyDossier={(atty) => setSelectedDossierAttorney(atty)}
            onConcurPost={handleConcurPost}
            onDissentPost={handleDissentPost}
            onBookmarkPost={handleBookmarkPost}
            onAddComment={handleAddComment}
            onConcurComment={handleConcurComment}
            bookmarkedPostIds={bookmarkedPostIds}
          />
        )}

        {activeTab === 'referrals' && (
          <ReferralExchange
            currentAttorney={currentAttorney}
            referrals={referrals}
            onOpenPostReferralModal={() => setIsPostReferralModalOpen(true)}
            onOpenRule15Explainer={() => setIsRule15ExplainerOpen(true)}
            onSelectAttorneyDossier={(atty) => setSelectedDossierAttorney(atty)}
            onOpenDirectMessage={handleOpenDirectMessage}
            onBookmarkReferral={handleBookmarkReferral}
            bookmarkedReferralIds={bookmarkedReferralIds}
            onSubmitProposal={handleSubmitProposal}
          />
        )}

        {activeTab === 'directory' && (
          <AttorneyDirectory
            attorneys={attorneys}
            currentAttorney={currentAttorney}
            onSelectAttorneyDossier={(atty) => setSelectedDossierAttorney(atty)}
            onOpenDirectMessage={handleOpenDirectMessage}
            onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
          />
        )}

        {activeTab === 'vault' && (
          <VaultBriefcase
            currentAttorney={currentAttorney}
            referrals={referrals}
            posts={posts}
            bookmarkedReferralIds={bookmarkedReferralIds}
            bookmarkedPostIds={bookmarkedPostIds}
            onRemoveReferralBookmark={handleBookmarkReferral}
            onRemovePostBookmark={handleBookmarkPost}
            onSelectAttorneyDossier={(atty) => setSelectedDossierAttorney(atty)}
            onOpenDirectMessage={handleOpenDirectMessage}
            onOpenRule15Explainer={() => setIsRule15ExplainerOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#050914] border-t border-[#172545] py-6 px-4 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#e5c07b]" />
            <span className="font-crest font-bold text-slate-200">LEXGUILD</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">The Sovereign Enclave for Licensed Attorneys</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setIsRule15ExplainerOpen(true)} className="hover:text-[#e5c07b]">
              Model Rule 1.5(e) Protocol
            </button>
            <span>•</span>
            <button onClick={() => setIsVerifyModalOpen(true)} className="hover:text-[#e5c07b]">
              State Bar Registry Verification
            </button>
            <span>•</span>
            <span className="text-emerald-400">Strictly Lawyers Only</span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <BarVerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onAddAndSelectAttorney={handleAddAndSelectAttorney}
      />

      <PostReferralModal
        currentAttorney={currentAttorney}
        isOpen={isPostReferralModalOpen}
        onClose={() => setIsPostReferralModalOpen(false)}
        onAddReferral={handleAddReferral}
      />

      <CreateChambersPostModal
        currentAttorney={currentAttorney}
        isOpen={isCreateChambersPostModalOpen}
        onClose={() => setIsCreateChambersPostModalOpen(false)}
        onAddPost={handleAddChambersPost}
      />

      <AttorneyProfileModal
        attorney={selectedDossierAttorney}
        isOpen={!!selectedDossierAttorney}
        onClose={() => setSelectedDossierAttorney(null)}
        onOpenDirectMessage={(atty) => {
          setSelectedDossierAttorney(null);
          handleOpenDirectMessage(atty);
        }}
      />

      <CounselMessengerModal
        currentAttorney={currentAttorney}
        recipientAttorney={messengerRecipient}
        initialReferral={messengerReferral}
        isOpen={!!messengerRecipient}
        onClose={() => {
          setMessengerRecipient(null);
          setMessengerReferral(null);
        }}
        messages={messages}
        onSendMessage={handleSendMessage}
      />

      <Rule15ExplainerModal
        isOpen={isRule15ExplainerOpen}
        onClose={() => setIsRule15ExplainerOpen(false)}
      />

    </div>
  );
}
