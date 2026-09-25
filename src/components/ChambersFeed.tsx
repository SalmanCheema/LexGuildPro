import React, { useState } from 'react';
import { Attorney, ChambersPost, ChambersComment } from '../types/legal';
import { 
  MessageSquare, 
  Scale, 
  ShieldCheck, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  PlusCircle, 
  Search, 
  Filter, 
  BookOpen, 
  Lock, 
  Gavel, 
  TrendingUp, 
  ExternalLink,
  Copy,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ChambersFeedProps {
  currentAttorney: Attorney;
  posts: ChambersPost[];
  onOpenCreateModal: () => void;
  onSelectAttorneyDossier: (attorney: Attorney) => void;
  onConcurPost: (postId: string) => void;
  onDissentPost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string, citationText?: string) => void;
  onConcurComment: (postId: string, commentId: string) => void;
  bookmarkedPostIds: string[];
}

export const ChambersFeed: React.FC<ChambersFeedProps> = ({
  currentAttorney,
  posts,
  onOpenCreateModal,
  onSelectAttorneyDossier,
  onConcurPost,
  onDissentPost,
  onBookmarkPost,
  onAddComment,
  onConcurComment,
  bookmarkedPostIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentCitation, setNewCommentCitation] = useState('');
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  const categories = [
    'All',
    'Precedents & Case Law',
    'Motion Practice',
    'Bench Intelligence',
    'Ethics & Fee Division',
    'Case Referrals & Co-Counsel',
    'Deal Mechanics'
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.citations.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(citation);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  const handleCommentSubmit = (postId: string) => {
    if (!newCommentText.trim()) return;
    onAddComment(postId, newCommentText, newCommentCitation);
    setNewCommentText('');
    setNewCommentCitation('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Main Stream (Cols 1-8) */}
      <div className="lg:col-span-8 space-y-5">
        
        {/* Chambers Intro Card */}
        <div className="bg-gradient-to-r from-[#0c1529] via-[#111e3b] to-[#0a1224] border border-[#23355b] rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#1b2b4d] text-[#e5c07b] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#d4af37]/30 flex items-center gap-1 font-crest">
                  <Gavel className="w-3 h-3" />
                  THE BAR CHAMBERS
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-slate-300 text-xs">Peer Legal Deliberations</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
                Verified Doctrine, Precedents & Motion Strategy
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Engage in confidential analysis with verified bar colleagues. Vote to Concur or Dissent on statutory interpretations.
              </p>
            </div>

            <button
              onClick={onOpenCreateModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              Brief the Chambers
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#0b1328] border border-[#1e2f50] rounded-xl p-3.5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search precedents, case citations, statutory terms, or author..."
              className="w-full pl-9 pr-4 py-2 bg-[#080d1a] border border-[#1d2d4d] rounded-lg text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1b2b4d] text-[#e5c07b] border border-[#d4af37]/40 font-medium shadow-sm'
                    : 'bg-[#0f172a] text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center bg-[#0b1328] border border-[#1c2b48] rounded-xl space-y-3">
              <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="font-serif text-slate-200 font-semibold">No Chamber Briefs Found</h3>
              <p className="text-xs text-slate-400">
                Adjust your search or start the deliberation by submitting a new brief.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isBookmarked = bookmarkedPostIds.includes(post.id);
              const isCommentsOpen = activeCommentPostId === post.id;

              return (
                <article
                  key={post.id}
                  className="bg-[#0b1328] border border-[#1e2f50] hover:border-[#2b416e] rounded-2xl shadow-lg transition-all overflow-hidden"
                >
                  <div className="p-5">
                    {/* Author & Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div 
                        onClick={() => onSelectAttorneyDossier(post.author)}
                        className="cursor-pointer group flex items-center gap-3"
                      >
                        <div className="relative">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-colors"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 text-black border border-[#0b1328]">
                            <ShieldCheck className="w-2.5 h-2.5" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-serif font-bold text-slate-100 group-hover:text-[#e5c07b] transition-colors">
                              {post.author.name}
                            </span>
                            <span className="text-[10px] bg-[#142340] text-[#e5c07b] px-1.5 py-0.2 rounded font-mono border border-[#d4af37]/20">
                              {post.author.barNumber}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {post.author.title} • {post.author.firm}
                          </p>
                        </div>
                      </div>

                      {/* Category & Date */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#13203b] text-[#c5a880] border border-[#233559]">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-slate-500 whitespace-nowrap">
                          {post.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Post Title */}
                    <div className="mt-3.5">
                      <h3 className="font-serif text-lg font-bold text-slate-100 leading-snug">
                        {post.title}
                      </h3>

                      {/* Privilege Notice */}
                      {post.clientPrivilegeRedacted && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-emerald-400 font-mono">
                          <Lock className="w-3 h-3 text-emerald-400" />
                          <span>Rule 1.6 Redacted: Zero Client-Identifying Information</span>
                        </div>
                      )}

                      {/* Content Body */}
                      <div className="mt-2.5 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                        {post.content}
                      </div>

                      {/* Citations Box */}
                      {post.citations && post.citations.length > 0 && (
                        <div className="mt-3 p-3 bg-[#070d1a] border border-[#1b2b4b] rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#e5c07b]">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5 text-[#e5c07b]" />
                              Authorities Cited
                            </span>
                            <span className="text-slate-500 font-mono">Bluebook Standard</span>
                          </div>
                          <div className="space-y-1">
                            {post.citations.map((cite, i) => (
                              <div key={i} className="flex items-center justify-between text-xs text-slate-300 font-mono bg-[#0d1629] px-2.5 py-1 rounded border border-[#192745]">
                                <span className="italic">{cite}</span>
                                <button
                                  onClick={() => handleCopyCitation(cite)}
                                  className="text-slate-400 hover:text-[#e5c07b] text-[10px] flex items-center gap-1 ml-2 transition-colors"
                                >
                                  {copiedCitation === cite ? (
                                    <>
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" /> Copy
                                    </>
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {post.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-[#0e172c] text-slate-400 px-2 py-0.5 rounded border border-[#1b2b4d]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>

                    {/* Legal Voting (Concur / Dissent) and Actions */}
                    <div className="mt-4 pt-3 border-t border-[#172543] flex items-center justify-between gap-3 text-xs">
                      
                      {/* Concur & Dissent Controls */}
                      <div className="flex items-center gap-1.5 bg-[#080e1d] p-1 rounded-xl border border-[#1c2c4c]">
                        <button
                          onClick={() => onConcurPost(post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            post.userVote === 'concur'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 shadow-sm'
                              : 'text-slate-300 hover:text-emerald-400 hover:bg-[#121f3a]'
                          }`}
                        >
                          <Gavel className="w-3.5 h-3.5 text-[#e5c07b]" />
                          <span>Concur</span>
                          <span className="font-mono text-[11px] text-[#e5c07b] bg-[#142340] px-1 rounded">
                            {post.concurCount}
                          </span>
                        </button>

                        <button
                          onClick={() => onDissentPost(post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            post.userVote === 'dissent'
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-600/50 shadow-sm'
                              : 'text-slate-300 hover:text-rose-400 hover:bg-[#121f3a]'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5 text-slate-400" />
                          <span>Dissent</span>
                          <span className="font-mono text-[11px] text-slate-400 bg-[#142340] px-1 rounded">
                            {post.dissentCount}
                          </span>
                        </button>
                      </div>

                      {/* Comments and Save */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                            isCommentsOpen
                              ? 'bg-[#18294a] border-[#d4af37]/40 text-[#e5c07b]'
                              : 'bg-[#0e172c] border-[#1e2f50] text-slate-300 hover:text-white'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#c5a880]" />
                          <span>Deliberations ({post.comments.length || post.commentsCount})</span>
                        </button>

                        <button
                          onClick={() => onBookmarkPost(post.id)}
                          className={`p-2 rounded-lg border text-xs transition-colors ${
                            isBookmarked
                              ? 'bg-[#1a2b4c] border-[#d4af37] text-[#e5c07b]'
                              : 'bg-[#0e172c] border-[#1e2f50] text-slate-400 hover:text-slate-200'
                          }`}
                          title={isBookmarked ? 'Saved to Vault' : 'Save to Briefcase'}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>

                    </div>

                    {/* Threaded Deliberation / Comments Drawer */}
                    {isCommentsOpen && (
                      <div className="mt-4 pt-4 border-t border-[#172543] space-y-3 animate-in fade-in">
                        <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-[#e5c07b]" />
                          Counsel Deliberation Thread
                        </p>

                        {/* Existing comments */}
                        <div className="space-y-2.5">
                          {post.comments.length === 0 ? (
                            <p className="text-xs text-slate-500 italic py-2">
                              No peer deliberations filed yet. Offer your analysis below.
                            </p>
                          ) : (
                            post.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="bg-[#070d1a] border border-[#1b2a47] rounded-xl p-3 text-xs space-y-1.5"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={comment.author.avatar}
                                      alt={comment.author.name}
                                      className="w-6 h-6 rounded-md object-cover border border-[#d4af37]/30"
                                    />
                                    <span className="font-serif font-bold text-slate-200">
                                      {comment.author.name}
                                    </span>
                                    <span className="text-[10px] text-[#e5c07b] font-mono">
                                      {comment.author.barNumber}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-500">{comment.createdAt}</span>
                                </div>

                                <p className="text-slate-300 leading-relaxed pl-8">
                                  {comment.content}
                                </p>

                                {comment.citations && comment.citations.length > 0 && (
                                  <div className="pl-8 text-[11px] font-mono text-[#c5a880] italic">
                                    Cited: {comment.citations.join('; ')}
                                  </div>
                                )}

                                <div className="pl-8 pt-1 flex items-center gap-2">
                                  <button
                                    onClick={() => onConcurComment(post.id, comment.id)}
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
                                      comment.hasConcurred
                                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                        : 'bg-[#101b31] text-slate-400 hover:text-emerald-400 border border-[#1f2f50]'
                                    }`}
                                  >
                                    <Gavel className="w-2.5 h-2.5" />
                                    Concur ({comment.concurs})
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* New Comment Input */}
                        <div className="bg-[#080e1c] p-3 rounded-xl border border-[#1e2f50] space-y-2 mt-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={currentAttorney.avatar}
                              alt={currentAttorney.name}
                              className="w-6 h-6 rounded-md object-cover border border-[#d4af37]/30"
                            />
                            <span className="text-xs font-semibold text-slate-200">
                              Enter Counsel Deliberation as <span className="text-[#e5c07b]">{currentAttorney.name}</span>
                            </span>
                          </div>

                          <textarea
                            rows={2}
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder="Add your legal doctrine analysis, jurisdiction divergence, or trial experience..."
                            className="w-full px-3 py-2 bg-[#050a14] border border-[#1b2a47] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
                          />

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                            <input
                              type="text"
                              value={newCommentCitation}
                              onChange={(e) => setNewCommentCitation(e.target.value)}
                              placeholder="Citation (e.g. 598 U.S. 739 (2023))"
                              className="px-3 py-1 bg-[#050a14] border border-[#1b2a47] rounded-lg text-slate-200 font-mono text-[11px] focus:outline-none focus:border-[#d4af37] flex-1"
                            />

                            <button
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={!newCommentText.trim()}
                              className="px-3 py-1.5 bg-[#1b2b4d] hover:bg-[#253c6e] text-[#e5c07b] disabled:opacity-50 font-semibold text-xs rounded-lg border border-[#d4af37]/40 transition-colors"
                            >
                              Submit Deliberation
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                </article>
              );
            })
          )}
        </div>

      </div>

      {/* Right Rail Sidebar (Cols 9-12) */}
      <div className="lg:col-span-4 space-y-5">
        
        {/* Attorney Standing Dossier Card */}
        <div className="bg-[#0b1328] border border-[#203154] rounded-2xl p-4.5 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-[#1b2a48] pb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#e5c07b] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#e5c07b]" />
              Your Active Credential
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 font-mono">
              VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={currentAttorney.avatar}
              alt={currentAttorney.name}
              className="w-12 h-12 rounded-xl object-cover border border-[#d4af37]/40"
            />
            <div>
              <p className="font-serif font-bold text-slate-100 text-sm">{currentAttorney.name}</p>
              <p className="text-[11px] text-slate-400">{currentAttorney.firm}</p>
              <p className="text-[11px] font-mono text-[#e5c07b]">{currentAttorney.barNumber}</p>
            </div>
          </div>

          <div className="bg-[#070c18] p-2.5 rounded-xl border border-[#1b2844] text-[11px] text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Jurisdiction:</span>
              <span className="font-medium text-slate-200">{currentAttorney.barJurisdiction}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Admitted:</span>
              <span>Class of {currentAttorney.admissionYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Concurrence Index:</span>
              <span className="font-mono text-[#e5c07b] font-bold">{currentAttorney.concurrenceScore} pts</span>
            </div>
          </div>

          <button
            onClick={() => onSelectAttorneyDossier(currentAttorney)}
            className="w-full py-1.5 px-3 rounded-lg bg-[#14223f] hover:bg-[#1a2d54] text-xs font-medium text-[#c5a880] border border-[#23385e] transition-colors"
          >
            View Full Professional Dossier
          </button>
        </div>

        {/* Pinned Ethics Guardrail */}
        <div className="bg-gradient-to-br from-[#121c33] to-[#0c1426] border border-[#2b3e69] rounded-2xl p-4 shadow-lg space-y-2.5">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#e5c07b]" />
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-100">
              Chambers Protocol & Model Rules
            </h4>
          </div>

          <ul className="text-[11px] text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-[#e5c07b] font-bold">•</span>
              <span><strong>Rule 1.6 Confidentiality:</strong> All fact patterns must be scrubbed of party names, trademark secrets, and identifiable trade dress.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#e5c07b] font-bold">•</span>
              <span><strong>Rule 1.5(e) Fee Sharing:</strong> Referral fee agreements require client written consent and assumption of joint responsibility.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#e5c07b] font-bold">•</span>
              <span><strong>Rule 8.4 Integrity:</strong> All members on LexGuild undergo verification against state judicial disciplinary rosters.</span>
            </li>
          </ul>
        </div>

        {/* Trending Legal Citations */}
        <div className="bg-[#0b1328] border border-[#203154] rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-[#1b2a48] pb-2.5">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#e5c07b]" />
              Trending Authorities
            </span>
            <span className="text-[10px] text-slate-500 font-mono">This Term</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-[#070c18] p-2 rounded-lg border border-[#172543]">
              <p className="font-mono text-[#e5c07b] text-[11px] font-semibold">
                Loper Bright v. Raimondo
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">144 S. Ct. 2244 • Overruling Chevron</p>
            </div>

            <div className="bg-[#070c18] p-2 rounded-lg border border-[#172543]">
              <p className="font-mono text-[#e5c07b] text-[11px] font-semibold">
                In re McDonald's Corp. Deriv. Litig.
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">289 A.3d 343 • Officer Oversight Caremark</p>
            </div>

            <div className="bg-[#070c18] p-2 rounded-lg border border-[#172543]">
              <p className="font-mono text-[#e5c07b] text-[11px] font-semibold">
                SEC v. Jarkesy
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">144 S. Ct. 2117 • 7th Amendment Jury Right</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
