import React, { useState } from 'react';
import { Attorney, ChambersPost } from '../types/legal';
import { 
  MessageSquare, 
  X, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Trash2,
  Lock,
  Scale
} from 'lucide-react';

interface CreateChambersPostModalProps {
  currentAttorney: Attorney;
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: ChambersPost) => void;
}

export const CreateChambersPostModal: React.FC<CreateChambersPostModalProps> = ({
  currentAttorney,
  isOpen,
  onClose,
  onAddPost,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ChambersPost['category']>('Precedents & Case Law');
  const [content, setContent] = useState('');
  const [citations, setCitations] = useState<string[]>(['']);
  const [tags, setTags] = useState('Litigation, Precedent, Federal Rules');
  const [redactedPrivilege, setRedactedPrivilege] = useState(true);

  if (!isOpen) return null;

  const handleAddCitation = () => {
    setCitations([...citations, '']);
  };

  const handleCitationChange = (index: number, val: string) => {
    const updated = [...citations];
    updated[index] = val;
    setCitations(updated);
  };

  const handleRemoveCitation = (index: number) => {
    if (citations.length > 1) {
      setCitations(citations.filter((_, i) => i !== index));
    }
  };

  const handleFillSample = () => {
    setTitle('Second Circuit En Banc Petition on Extraterritorial Application of Dodd-Frank Whistleblower Protections');
    setCategory('Precedents & Case Law');
    setContent(`Counsel: Our team is monitoring an imminent petition for rehearing en banc regarding whether foreign nationals reporting US securities infractions while employed abroad qualify for anti-retaliation safe harbors.

The panel majority held that because the whistleblowing occurred in Zurich, the presumption against extraterritoriality barred the claim under Morrison. However, Judge Menashi’s vigorous dissent argued that the statutory nexus attaches at the moment the disclosure is transmitted to the SEC in Washington.

Given the circuit split with the Third Circuit’s decision in *Asadi*, this issue is primed for Supreme Court certiorari.`);
    setCitations([
      'Morrison v. National Australia Bank Ltd., 561 U.S. 247 (2010)',
      'Asadi v. G.E. Energy (USA), L.L.C., 720 F.3d 620 (5th Cir. 2013)'
    ]);
    setTags('Securities, Dodd-Frank, 2nd Cir, Whistleblower');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const filteredCitations = citations.map(c => c.trim()).filter(Boolean);

    const newPost: ChambersPost = {
      id: `post-${Date.now()}`,
      author: currentAttorney,
      category,
      title,
      content,
      citations: filteredCitations,
      clientPrivilegeRedacted: redactedPrivilege,
      concurCount: 1,
      dissentCount: 0,
      userVote: 'concur',
      commentsCount: 0,
      comments: [],
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: 'Just now',
      isBookmarked: false
    };

    onAddPost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0b1328] border border-[#2b3e6b] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#111e3b] via-[#17274c] to-[#0c162d] p-5 border-b border-[#23355d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e5c07b]/10 border border-[#e5c07b]/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#e5c07b]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-100">
                Brief the Chambers
              </h3>
              <p className="text-xs text-slate-400">
                Author: {currentAttorney.name} • {currentAttorney.barNumber}
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

        {/* Content Form */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Sample button */}
          <div className="flex items-center justify-between bg-[#121e3b] border border-[#22355e] p-2.5 rounded-xl mb-4">
            <span className="text-xs text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#e5c07b]" />
              Need sample doctrine to post?
            </span>
            <button
              type="button"
              onClick={handleFillSample}
              className="text-xs px-2.5 py-1 bg-[#1a2c52] hover:bg-[#233b6e] text-[#e5c07b] rounded border border-[#d4af37]/30 font-medium"
            >
              Populate Sample Legal Brief
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Post Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Precedents & Case Law">Precedents & Case Law</option>
                <option value="Motion Practice">Motion Practice</option>
                <option value="Bench Intelligence">Bench Intelligence (Judge Rulings & Courtroom Habits)</option>
                <option value="Ethics & Fee Division">Ethics & Fee Division (Rule 1.5 & Rule 1.6)</option>
                <option value="Case Referrals & Co-Counsel">Case Referrals & Co-Counsel Inquiries</option>
                <option value="Deal Mechanics">Deal Mechanics & Corporate Law</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Brief Title / Discussion Topic *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Strict compliance with Rule 11 certification standards in patent litigation"
                className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Legal Analysis & Peer Discussion *
              </label>
              <textarea
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Lay out procedural posture, court holding, or doctrinal analysis for peer review..."
                className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Legal Citations */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Legal Citations / Case Authority (Optional)
                </label>
                <button
                  type="button"
                  onClick={handleAddCitation}
                  className="text-[11px] text-[#e5c07b] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Citation
                </button>
              </div>

              <div className="space-y-2">
                {citations.map((cite, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cite}
                      onChange={(e) => handleCitationChange(index, e.target.value)}
                      placeholder="e.g. Celotex Corp. v. Catrett, 477 U.S. 317 (1986)"
                      className="flex-1 px-3 py-1.5 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 font-mono text-xs focus:outline-none focus:border-[#d4af37]"
                    />
                    {citations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCitation(index)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. Delaware Chancery, Caremark, Fiduciary Duty"
                className="w-full px-3 py-2 bg-[#080d1a] border border-[#223356] rounded-lg text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Redaction certification */}
            <div className="bg-[#101b34] p-3 rounded-xl border border-[#22345a]">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={redactedPrivilege}
                  onChange={(e) => setRedactedPrivilege(e.target.checked)}
                  className="mt-0.5 rounded border-[#2c3d66] bg-[#0c1324] text-[#d4af37] focus:ring-0"
                />
                <span>
                  <strong className="text-slate-100">Model Rule 1.6 Redaction:</strong> I confirm this post does not reveal client-identifying information or breach attorney-client privilege.
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
                disabled={!redactedPrivilege || !title || !content}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] disabled:opacity-50 text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                Publish Brief to Chambers
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
