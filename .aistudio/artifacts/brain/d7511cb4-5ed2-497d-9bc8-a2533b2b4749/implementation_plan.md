# LexGuild: Verified Attorney Social Network & Case Referral Exchange

A sovereign, verified digital fraternity and referral network designed exclusively for licensed attorneys. LexGuild connects legal practitioners through authenticated Bar admission credentials, high-value case referral desks, peer legal precedent discussions, and attorney-to-attorney direct consultation.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following core design decisions have been established based on your preferences:
> - **Primary Platform Focus**: Case referrals, peer discussions, and legal insights with conflict-safe workflows.
> - **Verification & Identity**: Bar admission number verification with jurisdiction badges, admission year, and practice tags.
> - **Visual Style & Aesthetic**: Sovereign Navy (`#0C162C`) and Warm Burnished Gold (`#C5A059`) with refined editorial typography, generous whitespace, and strict anti-slop zero-pill discipline.
> - **Persona Switcher**: Includes an instant demo attorney switcher so you can immediately experience the platform from different perspectives (e.g., NY Commercial Litigator, California IP/Tech Counsel, Delaware Corporate Partner, DC Appellate Attorney) or customize your own credential profile.

---

## 1. Overview & Core Concept

### What It Does
LexGuild is an exclusive social network and professional referral exchange restricted to verified legal practitioners. It replaces noisy generalist networks with an authoritative, dignified environment tailored to the ethical and operational realities of legal practice:
1. **Verified Bar Credentialing**: Attorney profiles validated by Bar admission numbers, jurisdictions, admitted courts (e.g., SDNY, 9th Circuit, SCOTUS), and practice areas.
2. **Case Referral Exchange (The Referral Desk)**: A specialized, structured marketplace where attorneys post outbound matters requiring local counsel or specialized expertise, review conflict-cleared peer proposals, and track co-counsel fee split agreements in compliance with ABA Model Rule 1.5(e).
3. **The Docket (Peer Discussion & Insights Feed)**: Curated legal discourse covering case precedents, emerging statutory shifts, court intel, and tactical briefs, with formal peer reactions ("Sound Precedent", "Distinguishable", "Cites Authority").
4. **Attorney Direct Consultations & Chambers**: Private peer-to-peer messaging for co-counsel inquiries, case handoffs, and confidential peer consultation.
5. **Bar Registry & Directory**: Multi-dimensional filtering by jurisdiction, admitted courts, practice specialties, and availability for referrals.

### Target Audience & Persona
- Practicing attorneys, law firm partners, solo practitioners, of-counsel, and corporate general counsel seeking trusted peer collaboration and out-of-jurisdiction referral partners.

### Key Value
- **Zero Noise, Maximum Trust**: Absolute assurance that every participant holds active Bar credentials.
- **Monetizable Practice Growth**: Efficient outbound and inbound case referral routing with transparent fee-sharing and conflict compliance.
- **Rigorous Intellectual Exchange**: Thoughtful, citation-backed legal commentary without social media clutter.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Color Palette (60-30-10 Distribution)**:
  - **60% Dominant Field**: Deep Sovereign Midnight Navy canvas (`#080E1A` dark / `#F8FAFC` crisp ivory-pearl in light mode) paired with executive navy card surfaces (`#0F1B33` / `#FFFFFF`).
  - **30% Structural Surfaces**: Refined slate-navy borders (`#1E2D4A` / `#E2E8F0`), hairline divider rules, and muted secondary text (`#94A3B8` / `#64748B`).
  - **10% Sovereign Accent**: Warm Burnished Gold (`#C5A059`, hover `#D4AF37`, subtle tint `#FBF8F1`), denoting verification seals, primary actions, and prestigious admission markers.
- **Typography & Hierarchy**:
  - **Display & Section Headlines**: High-character editorial legal serif (`Cormorant Garamond` / `Playfair Display`), conferring historical weight, precision, and judicial dignity.
  - **Body Prose & Interfaces**: Authoritative, legible geometric sans (`Plus Jakarta Sans`), calibrated for legal briefs, referral summaries, and metadata scannability.
  - **Bar Numbers, Dockets & Currency**: Strict tabular figures (`font-mono tabular-nums`) for Bar IDs, matter valuations, case citations, and referral percentages.
