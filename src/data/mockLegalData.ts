import { Attorney, CaseReferral, ChambersPost, DirectMessage } from '../types/legal';

export const INITIAL_ATTORNEYS: Attorney[] = [
  {
    id: 'attorney-1',
    name: 'Alexandra Vance, Esq.',
    title: 'Senior Litigation Partner',
    firm: 'Vance, Sterling & Calloway LLP',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260',
    barJurisdiction: 'New York',
    barNumber: 'NY-4829104',
    admissionYear: 2011,
    status: 'Active in Good Standing',
    practiceAreas: ['Securities Litigation', 'Commercial & Chancery Litigation', 'Antitrust & Competition'],
    bio: '15+ years defending Fortune 100 directors and investment banks in SDNY securities class actions and Delaware fiduciary litigation. First-chair trial verdict record of 14-2.',
    education: 'Columbia Law School (J.D., Harlan Fiske Stone Scholar); Dartmouth College (A.B.)',
    trialExperience: '16 Federal Jury Trials, 22 Oral Arguments (2nd & 3rd Cir.)',
    referralAcceptanceRate: '98% prompt response',
    concurrenceScore: 1420,
    verifiedBadge: true,
    malpracticeInsured: true,
    email: 'avance@vancesterling.com',
    phone: '(212) 840-2910',
    officeLocation: 'Midtown Manhattan, New York, NY'
  },
  {
    id: 'attorney-2',
    name: 'Marcus Sterling, Esq.',
    title: 'Managing Partner - IP & Tech',
    firm: 'Sterling IP & Trial Counsel',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=260',
    barJurisdiction: 'California',
    barNumber: 'CA-291048',
    admissionYear: 2008,
    status: 'Active in Good Standing',
    practiceAreas: ['Intellectual Property & Patents', 'Antitrust & Competition'],
    bio: 'Lead counsel in landmark semiconductor patent trials before NDCA (San Jose) and the Federal Circuit. Registered Patent Attorney with the USPTO (#62,914).',
    education: 'Stanford Law School (J.D.); UC Berkeley (B.S. Electrical Engineering)',
    trialExperience: '11 Patent Jury Trials (NDCA, EDTX, D. Del), 8 PTAB IPR trials',
    referralAcceptanceRate: '94% prompt response',
    concurrenceScore: 1180,
    verifiedBadge: true,
    malpracticeInsured: true,
    email: 'm.sterling@sterlingip.law',
    phone: '(415) 920-4100',
    officeLocation: 'Financial District, San Francisco, CA'
  },
  {
    id: 'attorney-3',
    name: 'Sarah Chen, Esq.',
    title: 'Special Counsel - Chancery Practice',
    firm: 'Wilmington Corporate Advisory LLP',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=260',
    barJurisdiction: 'Delaware',
    barNumber: 'DE-510294',
    admissionYear: 2014,
    status: 'Active in Good Standing',
    practiceAreas: ['Commercial & Chancery Litigation', 'Corporate Governance & M&A'],
    bio: 'Dedicated Delaware Court of Chancery litigator specializing in Section 220 books & records demands, appraisal rights, and expedited preliminary injunction proceedings.',
    education: 'University of Virginia School of Law (J.D., Order of the Coif); Princeton (A.B.)',
    trialExperience: '19 Expedited Bench Hearings before Delaware Chancellors & Vice-Chancellors',
    referralAcceptanceRate: '100% prompt response',
    concurrenceScore: 970,
    verifiedBadge: true,
    malpracticeInsured: true,
    email: 'schen@wilmingtoncorp.com',
    phone: '(302) 658-9900',
    officeLocation: 'Wilmington, DE'
  },
  {
    id: 'attorney-4',
    name: 'Devonte Reed, Esq.',
    title: 'White Collar Defense Chair',
    firm: 'Reed, Sterling & Mercer PLLC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=260',
    barJurisdiction: 'District of Columbia',
    barNumber: 'DC-1029482',
    admissionYear: 2010,
    status: 'Active in Good Standing',
    practiceAreas: ['White Collar Defense & Investigations', 'Healthcare & Regulatory'],
    bio: 'Former Assistant U.S. Attorney (Fraud & Public Corruption Section). Represents C-suite executives and healthcare conglomerates in DOJ, SEC, and Congressional probes.',
    education: 'Georgetown University Law Center (J.D.); Morehouse College (B.A., summa cum laude)',
    trialExperience: '28 Criminal & Civil Federal Trials (D.D.C., E.D. Va "Rocket Docket")',
    referralAcceptanceRate: '96% prompt response',
    concurrenceScore: 1640,
    verifiedBadge: true,
    malpracticeInsured: true,
    email: 'dreed@reedmercer.com',
    phone: '(202) 789-3200',
    officeLocation: 'K Street NW, Washington, D.C.'
  },
  {
    id: 'attorney-5',
    name: 'Elena Rostova, Esq.',
    title: 'Trial Partner - Energy & Catastrophic Torts',
    firm: 'Rostova & Hargrove Trial Lawyers',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=260',
    barJurisdiction: 'Texas',
    barNumber: 'TX-8841029',
    admissionYear: 2012,
    status: 'Active in Good Standing',
    practiceAreas: ['Energy & Environmental', 'Commercial & Chancery Litigation'],
    bio: 'Board Certified in Civil Trial Law by the Texas Board of Legal Specialization. Specializes in offshore drilling disputes, pipeline easements, and multi-state joint ventures.',
    education: 'University of Texas School of Law (J.D.); Texas A&M (B.S. Petroleum Engineering)',
    trialExperience: '14 State District Trials, 6 Federal Trials (SDTX, WDTX)',
    referralAcceptanceRate: '95% prompt response',
    concurrenceScore: 890,
    verifiedBadge: true,
    malpracticeInsured: true,
    email: 'elena@rostovatrial.com',
    phone: '(713) 222-7711',
    officeLocation: 'Downtown Houston, TX'
  }
];

