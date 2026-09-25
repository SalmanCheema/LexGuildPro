export type PracticeArea =
  | 'Securities Litigation'
  | 'Intellectual Property & Patents'
  | 'Corporate Governance & M&A'
  | 'White Collar Defense & Investigations'
  | 'Antitrust & Competition'
  | 'Commercial & Chancery Litigation'
  | 'Employment & Class Actions'
  | 'Appellate & Constitutional Law'
  | 'Energy & Environmental'
  | 'Healthcare & Regulatory';

export type Jurisdiction =
  | 'Federal - All Circuits'
  | 'New York (SDNY / 2nd Cir)'
  | 'Delaware (Chancery & Supreme)'
  | 'California (NDCA / 9th Cir)'
  | 'Texas (SDTX / 5th Cir)'
  | 'District of Columbia (D.C. Cir)'
  | 'Florida (SDFL / 11th Cir)'
  | 'Illinois (NDIL / 7th Cir)'
  | 'Massachusetts (1st Cir)';

export interface Attorney {
  id: string;
  name: string;
  title: string;
  firm: string;
  avatar: string;
  barJurisdiction: string;
  barNumber: string;
  admissionYear: number;
  status: 'Active in Good Standing' | 'Senior Member' | 'Partner Counsel';
  practiceAreas: PracticeArea[];
  bio: string;
  education: string;
  trialExperience: string;
  referralAcceptanceRate: string;
  concurrenceScore: number;
  verifiedBadge: boolean;
  malpracticeInsured: boolean;
  email: string;
  phone?: string;
  officeLocation: string;
}

export interface CaseReferral {
  id: string;
  title: string;
  practiceArea: PracticeArea;
  jurisdiction: Jurisdiction;
  courtForum: string;
  estimatedValue: string;
  referralFeePercent: number; // e.g. 25% under Rule 1.5(e)
  rule15Compliant: boolean;
  clientConsentStatus: 'Obtained' | 'Ready upon Co-Counsel Match';
  summary: string;
  factPatternRedacted: string;
  deadline: string;
  conflictsCleared: boolean;
  status: 'Open' | 'Reviewing Counsel' | 'Retained & Cleared';
  referringAttorney: Attorney;
  proposalsCount: number;
  urgency: 'Immediate (Within 48h)' | 'Urgent (This Week)' | 'Standard (30 Days)';
  createdAt: string;
  requiredAdmissions: string[];
  proposals?: ReferralProposal[];
}

export interface ReferralProposal {
  id: string;
  referralId: string;
  attorney: Attorney;
  pitch: string;
  relevantMatters: string;
  conflictCheckStatus: 'Clear - Zero Adverse Parties' | 'Pending Formal Run';
  rule15FeeSplitAgreed: boolean;
  submittedAt: string;
}

export interface ChambersComment {
  id: string;
  author: Attorney;
  content: string;
  citations?: string[];
  createdAt: string;
  concurs: number;
  hasConcurred?: boolean;
}

export interface ChambersPost {
  id: string;
  author: Attorney;
  category:
    | 'Precedents & Case Law'
    | 'Case Referrals & Co-Counsel'
    | 'Bench Intelligence'
    | 'Motion Practice'
    | 'Ethics & Fee Division'
    | 'Deal Mechanics';
  title: string;
  content: string;
  citations: string[];
  clientPrivilegeRedacted: boolean;
  concurCount: number;
  dissentCount: number;
  userVote?: 'concur' | 'dissent';
  commentsCount: number;
  comments: ChambersComment[];
  tags: string[];
  createdAt: string;
  isBookmarked?: boolean;
  pinnedNotice?: boolean;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  isPrivileged: boolean;
  attachment?: {
    type: 'case_referral' | 'citation_memo' | 'conflict_waiver';
    title: string;
    referenceId?: string;
  };
}
