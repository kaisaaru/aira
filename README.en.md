# AIRA - AI Virtual Companion

**Select Language:** [Bahasa Indonesia](README.md) • **English**

A web-based interactive AI virtual companion developed for the **Web Programming Course (Telkom University)**, conceptually and visually inspired by [Project AIRI](https://github.com/moeru-ai/airi).

---

## Getting Started

Ensure [Node.js](https://nodejs.org/) (v18+) and **PostgreSQL** are installed.

```bash
# 1. Run Backend (NestJS + Prisma + PostgreSQL)
cd backend
cp .env.example .env      # Adjust DATABASE_URL if needed
npm install
npx prisma migrate dev    # Apply migrations to PostgreSQL
npm run start:dev         # Runs on http://localhost:3001

# 2. Run Frontend (React + Vite) in a separate terminal
cd frontend
npm install
npm run dev               # Runs on http://localhost:5173
```

Open your browser at `http://localhost:5173/`.

---

## Directory Structure

```text
aira/
├── docs/                      # Weekly course documentation and screenshots
├── README.md                  # Documentation in Indonesian
├── README.en.md               # Documentation in English
├── backend/                   # NestJS Project (MVC, REST API, Prisma & JWT Auth)
│   ├── .env.example           # DATABASE_URL & JWT_SECRET template
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema models (Memory & User)
│   │   └── migrations/        # PostgreSQL migration history
│   ├── src/
│   │   ├── main.ts            # Application bootstrap, helmet, CORS & ValidationPipe
│   │   ├── prisma/            # PrismaService & PrismaModule (global provider)
│   │   ├── auth/              # Register, bcrypt login, JWT, Guard & rate limit
│   │   └── memories/          # Protected Memory CRUD & stats resource
│   └── test-api.http          # REST Client request collection
└── frontend/                  # React Vite Project
    ├── .env.example           # Environment variable template
    ├── index.html             # Main HTML entry document
    ├── package.json           # Dependencies and build scripts
    ├── vite.config.js         # Vite configuration
    ├── public/                # Static assets (avatars, VRM models)
    └── src/
        ├── main.jsx           # React root renderer
        ├── App.jsx            # Main state container, JWT session & settings view
        ├── style.css          # Authentic AIRI design system (Week 5 & 7)
        ├── tailwind.css       # Utility styles
        └── components/        # 8 Modular React Components:
            ├── Navbar.jsx           # Sticky top bar, user badge & logout action
            ├── AuthPanel.jsx        # Login & Register form (JWT Auth)
            ├── MemoryToolbar.jsx    # Stats summary & category filter
            ├── MemoryTable.jsx      # Tabular data & conditional rendering
            ├── MemoryRow.jsx        # Individual memory entry row
            ├── MemoryForm.jsx       # Controlled memory input form
            ├── ToastContainer.jsx   # Stacked notifications & progress bars
            └── CompanionWisdom.jsx  # External API consumption (Week 7)
```

---

## Weekly Milestones

### Week 2: Semantic HTML
- Built standard HTML5 semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`).
- Implemented accessible forms with paired `<label>` and structured data tables with `<thead>`/`<tbody>`.

### Week 3: Native CSS & Responsive Design
- Applied the dark-teal companion aesthetic (`style.css`) inspired by Project AIRI.
- Responsive multi-device layouts for desktop and mobile screens.

### Week 4: Tailwind CSS Integration
- Adopted utility-first Tailwind CSS for structural grid alignment and UI skeletons.
- Prepared the component architecture for future React modularization.

### Week 5: JS DOM & jQuery Animations
- Managed in-memory companion data using JavaScript arrays of objects.
- Integrated sliding forms (`slideToggle`), category filtering, delete modal dialogs, and toast notifications.

### Week 6: React Fundamentals (Vite & State Management)
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

### Week 7: Ajax & External / Mock API Consumption
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

### Week 9: NestJS Fundamentals & MVC Structure
Implemented according to the Week 9 practical assignment:
- **NestJS Backend**: Added a separate backend application in `backend/`, running at `http://localhost:3001`.
- **Main Resource**: Manages the **Memory Note** entity with `id`, `category`, `factText`, `importance`, `isActive`, and `createdAt` fields.
- **MVC Structure**: Separates `MemoriesController`, `MemoriesService`, Entity, and DTO inside the `memories` module.
- **CRUD Operations**: Provides `GET`, `POST`, `PATCH`, and `DELETE` endpoints under `/memories`, using an in-memory array as temporary storage.
- **DTO Validation**: Uses `class-validator` for category, fact content, text length, numeric type, and priority range validation from 1 to 5.
- **Error Handling**: Uses `NotFoundException` for missing IDs and `ConflictException` for duplicate memory facts.
- **Frontend Integration**: The React frontend uses `fetch()` for a complete create, read, update, and delete memory flow.
- **REST Client Testing**: Provides endpoint requests and error scenarios in `backend/test-api.http` before frontend integration.

### Week 10: REST API + PostgreSQL + ORM (Prisma)
Implemented according to the Week 10 practical assignment:
- **Local PostgreSQL Setup**: Created the local `aira_db` database and configured NestJS connection via `DATABASE_URL` (`backend/.env.example`).
- **Prisma Schema (`backend/prisma/schema.prisma`)**: Designed the primary `Memory` model (`id`, `category`, unique `factText`, `importance`, `isActive`, `createdAt`, `updatedAt`).
- **Database Migration**: Executed `npx prisma migrate dev --name init` and verified the `"Memory"` and `_prisma_migrations` tables in PostgreSQL.
- **`PrismaService` Provider**: Created global `PrismaService` & `PrismaModule` (`backend/src/prisma/`), injected into `MemoriesService` to replace the in-memory array **without modifying `MemoriesController`**.
- **Persistent CRUD**: All CRUD endpoints (`POST`, `GET`, `GET :id`, `PATCH :id`, `DELETE :id`) run on Prisma Client and persist data across server restarts.
- **Advanced Query Endpoint (Bonus)**: Added `GET /memories/stats` (via `MemoriesStatsController`) using `count`, `groupBy`, and `where` with optional `?category=...&minImportance=...` filters.

### Week 11: JWT Auth + Basic Security
Implemented according to the Week 11 practical assignment:
- **Registration & Login with `bcrypt`**: Added the `User` model (`@@map("users")`) in `backend/prisma/schema.prisma` along with `POST /auth/register` and `POST /auth/login` in `AuthModule`, hashing passwords with `bcrypt` (10 salt rounds).
- **JWT & `Authorization: Bearer` Header**: Successful logins issue a signed JWT `accessToken` via `@nestjs/jwt`. The React frontend (`AuthPanel.jsx` & `App.jsx`) stores the token and sends `Authorization: Bearer <token>` on every `/memories` CRUD request.
- **Protected Private Endpoints (`JwtAuthGuard`)**: Applied `@UseGuards(JwtAuthGuard)` to `MemoriesController`, `MemoriesStatsController`, and `GET /auth/me`, returning `401 Unauthorized` when tokens are missing or invalid.
- **Basic Security Hardening**:
  - **Security Headers (`helmet`)**: Enabled in `backend/src/main.ts` (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Strict-Transport-Security`).
  - **Rate Limiting (`@nestjs/throttler`)**: Applied to `POST /auth/login` (5 requests per minute) to mitigate brute-force attacks and return `429 Too Many Requests`.
- **Threat Mitigation (SQL Injection & XSS)**:
  - **SQL Injection**: All queries go through Prisma Client parameterized queries paired with strict DTO validation (`ValidationPipe` with `whitelist` and `forbidNonWhitelisted`).
  - **XSS**: React automatically escapes JSX output without `dangerouslySetInnerHTML`, reinforced by `helmet` security headers.

## Documentation & Screenshots

### Week 11 Screenshots (JWT Auth & Basic Security)

|  No   | Stage                            | Description                                                                   | Screenshot Path                                           |
| :---: | :------------------------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------- |
|   1   | **Login & JWT `accessToken`**    | `POST /auth/login` response with `accessToken`, rate limit & `helmet` headers | `docs/screenshots/week11/01-login-access-token.jpeg`      |
|   2   | **Protected Endpoint (`401`)**   | `GET /memories` without token rejected with `401 Unauthorized`                | `docs/screenshots/week11/02-unauthorized-401.jpeg`        |
|   3   | **Rate Limit (`429`) & Helmet**  | Repeated login attempts blocked with `429 Too Many Requests` + helmet headers | `docs/screenshots/week11/03-rate-limit-429-helmet.jpeg`   |
|   4   | **Hashed Password (`bcrypt`)**   | PostgreSQL `users` table showing `$2b$10$...` bcrypt password hash            | `docs/screenshots/week11/04-db-users-bcrypt.jpeg`         |
|   5   | **JWT Login UI**                 | React login screen (`AuthPanel`) before accessing Memory Vault                | `docs/screenshots/week11/05-ui-login.jpeg`                |
|   6   | **`Authorization: Bearer` Header**| Browser Network tab showing `Authorization: Bearer ...` on `/memories`        | `docs/screenshots/week11/06-network-bearer-token.jpeg`    |

### Week 10 Screenshots (PostgreSQL + Prisma ORM)

|  No   | Stage                         | Description                                                                   | Screenshot Path                                               |
| :---: | :---------------------------- | :---------------------------------------------------------------------------- | :------------------------------------------------------------ |
|   1   | **PostgreSQL Setup**          | Starting PostgreSQL service & creating `aira_db` database                     | `docs/screenshots/week10/01-postgresql-setup.png`             |
|   2   | **Prisma Installation**       | Installing `prisma@6` and `@prisma/client@6` in backend                       | `docs/screenshots/week10/02-prisma-install.png`               |
|   3   | **Initial Migration**         | Running `npx prisma migrate dev --name init` & generating Prisma Client       | `docs/screenshots/week10/03-prisma-migrate-init.png`          |
|   4   | **Table Verification**        | Inspecting `"Memory"` & `_prisma_migrations` tables via `psql` (`\dt`, `\d`)  | `docs/screenshots/week10/04-postgresql-table-memory.png`      |
|   5   | **CRUD: POST (`MEM-01`)**    | Creating first memory record (`201 Created`)                                  | `docs/screenshots/week10/05-post-memory-01.jpeg`              |
|   6   | **CRUD: POST (`MEM-02`)**    | Creating second memory record (`201 Created`)                                 | `docs/screenshots/week10/06-post-memory-02.jpeg`              |
|   7   | **CRUD: POST (`MEM-03`)**    | Creating third memory record (`201 Created`)                                  | `docs/screenshots/week10/07-post-memory-03.jpeg`              |
|   8   | **CRUD: GET All**            | Fetching all memory records from PostgreSQL (`200 OK`)                        | `docs/screenshots/week10/08-get-all-memories.jpeg`            |
|   9   | **CRUD: DELETE (`MEM-03`)**  | Deleting a memory record by ID (`200 OK`)                                     | `docs/screenshots/week10/09-delete-memory-03.jpeg`            |
|  10   | **Advanced Query: Stats**    | `GET /memories/stats` endpoint (`count` & `groupBy` category summary)         | `docs/screenshots/week10/10-get-stats-all.jpeg`               |
|  11   | **Advanced Query: Filter**   | `GET /memories/stats?category=study&minImportance=4` (`where` filter)         | `docs/screenshots/week10/11-get-stats-filtered.jpeg`          |
|  12   | **Persistence After Restart** | `GET /memories` after restarting NestJS confirming records remain persisted   | `docs/screenshots/week10/12-persistence-after-restart.jpeg`   |
|  13   | **Desktop UI**                | Desktop React view connected to NestJS Live + PostgreSQL                      | `docs/screenshots/week10/13-ui-desktop.jpeg`                  |
|  14   | **Mobile UI**                 | Mobile responsive React view connected to NestJS Live + PostgreSQL            | `docs/screenshots/week10/14-ui-mobile.jpeg`                   |

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

### Week 9 Documentation (NestJS & MVC)

|  No   | Topic                     | Description                                                       | Documentation File                                   |
| :---: | :------------------------ | :--------------------------------------------------------------- | :--------------------------------------------------- |
|   1   | **API Steps & Responses** | CRUD endpoint requests and responses, including error scenarios | `docs/screenshots/week9/Tahapan dan Response API.pdf` |