export const INITIAL_CASE_REFERRALS: CaseReferral[] = [
  {
    id: 'ref-101',
    title: 'Delaware Chancery Breach of Fiduciary Duty & M&A Squeeze-Out',
    practiceArea: 'Commercial & Chancery Litigation',
    jurisdiction: 'Delaware (Chancery & Supreme)',
    courtForum: 'Delaware Court of Chancery (Wilmington)',
    estimatedValue: '$18,500,000 Claim',
    referralFeePercent: 25,
    rule15Compliant: true,
    clientConsentStatus: 'Obtained',
    summary: 'Institutional minority stockholders challenging buyout valuation by controlling private equity fund. Seeking experienced Delaware bar member for immediate joint petition and preliminary injunction hearing.',
    factPatternRedacted: 'Plaintiff holds 14.2% common stock in Del-incorporated fintech. Controlling sponsor enacted squeeze-out without special committee independent financial advisor fairness opinion. Books and records Section 220 already yielded internal emails disclosing valuation suppression.',
    deadline: 'Injunction motion due in 12 days',
    conflictsCleared: true,
    status: 'Open',
    referringAttorney: INITIAL_ATTORNEYS[0],
    proposalsCount: 3,
    urgency: 'Immediate (Within 48h)',
    createdAt: '3 hours ago',
    requiredAdmissions: ['Delaware Bar Member', 'Court of Chancery Active Admission'],
    proposals: [
      {
        id: 'prop-1',
        referralId: 'ref-101',
        attorney: INITIAL_ATTORNEYS[2],
        pitch: 'My practice is 100% focused on Delaware Chancery books and records and merger challenges. Handled 3 similar freeze-out valuations before Chancellor McCormick in the past 18 months.',
        relevantMatters: 'Represented minority investors in In re Apex Holdings ($24M settlement, 2024); Lead Delaware counsel in Sterling v. Caelus PE.',
        conflictCheckStatus: 'Clear - Zero Adverse Parties',
        rule15FeeSplitAgreed: true,
        submittedAt: '1 hour ago'
      }
    ]
  },
  {
    id: 'ref-102',
    title: 'NDCA Generative AI Model Training Copyright Infringement Action',
    practiceArea: 'Intellectual Property & Patents',
    jurisdiction: 'California (NDCA / 9th Cir)',
    courtForum: 'U.S. District Court, Northern District of California (San Francisco)',
    estimatedValue: '$35,000,000+ Class Exposure',
    referralFeePercent: 28,
    rule15Compliant: true,
    clientConsentStatus: 'Obtained',
    summary: 'Creators and proprietary digital media catalog owners bringing multi-district statutory copyright infringement claims against major foundational model training pipeline without license.',
    factPatternRedacted: 'Defendant automated scraping of 4.2 million copyrighted high-resolution vector and photo works between 2023-2025. Pre-action preservation demand served. Need lead trial co-counsel experienced in Fair Use defense rebuttals and tech jury trials in NDCA.',
    deadline: 'Rule 23 Class Action Filing window closes in 21 days',
    conflictsCleared: true,
    status: 'Open',
    referringAttorney: INITIAL_ATTORNEYS[1],
    proposalsCount: 2,
    urgency: 'Urgent (This Week)',
    createdAt: '1 day ago',
    requiredAdmissions: ['California Bar', 'NDCA Bar Admission', 'Tech Trial Experience']
  },
  {
    id: 'ref-103',
    title: 'SDNY Rule 10b-5 Securities Fraud Co-Counsel for Lead Plaintiff',
    practiceArea: 'Securities Litigation',
    jurisdiction: 'New York (SDNY / 2nd Cir)',
    courtForum: 'U.S. District Court, Southern District of New York (Foley Square)',
    estimatedValue: '$50,000,000+ Market Loss',
    referralFeePercent: 20,
    rule15Compliant: true,
    clientConsentStatus: 'Obtained',
    summary: 'European public pension fund designated candidate for lead plaintiff in misrepresentation action involving sudden unannounced clinical trial halt and insider selling spree.',
    factPatternRedacted: 'Biotech issuer executives liquidated $38M in restricted stock 14 trading days prior to FDA complete response letter announcement. PSLRA 60-day notice window active. Seeking SDNY litigation boutique for motion to appoint and consolidated amended complaint drafting.',
    deadline: 'PSLRA Lead Plaintiff Deadline: 18 days',
    conflictsCleared: true,
    status: 'Open',
    referringAttorney: INITIAL_ATTORNEYS[3],
    proposalsCount: 5,
    urgency: 'Urgent (This Week)',
    createdAt: '2 days ago',
    requiredAdmissions: ['New York Bar', 'SDNY Admission', 'PSLRA Experience']
  },
  {
    id: 'ref-104',
    title: 'Cross-Border Mineral Rights Joint Venture Arbitration',
    practiceArea: 'Energy & Environmental',
    jurisdiction: 'Texas (SDTX / 5th Cir)',
    courtForum: 'AAA / ICDR International Arbitration (Houston)',
    estimatedValue: '$12,000,000',
    referralFeePercent: 25,
    rule15Compliant: true,
    clientConsentStatus: 'Ready upon Co-Counsel Match',
    summary: 'Working interest dispute between operator and European consortium regarding deep Permian Basin drilling cost overruns and allocation of pipeline processing revenue.',
    factPatternRedacted: 'Joint operating agreement contains standard AAPL 610-1989 terms with mandatory arbitration clause. Client seeks Houston-based energy trial lawyer with deep accounting audit arbitration track record.',
    deadline: 'Response to Demand for Arbitration due in 25 days',
    conflictsCleared: false,
    status: 'Open',
    referringAttorney: INITIAL_ATTORNEYS[4],
    proposalsCount: 1,
    urgency: 'Standard (30 Days)',
    createdAt: '3 days ago',
    requiredAdmissions: ['Texas Bar', 'ICDR / AAA Panel Experience']
  }
];