- **Zero-Pill & Metadata Discipline**:
  - No static pill capsules or candy-colored badges.
  - All credential metadata (Bar number, jurisdiction, admissions, years of practice) is displayed as clean unboxed text separated by typographic interpuncts (`NY Bar #4892182 · Southern District of New York · Admitted 2012`).
  - Interactive tabs and filters use understated segmented buttons or subtle underline tabs.
- **Top Bar Contract**:
  - Zone 1: Single clean wordmark ("LEXGUILD", with subtle gold scale-of-justice insignia).
  - Zone 2: Navigation tabs ("The Docket", "Referral Desk", "Chambers Directory", "Debriefs & Precedents").
  - Zone 3: Primary action ("+ New Referral" or "+ Post Insight") and Verified Attorney Profile Switcher with active Bar badge.

### Key User Flows
1. **Exploring The Docket**: Filter discussions by All, Case Law, Practice Inquiries, Referrals, and Court Intel. Interact via legal endorsements ("Sound Precedent", "Distinguishable"), write citation-rich replies, and bookmark briefs.
2. **Posting & Reviewing Case Referrals**:
   - Post an outbound matter specifying matter type, jurisdiction, estimated claim value, conflict check requirements, and fee-sharing basis.
   - Review inbound proposals from peer attorneys showing their Bar standing, trial track record, and fee acceptance.
3. **Attorney Profile & Bar Verification Audit**:
   - Inspect complete attorney dossiers: Bar admission details, disciplinary record clearance, verified court admissions, representative matters, and peer recommendations.
4. **Peer Direct Consultations**:
   - Initiate a private consultation channel with an attorney, review mutual conflict clearances, and coordinate case intake.

---

## 3. Key Product Decisions & Trade-Offs

