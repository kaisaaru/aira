# AIRA — AI Virtual Companion

**Select Language:** [Bahasa Indonesia](README.md) • **English**

A web-based interactive AI virtual companion developed for the **Web Programming Course (Telkom University)**, conceptually and visually inspired by [Project AIRI](https://github.com/moeru-ai/airi).

---

## Getting Started

Ensure [Node.js](https://nodejs.org/) (v18+) is installed.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173/`.

---

## Directory Structure

```text
aira/
├── docs/                      # Weekly course documentation and screenshots
├── README.md                  # Documentation in Indonesian
├── README.en.md               # Documentation in English
└── frontend/                  # React Vite Project
    ├── .env.example           # Environment variable template
    ├── index.html             # Main HTML entry document
    ├── package.json           # Dependencies and build scripts
    ├── vite.config.js         # Vite configuration
    ├── public/                # Static assets (avatars, VRM models)
    └── src/
        ├── main.jsx           # React root renderer
        ├── App.jsx            # Main state container & settings view
        ├── style.css          # Authentic AIRI design system (Week 5 & 7)
        ├── tailwind.css       # Utility styles
        └── components/        # 7 Modular React Components:
            ├── Navbar.jsx           # Sticky top navigation bar
            ├── MemoryToolbar.jsx    # Stats summary & category filter
            ├── MemoryTable.jsx      # Tabular data & conditional rendering
            ├── MemoryRow.jsx        # Individual memory entry row
            ├── MemoryForm.jsx       # Controlled memory input form
            ├── ToastContainer.jsx   # Stacked notifications & progress bars
            └── CompanionWisdom.jsx  # External API consumption (Week 7)
```

---

## Weekly Milestones

### Week 2 — Semantic HTML
- Built standard HTML5 semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`).
- Implemented accessible forms with paired `<label>` and structured data tables with `<thead>`/`<tbody>`.

### Week 3 — Native CSS & Responsive Design
- Applied the dark-teal companion aesthetic (`style.css`) inspired by Project AIRI.
- Responsive multi-device layouts for desktop and mobile screens.

### Week 4 — Tailwind CSS Integration
- Adopted utility-first Tailwind CSS for structural grid alignment and UI skeletons.
- Prepared the component architecture for future React modularization.

### Week 5 — JS DOM & jQuery Animations
- Managed in-memory companion data using JavaScript arrays of objects.
- Integrated sliding forms (`slideToggle`), category filtering, delete modal dialogs, and toast notifications.

### Week 6 — React Fundamentals (Vite & State Management)
In full compliance with the Week 6 assignment specifications:
- **Project Setup**: Initialized using **React Vite** in pure JavaScript JSX (`.jsx`, strictly no TypeScript).
- **Core Entity**: Implemented the **Memory Vault** entity with attributes `id`, `category`, `fact`, and `priority`.
- **Modular Components**: Divided into 6 independent components in `frontend/src/components/` (`Navbar`, `MemoryToolbar`, `MemoryTable`, `MemoryRow`, `MemoryForm`, `ToastContainer`), interconnected via props.
- **State Management**:
  - Central `memories` array state managed in `App.jsx` and persisted to `localStorage`.
  - Tabular list rendering via `.map()` with unique `key={item.id}` attributes.
  - Controlled form component using `useState` with validation before state updates.
  - Conditional rendering: Displays the mandatory fallback message *"Belum ada data catatan memori. Tambahkan catatan baru melalui formulir di atas."* when the vault is empty.
  - Stacked toast notifications with animated duration progress bars and action-specific themes (**Blue** for save, **Red** for delete).

### Week 7 — Ajax & External / Mock API Consumption
In full compliance with the Week 7 assignment specifications:
- **API Endpoint Selection**: Consumes public REST API `https://dummyjson.com/quotes?limit=4`. Selected for its thematic fit with the AI companion (daily inspiration & dialog wisdom), zero CORS restrictions, and requiring no complicated auth keys.
- **State Flow & Code Implementation**:
  - `fetchQuotes(urlToFetch)`: Asynchronous function utilizing native `fetch()` to handle HTTP GET requests.
  - `isLoading` state: Boolean controlling loading indicator presentation (spinner animation & `GET` request details).
  - `error` state: Captures both network connection drops and non-OK HTTP status codes (e.g. `404 Not Found`).
  - `quotes` state: Holds fetched wisdom items rendered as structured cards (`.quotes-grid`) via `.map()` with unique `key={item.id}` attributes.
- **Interactivity & Retry Button**:
  - Interactive **Coba Lagi** (*Retry*) button displayed conditionally upon error state to re-trigger `fetchQuotes()`.
  - **Simpan ke Memori** action: Allows saving quotes directly into the local *Memory Vault* table (Week 6 integration).
  - Testing actions toolbar: Dedicated buttons (*Uji Simulasi Error API* and *Reset Endpoint Normal*) for test and screenshot verification.
- **Environment Variables**: Provided `frontend/.env.example` and `import.meta.env.VITE_QUOTES_API_URL` consumption with reliable fallback to the default endpoint URL.

---

## Documentation & Screenshots

### Week 7 Screenshots (Ajax & API Consumption)

|  No   | State Condition        | Description                                                         | Screenshot Path                                        |
| :---: | :--------------------- | :------------------------------------------------------------------ | :----------------------------------------------------- |
|   1   | **Loading State**      | Spinner animation and status message during async request execution | `docs/screenshots/week7/01-api-loading-state.jpeg`     |
|   2   | **Success State**      | Structured card grid rendering via `.map()` with unique keys        | `docs/screenshots/week7/02-api-success-state.jpeg`     |
|   3   | **Error State**        | Detailed error message along with mandatory "Coba Lagi" button      | `docs/screenshots/week7/03-api-error-state.jpeg`       |

### Week 6 Screenshots (React & State Management)

|  No   | Feature                | Description                                       | Screenshot Path                                             |
| :---: | :--------------------- | :------------------------------------------------ | :---------------------------------------------------------- |
|   1   | **Vite Setup**         | Terminal execution of `npm create vite@latest`    | `docs/screenshots/week6/01-installation-vite.jpeg`          |
|   2   | **Initial Vault List** | Settings page displaying active memory records    | `docs/screenshots/week6/02-memory-vault-initial-list.jpeg`  |
|   3   | **Form & Validation**  | Memory creation form with inline field validation | `docs/screenshots/week6/03-memory-vault-add-validation.jpeg`|
|   4   | **Empty State**        | Fallback message displayed when vault has no data | `docs/screenshots/week6/04-memory-vault-empty-state.jpeg`   |
