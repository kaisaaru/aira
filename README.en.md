# AIRA — AI Virtual Companion

🌐 **Language / Pilih Bahasa:** [🇮🇩 Bahasa Indonesia](README.md) • **🇬🇧 English**

---

A web-based AI virtual companion platform developed as a semester-long project for the **Web Programming** course (School of Computing, Telkom University). The project explores interactive virtual character interfaces, speech synthesis, and persistent memory, taking conceptual inspiration from [Project AIRI](https://github.com/moeru-ai/airi).

The application is built incrementally from Week 2 to Week 14 following the official course syllabus (HTML &rarr; Native CSS &rarr; Tailwind CSS &rarr; JavaScript DOM &rarr; React &rarr; NestJS &rarr; PostgreSQL + Prisma &rarr; AI API Integration &rarr; Full-Stack Deployment).

---

## Week 2 — Pure HTML Milestone

The focus for Week 2 is establishing semantic structure, tag completeness, and foundational accessibility without any CSS styling or JavaScript logic.

### Pages Overview

| Page                  | File                | Description                                                                                                                                                                                                             |
| :-------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Live Stage**        | `src/index.html`    | Primary interactive stage inspired by AIRI. Features the central character stage (Hiyori Live2D), floating dark-teal chat drawer with message bubbles and input bar, corner telemetry table, and camera controls.       |
| **Studio & Settings** | `src/settings.html` | Settings hub inspired by AIRI's settings list. Contains configuration cards for character persona (AIRA Card), visual models (VRM/Live2D), long-term memory vault table, LLM response mode options, and system toggles. |
| **Sign In**           | `src/login.html`    | Minimalist centered authentication interface modeled after AIRI's sign-in flow. Includes email and password input, terms notice, and account benefits comparison table.                                                 |

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

## Week 5 — JavaScript & jQuery Milestone (Client-Side Interactivity & UI Animations)

Building upon previous semantic and styling milestones, Week 5 integrates external script logic (`src/script.js`) and **jQuery 3.7.1** (via CDN) to introduce rich, dynamic client-side interactivity without creating new HTML pages.

### Technical Implementation & Features

#### 1. Pure JavaScript (Vanilla JS)

##### A. Data Structures & Response Dictionaries
* **`airaMemories` (Array of Objects):**  
  Maintains local dummy memory records representing what the companion remembers about the user. Each object contains `id` (unique memory code, e.g. `MEM-01`), `category` (Identitas, Minat, Kuliah), `fact` (the recalled information string), `priority` (Utama, Penting, Sedang), and `createdAt` (timestamp).
* **`airaResponses` (AI Companion Dialogue Dictionary):**  
  A structured response dictionary containing varied companion replies grouped into 4 contextual categories:
  - `greetings`: Welcoming opening greetings (e.g., *"Halo juga! Senang bisa ngobrol lagi denganmu hari ini."*, *"Hai Kaisar! Ada yang bisa AIRA bantu untuk sesi belajarmu?"*).
  - `tasks`: Academic encouragement and web development study support (e.g., *"Semangat untuk tugas praktikumnya! Jangan lupa istirahat sejenak dan minum air ya."*, *"Wah, progres web programming kamu makin keren! Mau diskusikan bagian apa sekarang?"*).
  - `relax`: Caring replies triggered when the user mentions fatigue or rest (e.g., *"Santai sejenak yuk. Mungkin mendengarkan musik santai bisa bikin pikiran lebih segar."*, *"Kalau sudah lelah ngoding, istirahatkan matamu sebentar ya, Kaisar."*).
  - `defaultReplies`: Adaptive general conversational replies (e.g., *"Menarik sekali! Ceritakan lebih banyak tentang itu."*, *"AIRA mengerti. Fakta dan percakapan ini akan selalu kuingat dalam memori."*).

##### B. Core Logic & Data Processing Functions
* **`calculateMemoryStats(memories)`:**  
  Receives an array of memory objects and performs a native `.forEach()` traversal to compute the total record count and aggregate priority tiers (`utama`, `penting`, `sedang`). Returns an aggregated summary object `{ total, utama, penting, sedang }`.
* **`filterMemoriesByCategory(memories, category)`:**  
  Filters memory records using native array `.filter()`. If the argument is `"all"` or empty, it returns the entire dataset; otherwise, it filters items matching the requested category case-insensitively (`toLowerCase()`).
* **`generateCompanionReply(userMessage)`:**  
  Analyzes incoming user chat text using keyword matching after lowercase normalization (`toLowerCase()`):
  - Contains greeting keywords (`halo`, `hai`, `pagi`, `siang`, `malam`) &rarr; picks randomly from `airaResponses.greetings`.
  - Contains task/coding keywords (`tugas`, `kuliah`, `coding`, `web`, `pr`) &rarr; picks randomly from `airaResponses.tasks`.
  - Contains rest/fatigue keywords (`capek`, `lelah`, `istirahat`, `ngantuk`) &rarr; picks randomly from `airaResponses.relax`.
  - Any other conversation topics &rarr; picks randomly from `airaResponses.defaultReplies`.  
  Random selection is calculated using `list[Math.floor(Math.random() * list.length)]`.
* **`getCurrentTimeString()`:**  
  Extracts the current system time via native `new Date()`, pads hours and minutes to 2 digits using `.padStart(2, "0")`, and returns a clean `"HH:mm"` timestamp.
* **`renderMemoryTable(data)`:**  
  Programmatically generates and injects HTML table rows into `#memory-table-body`:
  - Clears previous table content via `innerHTML = ""`.
  - Displays a dedicated empty state row (`<tr><td colspan="5">...</td></tr>`) when no entries match the active filter.
  - Loops via `.forEach()` to create `document.createElement("tr")`, sets the `data-id` attribute, styles priority badges (`#38bdf8` for Utama, `#2dd4bf` for Penting, `#94a8b3` for Sedang), attaches delete action buttons, and appends rows to the DOM via `appendChild(tr)`.
* **`updateMemoryStatsDisplay()`:**  
  Invokes `calculateMemoryStats(airaMemories)` and updates the `#memory-stats-summary` DOM element with color-coded priority totals.

---

#### 2. jQuery (Event Handling, Client-Side Validation & UI Animations)

All jQuery modules are wrapped inside `$(document).ready(function () { ... })` to ensure execution only after full DOM readiness:

##### A. Sign In Module (`src/login.html`)
* **Interactive Form Validation:** Intercepts `.on('submit')` on `.login-form` to prevent default form submission (`e.preventDefault()`) when inputs fail client-side checks.
* **Email & Password Verification:** Verifies non-empty fields and validates email formatting using Regular Expressions (`^[^\s@]+@[^\s@]+\.[^\s@]+$`).
* **Visual Inline Errors:** Erroneous inputs receive `.input-invalid` (red border and subtle glow), autofocuses the first invalid field (`.focus()`), and reveals inline error messages using jQuery `.slideDown(150)`.
* **Real-time Error Auto-Clear:** Input listeners `.on('input')` on email and password fields immediately clear red borders and slide up error messages (`slideUp(120)`) as soon as the user starts typing.

##### B. Interactive Stage Chat Module (`src/index.html`)
* **User Message Submission:** Handles chat form submission, verifies non-empty text, constructs `<article class="message-bubble user-message">`, appends it to `#chat-messages`, reveals it with `.fadeIn(300)`, and triggers auto-scrolling.
* **Typing Indicator Animation:** Shows the `#typing-indicator` bubble ("AIRA sedang mengetik...") via `.slideDown(200)` to simulate real-time AI processing.
* **Simulated AI Latency:** Employs an 800ms `setTimeout()` delay, slides the indicator away (`slideUp(150)`), synthesizes a response via `generateCompanionReply()`, injects the AI speech bubble (`ai-message`), reveals it with `.fadeIn(350)`, and scrolls the window down.
* **Chat Auto-Scroll:** The `scrollChatToBottom()` function animates `#chat-messages` scroll position using jQuery `.animate({ scrollTop: scrollHeight }, 300)`.
* **Keyboard Shortcut:** Textarea listener `.on('keydown')` enables quick message transmission upon pressing `Enter` (without `Shift`).

##### C. Memory Vault Module (`src/settings.html`)
* **Accordion Form Toggle:** Button `$("#toggle-memory-form-btn").on("click", ...)` smoothly toggles the add-memory form with jQuery `.slideToggle(300)`, updates the button label (`+ Tambah Catatan` &harr; `✕ Tutup Form`), and focuses the fact textarea.
* **Cancel Form:** Button `#cancel-memory-form-btn` slides the form up (`slideUp(250)`) and resets all error indicators.
* **Mandatory Fact Validation:** Submitting an empty fact highlights the textarea (`.input-invalid`) and slides down `#new-mem-error` with `.slideDown(150)`. Real-time typing clears the error with `.slideUp(120)`.
* **Dynamic Record Storage:** Valid submissions automatically generate sequential IDs (`MEM-04`), push records to `airaMemories`, re-render the table, update statistics, slide the form shut, and trigger a success toast notification.
* **Realtime Category Filter:** Dropdown listener `.on('change')` on `#filter-memory-category` filters table rows instantaneously without page reload.
* **Custom Confirmation Modal:**
  - Clicking a row's *Hapus* button captures the record ID and displays `#delete-modal` with jQuery `.fadeIn(200)` over a blurred backdrop.
  - Clicking *Batal* or the backdrop closes the modal via `.fadeOut(200)`.
  - Clicking *Ya, Hapus Catatan* closes the modal, smoothly fades out the target table row via `.fadeOut(350)`, removes the item from the data array, updates statistics, and triggers a deletion toast.
* **Floating Toast Notification (Kotori Style):**
  - Displays dynamic messages and Lucide-style SVG icons (cyan checkmark for additions, rose trash can for deletions).
  - Slides into view from the right (`.show`).
  - Animates linear progress bar depletion using jQuery `.animate({ width: "0%" }, duration, "linear")`.
  - Automatically retreats off-screen (`.hiding`) upon timeout or manual dismissal via `#close-toast-btn`.

---

### Video Demonstration

Interactive client-side workflows (login validation, live stage chat, Memory Vault CRUD, category filtering, and modal confirmations) are recorded in:

<video src="docs/videos/week5_desktop.mp4" controls width="100%">
  Your browser does not support the video tag. You can view or download the video directly at <a href="docs/videos/week5_desktop.mp4">docs/videos/week5_desktop.mp4</a>.
</video>

---

### Week 5 Interactivity Screenshots (Before vs After)

#### 1. Sign In Form Validation (`src/login.html`)
|            Before Interaction (*Before* — 00:00)            |            After Validation (*After* — 00:01)             |
| :---------------------------------------------------------: | :-------------------------------------------------------: |
| ![Login Before](docs/screenshots/week5/01-login-before.png) | ![Login After](docs/screenshots/week5/01-login-after.png) |
|            *Empty form before clicking "Masuk"*             |    *Red input borders and inline error text displayed*    |

---

#### 2. Live Stage Chat Interaction (`src/index.html`)
|           Before Interaction (*Before* — 00:09)           |            After Interaction (*After* — 00:19)            |
| :-------------------------------------------------------: | :-------------------------------------------------------: |
| ![Chat Before](docs/screenshots/week5/02-chat-before.png) |  ![Chat After](docs/screenshots/week5/02-chat-after.png)  |
|          *Chat drawer while typing user message*          | *User bubble, typing indicator, and animated AI response* |

---

#### 3. Toggle Add Memory Form (`src/settings.html`)
|                     Before Opening (*Before* — 00:22)                     |                     After Opening (*After* — 00:24)                     |
| :-----------------------------------------------------------------------: | :---------------------------------------------------------------------: |
| ![Toggle Form Before](docs/screenshots/week5/03-memory-toggle-before.png) | ![Toggle Form After](docs/screenshots/week5/03-memory-toggle-after.png) |
|                *Table view with "+ Tambah Catatan" button*                |                *Form smoothly revealed via slideToggle*                 |

---

#### 4. Add Memory Form Validation (`src/settings.html`)
|                        Before Submission (*Before* — 00:25)                         |                        After Validation (*After* — 00:26)                         |
| :---------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
| ![Memory Validation Before](docs/screenshots/week5/04-memory-validation-before.png) | ![Memory Validation After](docs/screenshots/week5/04-memory-validation-after.png) |
|                       *Fact textarea empty before submission*                       |                *Red input border and inline error message appear*                 |

---

#### 5. Dynamic Memory Addition & Floating Toast (`src/settings.html`)
|                    Before Submission (*Before* — 00:38)                     |                    After Submission (*After* — 00:40)                     |
| :-------------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
| ![Memory Submit Before](docs/screenshots/week5/05-memory-submit-before.png) | ![Memory Submit After](docs/screenshots/week5/05-memory-submit-after.png) |
|                   *Form filled with new fact ("MEM-04")*                    |     *Row appended dynamically, stats updated, & success toast shown*      |

---

#### 6. Memory Category Filtering (`src/settings.html`)
|                       Before Filtering (*Before* — 00:44)                       |                       After Filtering (*After* — 00:46)                       |
| :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| ![Category Filter Before](docs/screenshots/week5/06-memory-category-before.png) | ![Category Filter After](docs/screenshots/week5/06-memory-category-after.png) |
|                      *All categories displayed by default*                      |    *Table instantly filtered to selected category ("Identitas & Profil")*     |

---

#### 7. Custom Confirmation Modal & Memory Deletion (`src/settings.html`)
|                     Before Deletion (*Before* — 00:53)                      |               After Deletion Confirmation (*After* — 00:58)               |
| :-------------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
| ![Memory Delete Before](docs/screenshots/week5/07-memory-delete-before.png) | ![Memory Delete After](docs/screenshots/week5/07-memory-delete-after.png) |
|             *Custom modal dialog displayed with backdrop blur*              |         *Row faded out and deletion toast notification displayed*         |

---

## Page Screenshots (Week 4 Multi-Device Previews)

### 1. Live Stage (`src/index.html`)

|             Desktop View (1568 &times; 882)             |                 Mobile View (390 &times; 844)                 |
| :-----------------------------------------------------: | :-----------------------------------------------------------: |
| ![Live Stage Desktop](docs/screenshots/week4/index.png) | ![Live Stage Mobile](docs/screenshots/week4/index-mobile.png) |

---

### 2. Studio & Settings (`src/settings.html`)

|                       Desktop View                       |                          Mobile View                           |
| :------------------------------------------------------: | :------------------------------------------------------------: |
| ![Settings Desktop](docs/screenshots/week4/settings.png) | ![Settings Mobile](docs/screenshots/week4/settings-mobile.png) |

---

### 3. Sign In (`src/login.html`)

|                     Desktop View                     |                        Mobile View                         |
| :--------------------------------------------------: | :--------------------------------------------------------: |
| ![Sign In Desktop](docs/screenshots/week4/login.png) | ![Sign In Mobile](docs/screenshots/week4/login-mobile.png) |

---

## Project Structure

```text
aira/
├── README.md                  # Project documentation (Bahasa Indonesia)
├── README.en.md               # Project documentation (English)
├── package.json               # npm dependencies and Tailwind CSS build scripts
├── tailwind.config.js         # Tailwind theme color tokens and utility configuration
├── docs/
│   ├── videos/                # Interactive features demo video recordings
│   │   └── week5_desktop.mp4  # Week 5 desktop interactivity demonstration
│   └── screenshots/           # Progress screenshots
│       ├── week5/             # Before vs After interactivity evidence (Week 5)
│       └── week4/             # Multi-device previews from previous milestone (Week 4)
├── public/                    # Static assets
│   ├── images/                # Character models and avatars (Hiyori, Avatars)
│   └── models/
│       └── vrm/               # 3D model files (AvatarSample_A.vrm)
└── src/                       # Application source code
    ├── input.css              # Tailwind CSS input file (@tailwind directives)
    ├── tailwind.css           # Compiled Tailwind CSS output file
    ├── style.css              # AIRA custom native stylesheet (Week 3)
    ├── script.js              # Pure JavaScript logic & jQuery animations (Week 5)
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
- [x] Dynamic interactive chat UI with keyword-based mock companion responses
- [x] Native DOM message and memory table rendering (Vanilla JS)
- [x] Client-side form validation (inline error & realtime auto-clear)
- [x] Array of objects manipulation & data processing functions (filter, stats)
- [x] jQuery UI animations (slideToggle, fadeIn, fadeOut, slideDown, slideUp, animate)
- [x] Custom confirmation modal & floating toast notification
- [x] Before vs After screenshot comparison & video demonstration link

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
