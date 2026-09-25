import React, { useState } from 'react';
import { Attorney, CaseReferral, DirectMessage } from '../types/legal';
import { 
  Send, 
  X, 
  Lock, 
  ShieldCheck, 
  FileCheck2, 
  Scale, 
  Paperclip, 
  CheckCheck,
  Building,
  AlertCircle
} from 'lucide-react';

interface CounselMessengerModalProps {
  currentAttorney: Attorney;
  recipientAttorney: Attorney | null;
  initialReferral?: CaseReferral | null;
  isOpen: boolean;
  onClose: () => void;
  messages: DirectMessage[];
  onSendMessage: (msg: DirectMessage) => void;
}

export const CounselMessengerModal: React.FC<CounselMessengerModalProps> = ({
  currentAttorney,
  recipientAttorney,
  initialReferral,
  isOpen,
  onClose,
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState(
    initialReferral
      ? `Greetings Counsel. Regarding matter "${initialReferral.title}" (${initialReferral.courtForum}), our conflict run is underway and we wish to discuss co-counsel syndication under Rule 1.5(e).`
      : ''
  );

  if (!isOpen || !recipientAttorney) return null;

  // Filter messages between these two attorneys
  const threadMessages = messages.filter(
    (m) =>
      (m.senderId === currentAttorney.id && m.recipientId === recipientAttorney.id) ||
      (m.senderId === recipientAttorney.id && m.recipientId === currentAttorney.id)
  );

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentAttorney.id,
      recipientId: recipientAttorney.id,
      content: inputText,
      timestamp: 'Just now',
      isPrivileged: true,
      attachment: initialReferral
        ? {
            type: 'case_referral',
            title: initialReferral.title,
            referenceId: initialReferral.id
          }
        : undefined
    };

    onSendMessage(newMsg);
    setInputText('');

    // Simulate an attorney peer reply after 1.5 seconds if it's a conversation
    setTimeout(() => {
      const replyMsg: DirectMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: recipientAttorney.id,
        recipientId: currentAttorney.id,
        content: `Thank you, ${currentAttorney.name.split(' ')[0]}. I've reviewed your credentials (${currentAttorney.barNumber}) and docket trial history. Let's schedule an attorney-to-attorney conference to finalize the Rule 1.5(e) co-counsel agreement.`,
        timestamp: 'Just now',
        isPrivileged: true,
        attachment: {
          type: 'conflict_waiver',
          title: `Preliminary Conflict Screening Report - ${recipientAttorney.firm}`
        }
      };
      onSendMessage(replyMsg);
    }, 1800);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0b1328] border border-[#2b3e6b] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        
        {/* Encrypted Top Bar */}
        <div className="bg-[#060c18] border-b border-[#1b2a47] px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="font-mono uppercase font-semibold">ATTORNEY WORK PRODUCT PRIVILEGE</span>
          </div>
          <span className="text-slate-500 font-mono">256-BIT ENCRYPTED TUNNEL</span>
        </div>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#111e3b] via-[#16274c] to-[#0d172e] p-4 border-b border-[#23355d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={recipientAttorney.avatar}
                alt={recipientAttorney.name}
                className="w-11 h-11 rounded-xl object-cover border border-[#d4af37]/40"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 text-black border border-[#0b1328]">
                <ShieldCheck className="w-2.5 h-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-slate-100">
                  {recipientAttorney.name}
                </h3>
                <span className="text-[10px] bg-[#1a2b4e] text-[#e5c07b] px-1.5 py-0.2 rounded font-mono border border-[#d4af37]/30">
                  {recipientAttorney.barNumber}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {recipientAttorney.firm} • {recipientAttorney.barJurisdiction}
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

        {/* Message Thread Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#080d1b]">
          {/* Privilege Watermark Banner */}
          <div className="text-center py-2">
            <div className="inline-block bg-[#0e172a] text-slate-400 text-[10px] px-3 py-1 rounded-full border border-[#1b2b4d]">
              Confidential Attorney-to-Attorney Communication • Protected under Rule 1.6
            </div>
          </div>

          {threadMessages.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-slate-400">
              <Scale className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-xs">No prior correspondence with {recipientAttorney.name}.</p>
              <p className="text-[11px] text-slate-500">Initiate co-counsel inquiries or conflict clearance discussions below.</p>
            </div>
          ) : (
            threadMessages.map((msg) => {
              const isMine = msg.senderId === currentAttorney.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-md ${
                      isMine
                        ? 'bg-[#182a4d] border border-[#2d4677] text-slate-100 rounded-br-none'
                        : 'bg-[#0f172c] border border-[#1f3054] text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>

                    {/* Attachment Card */}
                    {msg.attachment && (
                      <div className="mt-2.5 p-2 bg-[#090f1e] border border-[#21355c] rounded-xl flex items-center gap-2 text-[11px]">
                        <FileCheck2 className="w-4 h-4 text-[#e5c07b] shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-200 truncate">{msg.attachment.title}</p>
                          <span className="text-[10px] text-slate-400 uppercase font-mono">{msg.attachment.type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isMine && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Prompts Strip */}
        <div className="px-4 py-2 bg-[#090f20] border-t border-[#172543] flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 whitespace-nowrap text-[10px] uppercase font-semibold">Quick Pitch:</span>
          <button
            onClick={() => handleQuickPrompt("Our firm ran conflict checks and came back 100% clear. We are ready to draft the preliminary injunction.")}
            className="px-2.5 py-1 rounded bg-[#101b33] hover:bg-[#182747] text-slate-300 whitespace-nowrap border border-[#1d2d4d] transition-colors"
          >
            Conflict Check Clean
          </button>
          <button
            onClick={() => handleQuickPrompt("Client has executed written consent for Rule 1.5(e) co-counsel fee split. Please send your signature.")}
            className="px-2.5 py-1 rounded bg-[#101b33] hover:bg-[#182747] text-slate-300 whitespace-nowrap border border-[#1d2d4d] transition-colors"
          >
            Client Consent Executed
          </button>
          <button
            onClick={() => handleQuickPrompt("Would you have 15 minutes for a privileged teleconference this afternoon regarding trial strategy?")}
            className="px-2.5 py-1 rounded bg-[#101b33] hover:bg-[#182747] text-slate-300 whitespace-nowrap border border-[#1d2d4d] transition-colors"
          >
            Schedule Call
          </button>
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-[#0d162a] border-t border-[#1b2b4c] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${recipientAttorney.name} with work-product protection...`}
            className="flex-1 px-3.5 py-2.5 bg-[#080d1a] border border-[#203154] rounded-xl text-slate-100 text-xs focus:outline-none focus:border-[#d4af37]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c07b] hover:to-[#d4af37] disabled:opacity-50 text-[#090f20] font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Send Privileged
          </button>
        </form>

      </div>
    </div>
  );
};
