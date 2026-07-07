CareerBridgeAI

🎯 PROJECT BRIEF
Build a full-stack web application called CareerForge AI — an AI-powered placement preparation and career intelligence platform for students. I am attaching:
A PDF product specification document (features, modules, tech stack, database schema).
17 reference UI screenshots of the exact pages I want built.
Your job: Recreate every screenshot pixel-faithfully as a real, working page (same layout, spacing, colors, typography, card structure, icons, and copy), wired into one cohesive React application with shared navigation, shared design tokens, and functional interactivity where indicated. Use the PDF only for feature/data-model context — the screenshots are the visual ground truth, don't deviate from their layout or design language.
---
🎨 GLOBAL DESIGN SYSTEM (extract this from the screenshots and apply everywhere)
Theme: Dark mode only. Background: near-black navy (`#0B0F17` / `#0D1117`-ish), card surfaces one shade lighter (`#111827`-ish) with subtle 1px borders (`rgba(255,255,255,0.08)`).
Accent color: Mint/emerald green (`#5FE3A0`-ish) for primary buttons, active nav states, progress bars, positive metrics, and the "CareerForge AI" logo text.
Secondary accents: Soft blue for informational badges/links, amber/orange for "in progress" or warning states, red/coral sparingly for alerts.
Typography: Clean sans-serif (Inter or similar). Large bold headings (28–36px), muted gray subtext under every page title, small uppercase tracked labels (e.g. "TOTAL STUDENTS", "RESUME SCORE") in low-opacity gray.
Layout shell: Persistent left sidebar (fixed, ~260px) with logo top, nav items with icons, "Analyze Resume" CTA button pinned near bottom, then Help Center / Logout links. Main content area scrolls independently. Some pages also have a top navbar variant (landing, login-adjacent public pages) — replicate per screenshot.
Cards: Rounded corners (~12–16px), subtle border, soft inner padding (~24px), sometimes a soft glow/border highlight color for "featured" or "AI insight" cards (green/blue/orange border accents as shown).
Charts: Bar charts, radial/circular progress rings, radar/capability matrix, heatmaps — all in flat, minimal, dark-mode style matching the screenshots' color palette.
Buttons: Solid mint-green primary buttons with dark text; secondary buttons are outlined/ghost with muted border.
Icons: Line-style icon set (lucide-react equivalent) consistent across sidebar and cards.
Footer: Repeated across all authenticated + public pages: "CareerForge AI © 2024 CareerForge AI. Empowering the next generation of talent." + links (Privacy Policy, Terms of Service, AI Ethics, Contact Support).
Build this as a shared design token / Tailwind config first (colors, spacing, radius, font sizes) so every page below reuses it consistently — don't restyle per page.
---
🗺️ SITEMAP & PAGE-BY-PAGE SPEC
Build these as separate routed pages/components. Reference the screenshot filename in each.
PUBLIC / UNAUTHENTICATED PAGES
1. Landing Page (`landing_page_careerforge_ai.png`)
Top navbar: logo, Dashboard/Resume/Interviews/Resources links, Sign In, Get Started button.
Hero: "Forge Your Future with AI" headline (green gradient on "with AI"), subtext, Get Started / Upload Resume / Watch Demo buttons, hero product mockup image with a floating "AI Suggestion" tooltip card.
"Trusted by" logo strip (muted institution names).
"Intelligent Toolkit" section: 6-card grid — AI Resume Analyzer, Skill Gap Analysis, Learning Roadmap, AI Mock Interview, Career Recommendations, Placement Readiness (this last one highlighted/outlined as featured).
Stats row: 50k+ Students Helped, 1.2M Resumes Analyzed, 200k+ Mock Interviews, 94% Success Rate.
Success Stories: 3 testimonial cards with avatar, quote, name, role/company.
Final CTA band: "Ready to Forge Your Career?" + Get Started Now button.
Footer as described above.
2. Sign In (`sign_in_careerforge_ai.png`)
Split screen: left side has a decorative futuristic humanoid/AI illustration + "CareerForge AI" tagline copy; right side is the auth card: "Welcome Back" heading, "Sign In with Google" button, divider "OR EMAIL", Email field, Password field (with show/hide eye icon), Remember Me checkbox, Forgot Password link, big green Sign In button, "Don't have an account? Get Started" link.
3. Register / Create Account (`register_careerforge_ai.png`)
Centered card on dark background: "Create Account" heading + subtext.
Fields: Full Name, University Email, Academic Branch (dropdown), Current Year (dropdown), Password, Confirm Password.
Checkbox: "I agree to the Terms of Service and Privacy Policy, including AI processing of my professional data."
Green "Register Account →" button.
Divider "OR JOIN WITH" → Google / LinkedIn buttons.
Small footer trust line about encryption.
AUTHENTICATED STUDENT PAGES (all share the left sidebar shell: Dashboard, Resume AI, Skill Gap, Mock Interview, Readiness, Settings — plus My Profile / Notifications where shown)
4. Student Dashboard (`dashboard_careerforge_ai.png`)
Greeting: "Good Morning, [Name]" + "Your career readiness has increased by 12% this week." + user avatar/name/role badge top right.
5 stat cards in a row: Resume Score, Skill Score, Placement Readiness (highlighted gradient card), Interview Score, Learning Progress — each with a small % change indicator.
"Skill Distribution" bar chart (Core Tech vs Soft Skills legend) + "Career Match" side panel with circular badge and % match tags (e.g. 98% Full Stack, 74% DevOps) + "View Full Report" button.
"Recent Activities" list (icon, title, subtext, timestamp) with "See All" link.
"Upcoming Interviews" card with date badge, title, "Join" button.
"Recommended Roles" list with match % and progress bars per role.
"AI Smart Pick" callout card at bottom with a specific action + "Start →" link.
5. Admin Dashboard (`admin_dashboard_careerforge_ai.png`)
Sidebar labeled "Premium Tier Admin" with Dashboard/Resume AI/Skill Gap/Mock Interview/Readiness/Settings.
Header: "Intelligence Overview" + search bar + notification bell + avatar.
4 stat cards: Total Students, Active Today (Live badge), Avg Resume Score (with toggle), Placement Readiness (highlighted, AI Insights label).
"Skill Trends Analysis" bar chart (Jan–Aug) with "Last 6 Months" filter.
"Live Activities" feed (colored dot + title + subtext + time ago).
"Talent Pipeline" data table: Student Name (avatar+email), Department, Resume Score, Interview Avg, Readiness (colored status dot: Highly Ready / In Progress), row actions (⋮), Filter/Export buttons, pagination footer.
6. AI Resume Analyzer — Upload (`ai_resume_analyzer_careerforge_ai.png`)
Page header "Resume AI Analyzer" + Download Report button + avatar.
Large dashed-border drop zone: upload icon, "Drop your resume here", supported formats text, "Select File" (primary) and "Scan URL" (secondary) buttons.
Empty state panel on the right (loading circle placeholder) for when analysis is running.
7. AI Resume Builder (`ai_resume_builder_careerforge_ai.png`)
Header: "AI Resume Builder" + status ("DRAFTING • FAANG MODERN TEMPLATE") + circular Readiness % + "AI Optimizer" button + share/download icons + green PDF export button.
Left: form panel — "Craft your future" heading, Personal Information (Full Name, Target Role, Professional Summary textarea with "AI Enhance" button), Experience section (Company, Duration, Key Accomplishments list with regenerate icons, "Auto-generate Bullet Points" button, "Add Experience"), Skills & Expertise chips with "AI Scan Job Desc" button.
Right: live resume preview (template switcher tabs: Modern/Academic/Creative, zoom controls) rendering the actual resume as a formatted document (name, title, contact info, summary, work experience, competencies, education).
Floating "AI Recommendation" tooltip card with a suggestion + "Apply Fixes" button.
8. Skill Gap Analysis (`skill_gap_analysis_careerforge_ai.png`)
Header: "Skill Gap Analysis" + subtext + Target Career Path dropdown + green "Run Analysis" button.
"Skill Match" circular readiness ring (%) + short summary text below it.
"Skill Distribution" list of skills with progress bars (Mastered/In Progress legend dots).
"Critical Gaps" card (orange border): High Impact / Medium Impact gap entries with description.
"Industry Benchmarks" card (blue border): You vs Avg comparisons (Publication Count, Years of Experience, Open Source Contribution).
"AI-Curated Learning Path" section: 3 resource cards (YouTube/Coursera/Interactive Lab thumbnails) with duration, level, and CTA links.
9. Career Intelligence (`career_intelligence_careerforge_ai.png`)
Header: "Career Intelligence" + "Intelligence Engine Active" badge + subtext.
"Profile Summary" card: avatar, name, title, Verified badge, extracted skill chips, key projects list with checkmarks, Resume Score with percentile.
"Capability Matrix" radar chart (Frontend/Backend/DevOps/Systems axes) + Primary Archetype + Growth Potential stat boxes.
"AI Career Insights" side panel: 3 short insight quote-cards + "Request Full Analysis" button.
"Career Match Analysis" section: 3 role-match cards (Full Stack Developer 96%, Frontend Engineer 89%, Backend Developer 84%) each with Market Demand tag, Est. Salary range, confidence score progress bar.
"Skill Acceleration Roadmap" banner card with recommended cert/skill chips + "Generate Personalized Roadmap" button.
Floating chat bubble icon bottom-right.
10. AI Career Coach (`ai_career_coach_careerforge_ai.png`)
Left sidebar with user card (name + Premium Tier), nav.
Center: chat interface — "AI Career Coach" heading, initial AI greeting message with 2 quick-reply suggestion cards ("Career Path", "Interview Prep"), user message bubble (right-aligned, green), AI response bubble (left-aligned, numbered actionable list with bold keywords), inline action buttons ("Deep Dive: Python", "Find Courses"), bottom input bar with attach/mic/send icons.
Right panel: "Career Intelligence" — Industry Insights cards, Trending Skills tag cloud, "Recommended for You" cert card with image, "Market Readiness" % with progress bar.
11. AI Mock Interview (`ai_mock_interview_careerforge_ai.png`)
Header: "Mock Interview" + subtext + user status badge ("IN-SESSION READY") + avatar.
Left panel: "Select Session" — 4 selectable type cards (Technical, HR/Culture, Behavioral, Aptitude) with icons, green "Start Interview Session" button, then live metric bars (Communication, Confidence, Accuracy with %) and an "AI Insights" card with Strength Detected / Improvement Area callouts.
Right/main panel: session status bar (SESSION ACTIVE, timer, step dots 1–4, "Question X of 10"), chat-style Q&A thread (AI question bubble left, user answer bubble right, timestamps), typing indicator (•••), bottom text input with attach/mic/send.
12. Learning Resources (`learning_resources_careerforge_ai.png`)
Top search bar + notification bell + avatar.
"Learning Resources" header with Target role badge + Skill Readiness % badge.
"Learning Momentum" bar chart (Mon–Sun) + "Saved for Later" bookmark list (thumbnail, title, meta, delete icon, "View All Bookmarks" link).
"AI Recommendations" — 4 highlighted cards (tags: High Priority / Missing Skill / Career Booster / Personalized) each with title, description, duration, bookmark icon, "Start Learning" button.
Filter chips row (All Topics/Frontend/Backend/AI-ML/System Design) + Difficulty/Platform dropdowns.
Course grid: 4 cards with thumbnail image, platform badge, title, instructor, progress bar %, time left, Continue/Start/Finish button.
"Load More Resources" button.
13. Learning Roadmap / Readiness Plan (`learning_roadmap_careerforge_ai.png`)
Header: "Full Stack AI Engineer" title + subtext (6-week plan, gaps identified) + Overall Progress % circular badge.
Vertical timeline: Week cards — completed (checkmark, 100% Done), in-progress (highlighted border, % completion, embedded resource pill buttons), locked (greyed, lock icon) — each with title, description, meta (hours/lessons/cert).
Right panel: "AI Career Insights" callout with "Adjust My Roadmap" button, "Selected Resources" list (icon, title, platform/duration, chevron), floating chat icon, "Milestones" list (claimed cert vs locked-in-future cert).
14. My Profile (`my_profile_careerforge_ai.png`)
Header: "My Profile" + Edit Profile / Download Resume buttons.
Left card: avatar (verified badge), name, degree/branch, social icons (GitHub/LinkedIn/portfolio), Placement Score with Top % label and progress bar, then 3 stacked stat cards (Resume Score, Skill Score, Readiness status).
Right: "Core Skills" card (skill bars + AI Verified badge + skill chips), "Top Projects" card (project name, description, tech tags), "Achievements" card (icon + title + subtext, timeline style), "Progress Journey" card — vertical timeline of dated milestones (Resume Uploaded, Roadmap Generated, Mock Interview Completed) each with description.
Floating chat icon bottom-right.
15. Notifications (`notifications_careerforge_ai.png`)
Top navbar (Dashboard/Resume/Interviews/Resources) + search + avatar.
"Notifications" header + "Mark all as read" link.
Filter pill tabs: All / Resume / Learning / Interviews / Achievements.
Grouped sections by date (Today / This Week / Earlier), each notification card has icon, bold title, description, timestamp, unread dot, and contextual action links (View Report, Dismiss, Review Feedback).
16. Placement Readiness (`placement_readiness_careerforge_ai.png`)
Top navbar variant + "Placement Readiness" header + "Live Analysis Active" badge.
"Overall Readiness Score" circular ring (82%) + Rank + Status stat boxes.
"Readiness Breakdown" 2x2 grid: Resume Power, Technical Proficiency, Mock Performance, Learning Velocity — each with progress bar + short italic note.
"Placement Probability" banner strip with % and certainty label.
"Skill Acquisition Heatmap" grid (color intensity = skill strength) with Low/High legend and month range labels.
"Performance Trends" card: Agility/Cognitive/Behavioral trend rows with up-arrow %.
"Milestone Timeline" (Completed / In Progress with bar / Locked entries).
"AI Coach Insights" card (orange border): quote-style feedback + "Recommended Action" sub-box + "Execute Next Step" button.
17. Settings (`settings_careerforge_ai.png`)
Header: "Settings" + language selector + dark mode toggle icon.
Left settings sub-nav: Account (active), Security, Notifications, Privacy, AI Preferences.
"Personal Information" card: Full Name, Email, Phone Number, Graduation Year fields.
"Security" card: Change Password row, Two-Factor Auth toggle.
"Resume Visibility" card: radio options — Public, Recruiters Only, Private (each with description).
"AI Intelligence Preferences" card: Preferred Career Domain tag input (removable chips + Add Domain), Target Companies text input with helper text, "Adaptive Skill Analysis" toggle with description.
Bottom action bar: "Discard Changes" text link + green "Save Changes" button.
---
⚙️ FUNCTIONAL / TECHNICAL REQUIREMENTS
Frontend: React + React Router + Tailwind CSS. Componentize the shared Sidebar, Topbar, Footer, StatCard, ProgressBar, Badge, Chart wrappers so all 17 pages reuse them instead of duplicating markup.
Charts: Use Recharts (or similar) for bar charts, radial progress, and radar chart. Build a custom heatmap grid component for the Skill Acquisition Heatmap.
State/Data: Use mock/sample JSON data matching exactly what's shown in each screenshot (same names, numbers, percentages) so the demo looks identical to the reference images. Structure this mock data so it's easy to later swap for real API calls.
Routing map:
`/` → Landing
`/sign-in`, `/register`
`/dashboard` (student), `/admin` (admin)
`/resume/analyze`, `/resume/build`
`/skill-gap`, `/career-intelligence`
`/coach`
`/interview`
`/learning/resources`, `/learning/roadmap`
`/readiness`
`/profile`
`/notifications`
`/settings`
Backend (if requested): FastAPI, matching the PDF's schema — Students, Resumes, Skills, Interviews, Jobs tables; JWT auth; endpoints for resume upload/parsing, skill-gap comparison, mock-interview session, notifications. AI calls (resume scoring, chat coach, gap analysis) go through a single `ai/` service layer so the model provider (Gemini/OpenAI) can be swapped.
Responsiveness: Sidebar collapses to icons or a hamburger drawer on mobile; stat card rows wrap to 2-column/1-column; charts stay legible on small screens.
Interactivity to actually implement (not just visual):
File upload on Resume Analyzer (accepts PDF/DOCX, shows loading state, then a result panel).
Live-editable form + preview sync on Resume Builder.
Working chat UI (send message → append bubble → simulated AI typing → response) on AI Career Coach and Mock Interview.
Filter/tab switching on Notifications, Learning Resources, Skill Gap resource tags.
Toggle switches and radio groups persist local state on Settings.
Sidebar active-route highlighting.
---
📁 EXACT PROJECT FOLDER STRUCTURE (use this exact layout — no vite/venv config files)
Generate the project with this precise file/folder structure. Do not invent a different structure, do not add extra top-level folders, and do not skip any file — create every file listed even if it starts empty, then fill it with the corresponding page/component/route code from the specs above.
CareerBridgeAI/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── ResumeAgent/agent.py
│   │   │   ├── SkillAgent/agent.py
│   │   │   ├── LearningAgent/agent.py
│   │   │   ├── InterviewAgent/agent.py
│   │   │   ├── CoachAgent/agent.py
│   │   │   └── JobAgent/agent.py
│   │   ├── ai/
│   │   │   ├── gemini_client.py
│   │   │   ├── embeddings.py
│   │   │   ├── rag.py
│   │   │   └── prompt_templates.py
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── resume.py
│   │   │   ├── skills.py
│   │   │   ├── interviews.py
│   │   │   ├── coach.py
│   │   │   ├── learning.py
│   │   │   ├── notifications.py
│   │   │   ├── analytics.py
│   │   │   └── admin.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── database/
│   │   │   ├── connection.py
│   │   │   └── base.py
│   │   ├── models/
│   │   │   ├── student.py
│   │   │   ├── resume.py
│   │   │   ├── skills.py
│   │   │   ├── interview.py
│   │   │   ├── job.py
│   │   │   └── notification.py
│   │   ├── schemas/
│   │   │   ├── student_schema.py
│   │   │   ├── resume_schema.py
│   │   │   ├── interview_schema.py
│   │   │   └── job_schema.py
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── resume_service.py
│   │   │   ├── skill_gap_service.py
│   │   │   ├── interview_service.py
│   │   │   └── notification_service.py
│   │   ├── utils/
│   │   │   ├── file_utils.py
│   │   │   └── pdf_parser.py
│   │   └── main.py
│   └── requirements.txt
├── database/
│   ├── migrations/
│   ├── seed/seed_data.sql
│   └── schema.sql
├── docs/
│   ├── SRS/SRS.pdf
│   ├── Architecture/Architecture.pdf
│   ├── PPT/
│   └── Report/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── logos/
│   │   │   └── icons/
│   │   ├── components/
│   │   │   ├── Sidebar/index.jsx
│   │   │   ├── Topbar/index.jsx
│   │   │   ├── Footer/index.jsx
│   │   │   ├── StatCard/index.jsx
│   │   │   ├── ProgressBar/index.jsx
│   │   │   ├── Badge/index.jsx
│   │   │   ├── Buttons/index.jsx
│   │   │   ├── Forms/index.jsx
│   │   │   ├── Charts/BarChart.jsx
│   │   │   ├── Charts/RadialProgress.jsx
│   │   │   ├── Charts/RadarChart.jsx
│   │   │   ├── Charts/Heatmap.jsx
│   │   │   ├── Chat/ChatWindow.jsx
│   │   │   └── Chat/ChatBubble.jsx
│   │   ├── pages/
│   │   │   ├── Landing/index.jsx            → Page 1
│   │   │   ├── SignIn/index.jsx             → Page 2
│   │   │   ├── Register/index.jsx           → Page 3
│   │   │   ├── Dashboard/index.jsx          → Page 4 (student)
│   │   │   ├── AdminDashboard/index.jsx     → Page 5
│   │   │   ├── ResumeAnalyzer/index.jsx     → Page 6
│   │   │   ├── ResumeBuilder/index.jsx      → Page 7
│   │   │   ├── SkillGap/index.jsx           → Page 8
│   │   │   ├── CareerIntelligence/index.jsx → Page 9
│   │   │   ├── AICoach/index.jsx            → Page 10
│   │   │   ├── MockInterview/index.jsx      → Page 11
│   │   │   ├── LearningResources/index.jsx  → Page 12
│   │   │   ├── LearningRoadmap/index.jsx    → Page 13
│   │   │   ├── Readiness/index.jsx          → Page 16 (Placement Readiness)
│   │   │   ├── Profile/index.jsx            → Page 14
│   │   │   ├── Notifications/index.jsx      → Page 15
│   │   │   └── Settings/index.jsx           → Page 17
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx     → wires the Routing map below to every page above
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useFetch.js
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   ├── authService.js
│   │   │   ├── resumeService.js
│   │   │   ├── skillGapService.js
│   │   │   ├── interviewService.js
│   │   │   ├── coachService.js
│   │   │   ├── learningService.js
│   │   │   └── notificationService.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── data/
│   │   │   ├── mockDashboard.json
│   │   │   ├── mockSkillGap.json
│   │   │   ├── mockInterview.json
│   │   │   └── mockNotifications.json
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
├── tests/
│   ├── frontend/
│   └── backend/
├── uploads/
│   ├── resumes/
│   └── profile_pictures/
├── .env
├── .gitignore
└── README.md
Placement rules for the AI builder
Every page in SITEMAP & PAGE-BY-PAGE SPEC maps 1:1 to a folder under `frontend/src/pages/` exactly as named above — do not rename, merge, or split these page folders.
Every reusable UI element described in the GLOBAL DESIGN SYSTEM (sidebar, topbar, footer, stat cards, progress bars, badges, charts, chat bubbles) must live in `frontend/src/components/` and be imported into pages — never re-implemented inline per page.
All chart types (bar chart, radial progress ring, radar/capability matrix, heatmap) go in `frontend/src/components/Charts/` as separate reusable files, imported wherever a screenshot shows that chart type.
Mock data used to replicate exact screenshot numbers (scores, percentages, names, activity feeds) goes in `frontend/src/data/*.json` — pages import from there, not hardcoded inline, so it's swap-ready for real API calls later.
`frontend/src/routes/AppRoutes.jsx` must implement the exact Routing map listed above, one `<Route>` per page.
Every backend feature (resume parsing, skill-gap comparison, mock interview sessions, AI coach chat, notifications, admin analytics) maps 1:1 to a file under `backend/app/api/` + a matching file in `backend/app/services/` + (where relevant) an agent under `backend/app/agents/` — keep this three-layer separation (route → service → agent) for every feature, don't collapse logic directly into the route file.
Do not generate `vite.config.js`, `venv/`, `node_modules/`, `.venv`, or any bundler/environment setup files — only the source files listed in the tree above. Environment variables go only in the single root `.env` file.
---
✅ DELIVERABLE
A single cohesive multi-page web app where every page listed above exists, visually matches its screenshot as closely as possible, shares one consistent design system, and is wired together with real navigation (sidebar links actually route to the corresponding pages). Use the attached PDF only to fill in labels/data/logic that aren't visible in the screenshots (e.g., exact DB fields, feature descriptions). When something in the PDF and a screenshot conflict, the screenshot wins.