| Decision | Chosen Approach | Why | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| **Verification Simulation** | Interactive Bar Credential Switcher + Live Bar Lookup Form | Lets the user test the network as diverse verified attorneys (e.g. Corporate Partner, Trial Lawyer, IP Counsel) while allowing instant registration of custom Bar credentials. | Static single profile (too limited to demonstrate cross-jurisdiction referrals). |
| **Referral Marketplace Architecture** | Structured Workflow (Intake -> Conflict Check -> Proposal Review -> Engagement) | Mimics real ABA Model Rule 1.5(e) compliance where referral fees require client disclosure and conflict clearance. | Unstructured public forum posts (lacks ethical compliance and professional structure). |
| **State Persistence** | Reactive LocalStore with Realistic Legal Seed Data | Instant responsiveness, offline capability, zero external auth blockers, and immediate full-featured experience. | Remote database requiring live login friction on first load. |
| **Aesthetic Direction** | Sovereign Navy & Burnished Gold with Editorial Serif | Projects trust, gravitas, and institutional excellence suited for high-stakes counsel. | Standard generic blue corporate SaaS (looks like generic enterprise software, not an elite bar society). |

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            LEXGUILD APPLICATION                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  TOP BAR CONTRACT: Wordmark · Nav Links · Profile / Persona Switcher · Post │
├───────────────────────────────┬─────────────────────────────────────────────┤
│  NAVIGATION & VIEWS           │  ACTIVE VIEWPORT                            │
│  ├─ 1. The Docket (Feed)      │  ┌───────────────────────────────────────┐  │
│  ├─ 2. Referral Desk (Market) │  │  Curated Feed / Referral Exchange /   │  │
│  ├─ 3. Bar Directory (Search) │  │  Attorney Profile / Private Chambers  │  │
│  └─ 4. Precedents & Debriefs  │  └───────────────────────────────────────┘  │
├───────────────────────────────┴─────────────────────────────────────────────┤
│  SHARED CLIENT STATE (Store & React Context)                                │
│  ├─ Current User Persona & Bar Verification (Bar #, Jurisdiction, Standing) │
│  ├─ Feed Posts & Threaded Legal Commentary (Citations, Endorsements)        │
│  ├─ Case Referrals & Inbound Bid Proposals (Conflict status, Fee splits)    │
│  ├─ Private Chambers Direct Consultations (Model Rule 1.6 secure chats)     │
│  └─ Attorney Directory & Court Admissions Registry                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core Data Models

- **Attorney Profile (`Attorney`)**:
  - `id`: string
  - `fullName`: string
  - `title`: string (e.g., "Senior Partner", "Founding Counsel")
  - `firm`: string
  - `location`: string (e.g., "New York, NY")
  - `barNumber`: string (e.g., "NY #4892182")
  - `jurisdictions`: array of `{ state: string, year: number, status: 'Active - Good Standing' }`
  - `courtAdmissions`: string[] (e.g., "U.S. Supreme Court", "S.D.N.Y.", "2nd Cir.")
  - `practiceAreas`: string[] (e.g., "Securities Litigation", "White Collar", "IP")
  - `avatarUrl`: string
  - `bio`: string
  - `referralStats`: `{ referredCount: number, receivedCount: number, rating: number }`

- **Case Referral (`CaseReferral`)**:
  - `id`: string
  - `title`: string
  - `practiceArea`: string
  - `jurisdiction`: string
  - `referringAttorneyId`: string
  - `clientType`: string ("Commercial Enterprise" | "Individual" | "Tech Startup")
  - `matterValueRange`: string (e.g., "$500,000 – $1.5M")
  - `feeSplitStructure`: string (e.g., "25% Co-Counsel Fee pursuant to Rule 1.5(e)")
  - `conflictCheckRequired`: boolean
  - `description`: string
  - `deadline`: string
  - `status`: `'open'` | `'reviewing'` | `'engaged'` | `'closed'`
  - `proposalsCount`: number
  - `proposals`: array of proposals submitted by peer attorneys

- **Docket Post (`DocketPost`)**:
  - `id`: string
  - `authorId`: string
  - `category`: `'Precedent & Analysis'` | `'Practice Inquiry'` | `'Case Law Debrief'` | `'Court Intel'` | `'Ethics & Practice'`
  - `title`: string
  - `content`: string
  - `statuteOrCitation`: string (e.g., "28 U.S.C. § 1332(a)", "Civ. R. 12(b)(6)")
  - `jurisdictionTag`: string
  - `createdAt`: string
  - `endorsementsCount`: number ("Sound Precedent")
  - `distinguishCount`: number ("Distinguishable")
  - `commentCount`: number
  - `comments`: array of threaded legal responses

- **Chambers Message (`ChambersMessage`)**:
  - `id`: string
  - `threadId`: string
  - `senderId`: string
  - `recipientId`: string
  - `content`: string
  - `attachmentName`?: string
  - `timestamp`: string
  - `confidentialityNotice`: boolean

---

## 5. Execution Steps & Verification Checklist

1. **Step 1: Visual Design & Typography Configuration**
   - Inject Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`, `Cinzel`) into `index.html`.
   - Update `metadata.json` and `index.html` title & meta tags to "LexGuild — The Verified Attorney Network".
   - Setup custom color variables and utility tokens in `src/index.css` for Sovereign Navy and Warm Gold.
2. **Step 2: Mock Legal Data & State Management**
   - Build comprehensive seed data representing distinguished attorneys across major legal capitals (NY, CA, DE, DC, TX, London).
   - Implement persistent state store for Feed posts, Referrals, Inbound proposals, Directory, and Messages.
3. **Step 3: Component Architecture**
   - `Navbar`: 3-zone contract with brand wordmark, clean text navigation, and active attorney credential switcher.
   - `TheDocket`: Feed view with category filters, citation headers, rich author bar tags, endorsement handlers, and modal for authoring new legal insights.
   - `ReferralDesk`: Case referral board with filters by jurisdiction and specialty, detailed matter intake drawer, proposal submission modal with conflict verification, and referral status tracker.
   - `ChambersDirectory`: Attorney search with multi-jurisdiction filters, court admission badges, and direct consult trigger.
   - `DirectChambers`: Secure messaging view between attorneys with confidential intake markers.
   - `AttorneyProfileModal`: Full credential dossier with Bar registry verification stamp, representative matters, and peer recommendations.
4. **Step 4: Quality & Anti-Slop Audit**
   - Verify zero unboxed pill badges for metadata (all clean text with `·` separators).
   - Verify all buttons and tabs have working click handlers.
   - Verify tabular numerals on all Bar IDs, docket numbers, and fee percentages.
   - Verify WCAG AA contrast on Sovereign Navy & Gold surfaces.
5. **Step 5: Compilation & Live Dev Server Verification**
   - Run `compile_applet` and verify 100% clean TypeScript build.