export const INITIAL_CHAMBERS_POSTS: ChambersPost[] = [
  {
    id: 'post-201',
    author: INITIAL_ATTORNEYS[0],
    category: 'Precedents & Case Law',
    title: 'Practical Impact of Loper Bright on Agency Guidance in District Court Summary Judgments',
    content: `Now that we have had several months with the Supreme Court's overruling of Chevron (*Loper Bright Enterprises v. Raimondo*), I am noticing a sharp divergence in how 2nd Circuit vs. 5th Circuit district judges are treating informal agency manuals and SEC staff bulletins.

In our recent securities action before Judge Cote (SDNY), defense attempted to rely heavily on a 2021 SEC Division of Corporation Finance staff accounting bulletin to defeat scienter. The Court held point-blank that under Skidmore, the staff bulletin had minimal persuasive weight without formal statutory anchoring.

Are counsel in other jurisdictions seeing federal judges aggressively stripping agency informal guidance from jury instructions and 12(b)(6) dismissal arguments?`,
    citations: ['Loper Bright v. Raimondo, 144 S. Ct. 2244 (2024)', 'Skidmore v. Swift & Co., 323 U.S. 134 (1944)'],
    clientPrivilegeRedacted: true,
    concurCount: 84,
    dissentCount: 6,
    commentsCount: 14,
    tags: ['Administrative Law', 'Securities', 'Statutory Construction', '2nd Cir'],
    createdAt: '4 hours ago',
    comments: [
      {
        id: 'c-1',
        author: INITIAL_ATTORNEYS[3],
        content: 'Spot on, Alexandra. In D.D.C., we had a False Claims Act indictment where the government leaned on CMS sub-regulatory guidance. The magistrate judge struck down the proposed pattern jury charge citing Loper Bright, forcing DOJ to prove statutory text knowledge.',
        citations: ['United States ex rel. Schutte v. SuperValu, 598 U.S. 739 (2023)'],
        createdAt: '2 hours ago',
        concurs: 28
      },
      {
        id: 'c-2',
        author: INITIAL_ATTORNEYS[4],
        content: 'In the 5th Circuit, district judges were already skeptical of agency bulletins pre-Loper Bright. Now it is virtually impossible for EPA or FERC enforcement staff to survive a 12(b)(6) unless the plain text of the enabling statute explicitly supports the rule.',
        createdAt: '1 hour ago',
        concurs: 19
      }
    ]
  },
  {
    id: 'post-202',
    author: INITIAL_ATTORNEYS[2],
    category: 'Motion Practice',
    title: 'Delaware Chancery Clarifies Caremark Oversight Pleading Standard Post-McDonald’s',
    content: `A crucial reminder for corporate counsel advising boards on internal audit and cyber breach disclosures:

The Chancery Court has reiterated that while *In re McDonald’s Corp. Shareholder Derivative Litigation* confirmed that corporate officers (not just directors) owe duties of oversight under Caremark, the hurdle to plead bad faith remains demanding.

A plaintiff must still allege particularized facts showing that officers were either consciously aware of a red flag and utterly failed to act, or consciously failed to implement any reporting system whatsoever. Don't let plaintiffs slip by on simple ordinary negligence allegations in Section 220 demands or derivative complaints.`,
    citations: ['In re Caremark Int’l Inc. Deriv. Litig., 698 A.2d 959 (Del. Ch. 1996)', 'In re McDonald’s Corp. S’holder Deriv. Litig., 289 A.3d 343 (Del. Ch. 2023)'],
    clientPrivilegeRedacted: true,
    concurCount: 112,
    dissentCount: 4,
    commentsCount: 8,
    tags: ['Delaware Law', 'Corporate Governance', 'Caremark', 'Fiduciary Duties'],
    createdAt: '1 day ago',
    comments: [
      {
        id: 'c-3',
        author: INITIAL_ATTORNEYS[0],
        content: 'Excellent synthesis Sarah. We are seeing Delaware courts push back hard against attempts to transform run-of-the-mill operational or supply-chain setbacks into Caremark bad-faith lawsuits.',
        createdAt: '18 hours ago',
        concurs: 15
      }
    ]
  },
  {
    id: 'post-203',
    author: INITIAL_ATTORNEYS[1],
    category: 'Ethics & Fee Division',
    title: 'Ensuring Strict ABA Model Rule 1.5(e) Compliance in Multi-State Co-Counsel Referrals',
    content: `Fellow Counsel: As we frequently syndicate high-exposure patent and tort matters across state lines, remember that Model Rule 1.5(e) requires three non-negotiable elements for referral fee sharing between lawyers who are not in the same firm:

1. The division is in proportion to the services performed by each lawyer OR each lawyer assumes joint responsibility for the representation;
2. The client agrees to the arrangement, including the share each lawyer will receive, confirmed in writing; and
3. The total fee is reasonable.

In California (CRPC 1.5.1) and New York (Rule 1.5(g)), written client consent must specifically enumerate the exact percentage split prior to or at the time of entering the co-counsel agreement. Never leave fee splits to an informal post-settlement handshake.`,
    citations: ['ABA Model Rule 1.5(e)', 'Cal. Rules of Prof. Conduct 1.5.1', 'N.Y. Rules of Prof. Conduct 1.5(g)'],
    clientPrivilegeRedacted: true,
    concurCount: 198,
    dissentCount: 1,
    commentsCount: 19,
    tags: ['Ethics', 'Referral Fees', 'Rule 1.5(e)', 'Legal Practice Management'],
    createdAt: '2 days ago',
    comments: []
  },
  {
    id: 'post-204',
    author: INITIAL_ATTORNEYS[3],
    category: 'Bench Intelligence',
    title: 'Local Practice Note: Judge Boasberg’s Chambers Rules on Motion in Limine Deadlines',
    content: `Heads up for counsel trying civil matters in D.D.C.: Chief Judge Boasberg strictly enforces the 21-day pre-trial evidentiary exhibit exchange rule. If exhibits or Daubert challenges to summary appraisal experts are not filed simultaneously with the pre-trial statement, the Court will treat them as waived absent extraordinary cause shown.`,
    citations: ['Local Civil Rule 16.5(b) (D.D.C.)'],
    clientPrivilegeRedacted: true,
    concurCount: 67,
    dissentCount: 0,
    commentsCount: 5,
    tags: ['Bench Intelligence', 'D.D.C.', 'Civil Procedure', 'Trial Practice'],
    createdAt: '3 days ago',
    comments: []
  }
];

