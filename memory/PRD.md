# Resume.aii — PRD

## Original Problem Statement
Build a website where users enter their details and it generates the best ATS-friendly resume which passes all screening rounds with the best format. Include option to upload a previous resume and pull all details from it.

## Architecture
- **Frontend**: React (CRA + Tailwind + Shadcn/UI + Framer Motion)
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (Motor async driver)
- **AI**: OpenAI GPT-4.1 via Emergent LLM Key (resume parsing + content enhancement)

## User Personas
- Job seekers looking for ATS-optimized resumes
- Professionals updating their resumes
- Students creating first resumes

## Core Requirements (Static)
1. Multi-section resume form (Contact, Summary, Experience, Education, Skills, Projects, Certifications, Languages)
2. Upload existing resume (PDF/DOCX) → AI parses and auto-fills form
3. 3 ATS-friendly templates (Classic, Modern, Minimal)
4. Live preview that updates as user types
5. PDF download
6. ATS Score Meter (gamification)
7. AI-powered text enhancement for bullet points/summaries

## What's Been Implemented (Feb 2026)
- [x] Landing page with hero, features bento grid, how-it-works, CTA sections
- [x] Builder page with split-screen layout (form left, preview right)
- [x] Multi-tab form: Contact, Summary, Work, Education, Skills, More (Projects/Certifications)
- [x] 3 resume templates: Classic, Modern, Minimal
- [x] Live preview with template switching
- [x] ATS Score Meter with real-time scoring and tips
- [x] Resume upload modal (drag & drop PDF/DOCX)
- [x] AI resume parsing via OpenAI GPT-4.1
- [x] AI text enhancement for summaries and experience descriptions
- [x] Save resume to MongoDB
- [x] PDF download via react-to-print
- [x] Mobile responsive with form/preview toggle
- [x] "Resume.aii" branding

## Prioritized Backlog
### P0 (Critical) — Done
- All core features implemented

### P1 (High)
- User authentication for saving multiple resumes
- Resume version history
- Job description matching / keyword analysis

### P2 (Medium)
- Additional templates (5+)
- Cover letter generator
- LinkedIn profile import
- Multi-language resume support
- DOCX export

### P3 (Nice to have)
- Shareable resume links
- Resume analytics (views, downloads)
- A/B testing templates
- Team/enterprise features

## Next Tasks
1. Add job description keyword matching to improve ATS score
2. Add user accounts to save/manage multiple resumes
3. Add more template varieties
