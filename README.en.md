# AIRA — AI Virtual Companion

🌐 **Language / Pilih Bahasa:** [🇮🇩 Bahasa Indonesia](README.md) • **🇬🇧 English**

---

A web-based AI virtual companion platform developed as a semester-long project for the **Web Programming** course (School of Computing, Telkom University). The project explores interactive virtual character interfaces, speech synthesis, and persistent memory, taking conceptual inspiration from [Project AIRI](https://github.com/moeru-ai/airi).

The application is built incrementally from Week 2 to Week 14 following the official course syllabus (HTML &rarr; Native CSS &rarr; Tailwind CSS &rarr; JavaScript DOM &rarr; React &rarr; NestJS &rarr; PostgreSQL + Prisma &rarr; AI API Integration &rarr; Full-Stack Deployment).

---

## Week 2 — Pure HTML Milestone

The focus for Week 2 is establishing semantic structure, tag completeness, and foundational accessibility without any CSS styling or JavaScript logic.

### Pages Overview

| Page | File | Description |
| :--- | :--- | :--- |
| **Live Stage** | `src/index.html` | Primary interactive stage inspired by AIRI. Features the central character stage (Hiyori Live2D), floating dark-teal chat drawer with message bubbles and input bar, corner telemetry table, and camera controls. |
| **Studio & Settings** | `src/settings.html` | Settings hub inspired by AIRI's settings list. Contains configuration cards for character persona (AIRA Card), visual models (VRM/Live2D), long-term memory vault table, LLM response mode options, and system toggles. |
| **Sign In** | `src/login.html` | Minimalist centered authentication interface modeled after AIRI's sign-in flow. Includes email and password input, terms notice, and account benefits comparison table. |

### Technical & Accessibility Compliance
* **Semantic HTML5:** Built using standard landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>`, and `<footer>`) rather than nested generic containers.
* **Form Accessibility:** All form controls (`<input>`, `<select>`, `<textarea>`) are linked to their corresponding `<label>` elements via matching `for` and `id` attributes.
* **Image Descriptions:** All `<img>` tags include descriptive `alt` text detailing character appearance and role.
* **Tabular Data:** Structured tables with `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, and `<th scope="row">` are implemented for character specs, session history, live metrics, and user memory entries.

---

## Week 3 — Native CSS & Responsive Milestone

Building upon the semantic HTML structure from Week 2, Week 3 introduces an external stylesheet (`src/style.css`) implementing pure native CSS (no frameworks). The design is faithfully inspired by the companion stage aesthetic of [Project AIRI](https://github.com/moeru-ai/airi) (`airi.moeru.ai`).

### Styling & Implementation Highlights
* **Visual Identity & Palette:** Inspired by AIRI's interface—featuring a dark canvas (`#141618`) with a subtle teal dot grid (`rgba(14, 75, 95, 0.35)`), a deep teal header (`#06475d`), and translucent glassmorphic card surfaces (`rgba(12, 42, 53, 0.92)`).
* **Organic Scallop Wave Header:** The top header features a custom repeating scallop wave silhouette along its bottom border, framing the stage seamlessly.
* **Immersive Character Stage:** The character model (Hiyori Live2D) is positioned directly on the stage canvas without bounding boxes, grounded naturally towards the bottom.
* **Glassmorphic Floating Chat Drawer:** Positioned on the right side with transparent dialogue bubbles, distinguishing AIRA's responses (deep teal card) from user messages (dark charcoal pill on the right), complete with a circular cyan send button and attachment controls.
* **Corner Widgets:** Telemetry metrics and stage controls are packaged into compact collapsible widgets (`<details>`) at the corners, keeping the center stage clear while preserving full tabular and form requirements.
* **Responsive Design (`@media` queries):** 
  - **Desktop:** Full dual-panel layout with central character stage and right-hand floating chat drawer.
  - **Mobile ($\le 768\text{px}$):** Mobile companion layout where the character stands centered, accompanied by a minimalist rectangular navbar with native session switcher and account access, and a neatly positioned floating conversation panel at the bottom.

---

## Week 4 — Tailwind CSS Integration Milestone

Continuing the semantic HTML and native CSS foundations from previous weeks, Week 4 integrates the **Tailwind CSS** utility framework to build a structured, modular, and responsive frontend skeleton.

### Implemented Page Skeleton
1. **Primary Stage / Dashboard (`src/index.html`):**
   - Utilizes Tailwind flexbox & grid utilities (`relative flex w-full overflow-hidden`, `flex-1 items-end justify-center`).
   - Presents an interactive character stage (Live2D Hiyori), floating chat drawer, and corner telemetry widget.
2. **Tabular & Data List Page (`src/settings.html`):**
   - Displays a structured **Memory Vault** table recording code, category, remembered user facts, priority, and action buttons.
   - Includes telemetry tables detailing active companion status.
3. **Form Pages (`src/login.html` & `src/settings.html`):**
   - **Sign In** page (`login.html`) featuring an authentication card with email and password inputs centered on screen.
   - **Add Memory** and **Character Profile** forms in `settings.html` equipped with text inputs, textareas, category dropdowns, and submission buttons.
4. **Responsive Navigation:**
   - Adaptive navbar linking the stage, settings & memory, and login pages, featuring back navigation links and a mobile-friendly session selector.

### Rationale for Choosing Tailwind CSS over Bootstrap
Based on the characteristics of **AIRA — AI Virtual Companion**, Tailwind CSS was selected as the layout framework because:
1. **Custom Design Freedom (*No Pre-baked Styles*):**  
   AIRA requires a distinctive *dark-teal companion & glassmorphism* visual identity inspired by Project AIRI. Bootstrap provides rigid, opinionated components that require extensive CSS overrides to match this aesthetic. Tailwind’s utility-first approach allows precise crafting of the virtual stage and speech bubbles without battling default component styles.
2. **Performance & Lightweight Production Bundle (*Automatic Tree-Shaking*):**  
   Tailwind scans project HTML/JS files and only generates utility classes that are actually used. This produces an exceptionally small production CSS bundle and ensures rapid initial page load times.
3. **Seamless Transition to React Components (Preparation for Week 6):**  
   The semester syllabus transitions the frontend to **React** in Week 6. Tailwind utility classes attach directly to JSX elements within modular components (e.g., `<MessageBubble>`, `<CharacterStage>`), enabling self-contained styling without scattered global CSS stylesheets.

---

## Screenshots (Desktop & Mobile Previews)

### 1. Live Stage (`src/index.html`)

| Desktop View (1568 &times; 882) | Mobile View (390 &times; 844) |
| :---: | :---: |
| ![Live Stage Desktop](docs/screenshots/index.png) | ![Live Stage Mobile](docs/screenshots/index-mobile.png) |

---

### 2. Studio & Settings (`src/settings.html`)

| Desktop View | Mobile View |
| :---: | :---: |
| ![Settings Desktop](docs/screenshots/settings.png) | ![Settings Mobile](docs/screenshots/settings-mobile.png) |

---

### 3. Sign In (`src/login.html`)

| Desktop View | Mobile View |
| :---: | :---: |
| ![Sign In Desktop](docs/screenshots/login.png) | ![Sign In Mobile](docs/screenshots/login-mobile.png) |

---

## Project Structure

```text
aira/
├── README.md                  # Project documentation (Bahasa Indonesia)
├── README.en.md               # Project documentation (English)
├── package.json               # npm dependencies and Tailwind CSS build scripts
├── tailwind.config.js         # Tailwind theme color tokens and utility configuration
├── docs/
│   └── screenshots/           # Weekly progress screenshots (desktop & mobile)
│       ├── index.png          # Live stage desktop preview
│       ├── index-mobile.png   # Live stage mobile preview
│       ├── settings.png       # Settings hub desktop preview
│       ├── settings-mobile.png # Settings hub mobile preview
│       ├── login.png          # Sign in desktop preview
│       └── login-mobile.png   # Sign in mobile preview
├── public/                    # Static assets
│   ├── images/                # Character models and avatars (Hiyori, Avatars)
│   └── models/
│       └── vrm/               # 3D model files (AvatarSample_A.vrm)
└── src/                       # Application source code
    ├── input.css              # Tailwind CSS input file (@tailwind directives)
    ├── tailwind.css           # Compiled Tailwind CSS output file
    ├── style.css              # AIRA custom native stylesheet (Week 3)
    ├── index.html             # Live stage / Dashboard page
    ├── settings.html          # Studio, Settings & Memory Vault Table
    └── login.html             # Authentication & Sign in form page
```

---

## Getting Started

To run and develop the AIRA project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/kaisaaru/aira.git
   cd aira
   ```
2. Install Tailwind CSS dependencies:
   ```bash
   npm install
   ```
3. Build the Tailwind stylesheet:
   ```bash
   npm run build:css
   ```
   *(Or run `npm run watch:css` during development for automatic rebuilding).*
4. Open `src/index.html` directly in any web browser, or launch a local static server:
   ```bash
   npx serve .
   ```

---

## Semester Roadmap

Official course syllabus roadmap (School of Computing, Telkom University):

### Week 1 — Konsep Dasar Web
- [x] Web architecture fundamentals
- [x] Client-server model & HTTP basics

### Week 2 — HTML
- [x] Semantic HTML structure
- [x] Home page (`index.html`)
- [x] Studio & settings page (`settings.html`)
- [x] Sign in page (`login.html`)
- [x] Form elements (inputs, labels with matching `for`/`id`, select, textarea, fieldsets)
- [x] Images with descriptive `alt` attributes
- [x] Tabular data (`table`, `caption`, `thead`, `tbody`, `th`, `td`)
- [x] Accessibility fundamentals
- [x] Screenshot documentation (`docs/screenshots/`)

### Week 3 — CSS
- [x] External stylesheet (`src/style.css`) linked across all pages
- [x] Color palette & visual identity inspired by Project AIRI
- [x] Typography hierarchy and font properties
- [x] Customized navigation pill buttons
- [x] Glassmorphic container cards
- [x] Chat bubble interface (AIRA card vs user pill)
- [x] Seamless centered character stage without bounding boxes
- [x] Responsive layout with `@media` queries (desktop & mobile views)
- [x] Desktop & mobile screenshot documentation (`docs/screenshots/`)

### Week 4 — Bootstrap + Tailwind
- [x] Tailwind CSS tooling & configuration (`package.json`, `tailwind.config.js`)
- [x] Utility-first styling integration alongside native design system
- [x] 1 Dashboard/Stage page with responsive grid & flex layout (`src/index.html`)
- [x] 1 Table/List data page featuring Memory Vault table (`src/settings.html`)
- [x] 1 Form page for authentication and memory entry (`src/login.html`)
- [x] Responsive navigation across all devices
- [x] Multi-device verification & screenshot documentation (desktop & mobile)
- [x] Documented rationale for choosing Tailwind over Bootstrap in README

### Week 5 — JavaScript & jQuery
- [ ] Interactive chat UI
- [ ] Dynamic message rendering
- [ ] Client-side form validation
- [ ] Character expression and mood toggles
- [ ] Local mock responses

### Week 6 — React Dasar
- [ ] React project initialization
- [ ] Component decomposition
- [ ] State management
- [ ] Chat and stage components
- [ ] Character studio components

### Week 7 — AJAX & Konsumsi API Eksternal/Mock
- [ ] API integration (Fetch / Axios)
- [ ] GET and POST workflows
- [ ] Loading and empty states
- [ ] Error handling
- [ ] Mock API endpoints

### Week 8 — UTS
- [ ] Project demonstration
- [ ] Code refactoring and linting
- [ ] Milestone documentation

### Week 9 — NestJS Dasar + Struktur MVC + (Perbandingan dengan PHP)
- [ ] NestJS backend initialization
- [ ] MVC architecture and module structure
- [ ] Base API endpoints
- [ ] Architectural comparison notes

### Week 10 — Implementasi REST API + PostgreSQL + ORM (Prisma)
- [ ] PostgreSQL database setup
- [ ] Prisma ORM integration and migrations
- [ ] Entity models (User, Character, Conversation, Message, Memory)
- [ ] CRUD operations

### Week 11 — JWT Auth + Keamanan Dasar
- [ ] User registration and login
- [ ] Password hashing with bcrypt
- [ ] JWT authentication guards
- [ ] Protected endpoints
- [ ] Basic web security practices

### Week 12 — Testing + Optimisasi Performa
- [ ] Backend unit and integration tests (Jest)
- [ ] Request validation using DTOs
- [ ] Authentication test suites
- [ ] Performance optimization

### Week 13 — Integrasi Layanan Kecerdasan Buatan (AI) Berbasis API
- [ ] Direct LLM API connection (Google Gemini / OpenAI)
- [ ] Character persona prompt engineering
- [ ] Long-term memory retrieval and injection
- [ ] Conversation persistence

### Week 14 — Deploy
- [ ] Production frontend build
- [ ] Backend deployment
- [ ] Cloud PostgreSQL instance
- [ ] Environment variables and CORS configuration
- [ ] Live demo deployment

### Week 15 — UAS - (1) / Responsi
- [ ] Project review and defense preparation
- [ ] Teaching assistant defense session

### Week 16 — UAS - (2)
- [ ] Final evaluation and course wrap-up
