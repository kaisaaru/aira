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
    ├── index.html             # Main HTML entry document
    ├── package.json           # Dependencies and build scripts
    ├── vite.config.js         # Vite configuration
    ├── public/                # Static assets (avatars, VRM models)
    └── src/
        ├── main.jsx           # React root renderer
        ├── App.jsx            # Main state container & settings view
        ├── style.css          # Authentic AIRI design system (Week 5)
        ├── tailwind.css       # Utility styles
        └── components/        # 6 Modular React Components:
            ├── Navbar.jsx           # Sticky top navigation bar
            ├── MemoryToolbar.jsx    # Stats summary & category filter
            ├── MemoryTable.jsx      # Tabular data & conditional rendering
            ├── MemoryRow.jsx        # Individual memory entry row
            ├── MemoryForm.jsx       # Controlled memory input form
            └── ToastContainer.jsx   # Stacked notifications & progress bars
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

---

## Documentation & Screenshots (Week 6)

|  No   | Feature                | Description                                       | Screenshot Path                                             |
| :---: | :--------------------- | :------------------------------------------------ | :---------------------------------------------------------- |
|   1   | **Vite Setup**         | Terminal execution of `npm create vite@latest`    | `docs/screenshots/week6/01-installation-vite.jpeg`          |
|   2   | **Initial Vault List** | Settings page displaying active memory records    | `docs/screenshots/week6/02-memory-vault-initial-list.jpeg`  |
|   3   | **Form & Validation**  | Memory creation form with inline field validation | `docs/screenshots/week6/03-memory-vault-add-validation.jpeg`|
|   4   | **Empty State**        | Fallback message displayed when vault has no data | `docs/screenshots/week6/04-memory-vault-empty-state.jpeg`   |