export const INITIAL_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    senderId: 'attorney-3',
    recipientId: 'attorney-1',
    content: 'Alexandra, thank you for accepting my connection. Regarding your Delaware Chancery referral (ref-101), our conflict screening run just came back 100% negative against the sponsor and the target board. I am prepared to draft the expedited TRO papers immediately.',
    timestamp: '10:14 AM',
    isPrivileged: true,
    attachment: {
      type: 'conflict_waiver',
      title: 'Conflict Check Clearance Certificate - Chancery Matter #4920'
    }
  },
  {
    id: 'msg-2',
    senderId: 'attorney-1',
    recipientId: 'attorney-3',
    content: 'Outstanding, Sarah. The client signed off on the Rule 1.5(e) co-counsel fee split agreement this morning. I am attaching the redacted Section 220 disclosure packet and will loop in our litigation associate for the docket filing.',
    timestamp: '10:28 AM',
    isPrivileged: true,
    attachment: {
      type: 'case_referral',
      title: 'Delaware Chancery Breach of Fiduciary Duty Brief',
      referenceId: 'ref-101'
    }
  }
];

export const JURISDICTIONS_LIST = [
  'All Jurisdictions',
  'Federal - All Circuits',
  'New York (SDNY / 2nd Cir)',
  'California (NDCA / 9th Cir)',
  'Delaware (Chancery & Supreme)',
  'Texas (SDTX / 5th Cir)',
  'District of Columbia (D.C. Cir)',
  'Florida (SDFL / 11th Cir)',
  'Illinois (NDIL / 7th Cir)',
  'Massachusetts (1st Cir)'
];

export const PRACTICE_AREAS_LIST = [
  'All Practice Areas',
  'Securities Litigation',
  'Intellectual Property & Patents',
  'Commercial & Chancery Litigation',
  'Corporate Governance & M&A',
  'White Collar Defense & Investigations',
  'Antitrust & Competition',
  'Energy & Environmental',
  'Employment & Class Actions',
  'Appellate & Constitutional Law',
  'Healthcare & Regulatory'
];
