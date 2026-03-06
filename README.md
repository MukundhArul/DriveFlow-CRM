# DriveFlow CRM

> A modern lead management system built for **HSR Motors** — replacing spreadsheet chaos with a real-time, data-driven CRM.

**Product Analyst Assignment · DeltaX, Bangalore**

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-0055FF?logo=framer&logoColor=white)

---

## The Problem

HSR Motors manages hundreds of leads across Facebook, Google Ads, their website, and Twitter — all tracked in shared spreadsheets. This causes:

- **Version conflicts** between sales reps editing simultaneously
- **Slow response times** — leads go cold before anyone calls
- **Zero visibility** for the Business Manager into channel ROI or team performance
- **No pipeline tracking** — deals slip through the cracks

## The Solution

DriveFlow CRM gives every stakeholder exactly what they need:

| Persona | Need | DriveFlow Screen |
|---------|------|-----------------|
| **Business Manager** | KPIs, source ROI, team performance | Dashboard |
| **Sales Rep** | Find and call hot leads fast | Lead Listing |
| **Sales Rep** | Full customer context before a call | Lead Details |
| **Entire Team** | Visual deal progression | Pipeline |

---

## Features

### 📊 Dashboard
Real-time command center with KPI cards (total leads, conversion rate, revenue, active pipeline), lead source donut chart, 6-month trend analysis, weekly analytics bar chart, team leaderboard, and a live activity feed. Includes **CSV export** and **Add Lead** quick-action.

### 📋 Lead Listing
Searchable, filterable table with lead scoring (1–10 stars), status badges, source indicators, and one-click call buttons. On mobile, switches to a **card-based layout** for easy thumb navigation.

### 👤 Lead Details (360° View)
Complete contact info, star rating, interaction timeline with call durations, status updater, and quick actions — schedule test drive, send email, add notes. Everything a rep needs before picking up the phone.

### 🔀 Pipeline (Kanban Board)
Six-column drag-and-drop board: **New → Contacted → Test Drive → Negotiating → Won → Lost**. Toast notifications confirm every move. Horizontally scrollable on mobile for full kanban experience.

### ⚙️ Settings
Five-tab settings page — Profile, Notifications, Display (dark/light/system theme), Lead Management, and Security.

### 🌙 Dark Mode
System-aware theme toggle with full coverage across all components. Persists in localStorage.

### 📱 Mobile Responsive
Fully usable at 375px — stacked KPIs, card view for leads, scrollable pipeline, compact header with hamburger sidebar.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 18 with Vite 5 |
| **Styling** | Tailwind CSS 3.4 + Shadcn UI components |
| **Charts** | Recharts 2.10 (Pie, Bar, Area) |
| **Animations** | Framer Motion 10 |
| **Icons** | Lucide React |
| **Routing** | React Router DOM 6 |
| **State** | React Context (LeadsContext, ThemeContext, SidebarContext) |

---

## Quick Start

```bash
# Clone
git clone https://github.com/MukundhArul/DriveFlow-CRM.git
cd DriveFlow-CRM

# Install
npm install

# Run
npm run dev
```

Opens at `http://localhost:5173`

---

## Project Structure

```
src/
├── App.jsx                  # Layout shell, sidebar, header, routing
├── main.jsx                 # Entry point with context providers
├── index.css                # Tailwind base + dark mode overrides
├── components/
│   ├── Dashboard.jsx        # Analytics dashboard + Add Lead modal
│   ├── LeadListing.jsx      # Table (desktop) / Card list (mobile)
│   ├── LeadDetails.jsx      # 360° lead view with timeline
│   ├── Pipeline.jsx         # Drag-and-drop Kanban board
│   ├── Settings.jsx         # 5-tab settings page
│   └── ui/                  # Shadcn UI primitives (Button, Card, etc.)
├── context/
│   ├── LeadsContext.jsx      # Shared lead state (add, update, list)
│   └── ThemeContext.jsx      # Dark/light/system theme
├── data/
│   └── mockData.js           # 15 leads, 3 sales reps, analytics data
└── lib/
    └── utils.js              # Tailwind merge utility
```

---

## User Flow

### Business Manager
1. Opens **Dashboard** → reviews KPIs (1,247 leads · 32.8% conversion · ₹4.8 Cr revenue)
2. Checks **lead source chart** → Facebook drives the most leads → adjusts ad spend
3. Reviews **team leaderboard** → identifies top performer and who needs coaching
4. Clicks **Export** → downloads CSV for the monthly board meeting
5. Navigates to **Pipeline** → spots leads stuck in "Negotiating" → follows up

### Sales Rep
1. Opens **Lead Listing** → filters by "New" → sorts by lead score
2. Clicks **Rajesh Kumar** (score 9, Toyota Fortuner, ₹35–40L) → opens Lead Details
3. Reviews timeline → clicks **Call** → updates status to "Contacted"
4. Goes to **Pipeline** → drags lead from "New" to "Contacted" → toast confirms
5. Walk-in customer arrives → clicks **Add Lead** on Dashboard → fills form → done in 10 seconds

---

## Design Decisions

- **Blue primary palette** — trust and professionalism for an automotive CRM
- **Compact typography** (11–13px) — high information density without clutter
- **One-click actions** — call, export, add lead, drag-to-update — speed over ceremony
- **Collapsible sidebar** (240px ↔ 72px) — maximizes workspace for pipeline and tables
- **Mobile-first cards** — lead listing switches from table to card view below 768px

---

## Sample Data

Pre-loaded with **15 realistic leads** across all pipeline stages, **3 sales team members** with performance history, and **6 months of trend data** for analytics charts.

---

## Future Enhancements

- WhatsApp / email integration for automated follow-ups
- Google Calendar sync for test drive appointments
- Predictive lead scoring with ML
- Native mobile app for sales reps on the showroom floor

---

**Built for the DeltaX Product Analyst assignment · HSR Motors use case**
