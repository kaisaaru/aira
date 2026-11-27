# AIRA - AI Virtual Companion

**Pilih Bahasa / Language:** **Bahasa Indonesia** • [English](README.en.md)

Aplikasi pendamping virtual AI berbasis web untuk praktikum mata kuliah **Pemrograman Web (Telkom University)**, terinspirasi secara visual dan konseptual dari [Project AIRI](https://github.com/moeru-ai/airi).

---

## Cara Menjalankan Proyek

Pastikan [Node.js](https://nodejs.org/) (versi 18+) dan **PostgreSQL** telah terpasang.

```bash
# 1. Jalankan Backend (NestJS + Prisma + PostgreSQL)
cd backend
cp .env.example .env      # Sesuaikan DATABASE_URL bila perlu
npm install
npx prisma migrate dev    # Jalankan migrasi tabel ke PostgreSQL
npm run start:dev         # Berjalan di http://localhost:3001

# 2. Jalankan Frontend (React + Vite) di terminal terpisah
cd frontend
npm install
npm run dev               # Berjalan di http://localhost:5173
```

Buka peramban di `http://localhost:5173/`.

---

## Struktur Direktori

```text
aira/
├── docs/                      # Dokumentasi & tangkapan layar tugas per pekan
├── README.md                  # Dokumentasi bahasa Indonesia
├── README.en.md               # Dokumentasi bahasa Inggris
├── backend/                   # Proyek NestJS (MVC, REST API, Prisma & JWT Auth)
│   ├── .env.example           # Template DATABASE_URL & JWT_SECRET
│   ├── prisma/
│   │   ├── schema.prisma      # Skema model database (Memory & User)
│   │   └── migrations/        # Riwayat migrasi PostgreSQL
│   ├── src/
│   │   ├── main.ts            # Bootstrap aplikasi, helmet, CORS & ValidationPipe
│   │   ├── prisma/            # PrismaService & PrismaModule (provider global)
│   │   ├── auth/              # Registrasi, login bcrypt, JWT, Guard & rate limit
│   │   └── memories/          # Resource CRUD & statistik Catatan Memori (privat)
│   └── test-api.http          # Koleksi request REST Client
└── frontend/                  # Proyek React (Vite)
    ├── .env.example           # Template environment variable
    ├── index.html             # Dokumen HTML utama
    ├── package.json           # Konfigurasi dependensi
    ├── vite.config.js         # Konfigurasi Vite
    ├── public/                # Gambar avatar & model visual
    └── src/
        ├── main.jsx           # Entry point React
        ├── App.jsx            # State utama, sesi JWT & perakitan halaman
        ├── style.css          # Desain sistem otentik AIRI (Week 5 & 7)
        ├── tailwind.css       # Utilitas styling
        └── components/        # 8 Komponen Modular React:
            ├── Navbar.jsx           # Navigasi sticky, status user & tombol keluar
            ├── AuthPanel.jsx        # Formulir Masuk & Daftar akun (JWT Auth)
            ├── MemoryToolbar.jsx    # Ringkasan statistik & filter kategori
            ├── MemoryTable.jsx      # Tabel data & conditional rendering
            ├── MemoryRow.jsx        # Baris catatan memori
            ├── MemoryForm.jsx       # Formulir input terkontrol (controlled form)
            ├── ToastContainer.jsx   # Notifikasi bertumpuk & bilah durasi
            └── CompanionWisdom.jsx  # Konsumsi API eksternal (Week 7)
```

---

## Perkembangan Tugas Mingguan

### Week 2: HTML Semantik
- Membangun kerangka semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`).
- Menyusun formulir dengan pasangan `<label>` dan `<input>` yang valid serta tabel data berstruktur `<thead>`/`<tbody>`.

### Week 3: CSS Murni & Responsif
- Menerapkan palet warna *dark-teal companion* (`style.css`) terinspirasi Project AIRI.
- Tata letak responsif untuk desktop dan perangkat bergerak (*mobile*).

### Week 4: Tailwind CSS
- Mengintegrasikan utilitas Tailwind CSS untuk kerangka tampilan yang konsisten dan modular.
- Mempersiapkan transisi elemen antarmuka menuju komponen React.

### Week 5: Logika JS DOM & Animasi jQuery
- Pengolahan data memori lokal menggunakan array of objects dan kamus respon percakapan.
- Animasi form input (`slideToggle`), pemfilteran kategori, modal dialog hapus, dan notifikasi mengambang.

### Week 6: Dasar React (Vite & State Management)
Sesuai dengan ketentuan modul tugas praktikum Week 6:
- **Inisialisasi Proyek**: Migrasi frontend ke **React Vite** menggunakan JavaScript murni JSX (`.jsx`, tanpa TypeScript).
- **Entitas Utama**: Pengelolaan data **Catatan Memori** (*Memory Vault*) dengan atribut `id`, `category`, `fact`, dan `priority`.
- **Komponen Modular**: Dibagi menjadi 6 komponen mandiri di direktori `frontend/src/components/` (`Navbar`, `MemoryToolbar`, `MemoryTable`, `MemoryRow`, `MemoryForm`, `ToastContainer`) yang saling terhubung menggunakan props.
- **State Management**:
  - State utama `memories` dikelola terpusat di `App.jsx` dan otomatis tersinkronisasi ke `localStorage`.
  - Rendering daftar data menggunakan method native `.map()` dengan atribut unik `key={item.id}`.
  - Komponen formulir input terkontrol (*controlled component*) menggunakan `useState` dengan validasi data sebelum disimpan.
  - *Conditional rendering*: Menampilkan pesan wajib *"Belum ada data catatan memori. Tambahkan catatan baru melalui formulir di atas."* saat data kosong.
  - Sistem notifikasi toast bertumpuk (*stacked toasts*) dengan animasi bilah durasi dan warna aksen aksi (**Biru** untuk simpan, **Merah** untuk hapus).

### Week 7: Ajax & Konsumsi API Eksternal / Mock
Sesuai dengan spesifikasi tugas praktikum Week 7:
- **Pemilihan Endpoint API**: Mengonsumsi REST API publik `https://dummyjson.com/quotes?limit=4`. Dipilih karena relevan dengan tema asisten AI (wawasan harian & inspirasi dialog), gratis, mendukung CORS dari peramban, serta tidak memerlukan autentikasi API key rumit.
- **Pola State & Penanganan Kode**:
  - Fungsi `fetchQuotes(urlToFetch)`: Menggunakan fungsi asinkron dengan native `fetch()` untuk melakukan HTTP GET request.
  - State `isLoading`: Boolean untuk mengontrol rendering status pemuatan (animasi spinner & info request `GET`).
  - State `error`: Menangani error koneksi jaringan maupun HTTP status non-OK (misal `404 Not Found`).
  - State `quotes`: Menyimpan data kutipan untuk dirender dalam bentuk daftar kartu responsif (`.quotes-grid`) menggunakan `.map()` dengan atribut unik `key={item.id}`.
- **Interaktivitas & Tombol Coba Lagi**:
  - Tombol **Coba Lagi** (*Retry*) muncul secara interaktif saat kondisi error terjadi untuk memicu pemanggilan ulang `fetchQuotes()`.
  - Integrasi tombol **Simpan ke Memori**: Memungkinkan pengguna menyimpan kutipan hasil API langsung ke tabel *Catatan Memori* (Week 6).
  - Panel pengujian (*testing actions*): Tombol *Uji Simulasi Error API* dan *Reset Endpoint Normal* untuk mempermudah demonstrasi dan tangkapan layar tugas.
- **Environment Variables**: Menyediakan `frontend/.env.example` dan pembacaan `import.meta.env.VITE_QUOTES_API_URL` dengan fallback aman ke URL default.

### Week 9: NestJS Dasar & Struktur MVC
Sesuai dengan spesifikasi tugas praktikum Week 9:
- **Backend NestJS**: Menambahkan aplikasi backend terpisah di direktori `backend/` yang berjalan pada `http://localhost:3001`.
- **Resource Utama**: Mengelola entitas **Catatan Memori** dengan field `id`, `category`, `factText`, `importance`, `isActive`, dan `createdAt`.
- **Struktur MVC**: Memisahkan `MemoriesController`, `MemoriesService`, Entity, dan DTO dalam module `memories`.
- **Operasi CRUD**: Menyediakan endpoint `GET`, `POST`, `PATCH`, dan `DELETE` pada `/memories`, dengan penyimpanan sementara menggunakan array di memori.
- **Validasi DTO**: Menggunakan `class-validator` untuk validasi kategori, isi fakta, panjang teks, tipe angka, dan rentang prioritas 1 sampai 5.
- **Penanganan Error**: Menggunakan `NotFoundException` untuk ID yang tidak ditemukan dan `ConflictException` untuk fakta memori duplikat.
- **Integrasi Frontend**: Frontend React terhubung ke backend melalui `fetch()` untuk alur penuh tambah, baca, ubah, dan hapus catatan memori.
- **Pengujian REST Client**: Menyediakan koleksi request dan skenario error pada `backend/test-api.http` sebelum integrasi dengan frontend.

### Week 10: Implementasi REST API + PostgreSQL + ORM (Prisma)
Sesuai dengan spesifikasi tugas praktikum Week 10:
- **Setup PostgreSQL Lokal**: Membuat basis data lokal `aira_db` dan menghubungkannya ke backend NestJS melalui `DATABASE_URL` (`backend/.env.example`).
- **Model Prisma (`backend/prisma/schema.prisma`)**: Merancang model utama `Memory` (`id`, `category`, `factText` unik, `importance`, `isActive`, `createdAt`, `updatedAt`).
- **Migrasi Database**: Menjalankan `npx prisma migrate dev --name init` dan memverifikasi tabel `"Memory"` beserta `_prisma_migrations` terbentuk di PostgreSQL.
- **Provider `PrismaService`**: Membuat `PrismaService` & `PrismaModule` global (`backend/src/prisma/`), lalu menginjeksi ke `MemoriesService` menggantikan array sementara **tanpa mengubah kode `MemoriesController`**.
- **CRUD & Persistensi Permanen**: Seluruh operasi CRUD (`POST`, `GET`, `GET :id`, `PATCH :id`, `DELETE :id`) berjalan via Prisma Client dan data tetap bertahan setelah server backend di-restart.
- **Endpoint Query Lanjutan (Nilai Tambah)**: Menambahkan endpoint `GET /memories/stats` (via `MemoriesStatsController`) yang menggunakan query `count`, `groupBy`, dan `where` dengan dukungan filter `?category=...&minImportance=...`.

### Week 11: JWT Auth + Keamanan Dasar
Sesuai dengan spesifikasi tugas praktikum Week 11:
- **Registrasi & Login dengan `bcrypt`**: Menambahkan model `User` (`@@map("users")`) di `backend/prisma/schema.prisma` serta endpoint `POST /auth/register` dan `POST /auth/login` di `AuthModule` dengan hashing password menggunakan `bcrypt` (10 salt rounds).
- **JWT & Header `Authorization: Bearer`**: Login yang berhasil menerbitkan `accessToken` JWT via `@nestjs/jwt`. Frontend React (`AuthPanel.jsx` & `App.jsx`) menyimpan token dan melampirkan header `Authorization: Bearer <token>` pada seluruh operasi CRUD `/memories`.
- **Proteksi Endpoint Privat (`JwtAuthGuard`)**: Memasang `@UseGuards(JwtAuthGuard)` pada `MemoriesController`, `MemoriesStatsController`, dan `GET /auth/me` sehingga request tanpa token atau token tidak valid ditolak dengan `401 Unauthorized`.
- **Keamanan Dasar Tambahan**:
  - **Security Headers (`helmet`)**: Dipasang di `backend/src/main.ts` untuk menambahkan header `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, dan `Strict-Transport-Security`.
  - **Rate Limiting (`@nestjs/throttler`)**: Dipasang pada `POST /auth/login` (maksimal 5 percobaan per menit) untuk menahan brute-force dan mengembalikan `429 Too Many Requests` saat batas terlampaui.
- **Mitigasi Ancaman (SQL Injection & XSS)**:
  - **SQL Injection**: Seluruh akses database menggunakan Prisma Client (parameterized query) serta validasi DTO ketat (`ValidationPipe` dengan `whitelist` dan `forbidNonWhitelisted`).
  - **XSS**: React melakukan auto-escaping pada seluruh konten JSX tanpa `dangerouslySetInnerHTML`, diperkuat dengan header `Content-Security-Policy` dan `X-Content-Type-Options` dari `helmet`.

---

## Dokumentasi Tangkapan Layar

### Tangkapan Layar Week 11 (JWT Auth & Keamanan Dasar)

|  No   | Tahapan                           | Deskripsi                                                                       | Berkas Tangkapan Layar                                    |
| :---: | :-------------------------------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------- |
|   1   | **Login & JWT `accessToken`**     | Response `POST /auth/login` berisi `accessToken`, header rate limit, & `helmet` | `docs/screenshots/week11/01-login-access-token.jpeg`      |
|   2   | **Proteksi Endpoint (`401`)**     | Request `GET /memories` tanpa token ditolak dengan `401 Unauthorized`           | `docs/screenshots/week11/02-unauthorized-401.jpeg`        |
|   3   | **Rate Limiting (`429`) & Helmet**| Percobaan login berlebih ditolak `429 Too Many Requests` + security headers     | `docs/screenshots/week11/03-rate-limit-429-helmet.jpeg`   |
|   4   | **Hash Password (`bcrypt`)**      | Isi tabel `users` di PostgreSQL menunjukkan password ter-hash (`$2b$10$...`)    | `docs/screenshots/week11/04-db-users-bcrypt.jpeg`         |
|   5   | **UI Login JWT**                  | Tampilan halaman login React (`AuthPanel`) sebelum masuk ke Catatan Memori      | `docs/screenshots/week11/05-ui-login.jpeg`                |
|   6   | **Header `Authorization: Bearer`**| Tab Network browser menampilkan `Authorization: Bearer ...` ke `/memories`      | `docs/screenshots/week11/06-network-bearer-token.jpeg`    |

### Tangkapan Layar Week 10 (PostgreSQL + Prisma ORM)

|  No   | Tahapan                         | Deskripsi                                                                      | Berkas Tangkapan Layar                                        |
| :---: | :------------------------------ | :----------------------------------------------------------------------------- | :------------------------------------------------------------ |
|   1   | **Setup PostgreSQL**            | Menyalakan layanan PostgreSQL & membuat database `aira_db`                     | `docs/screenshots/week10/01-postgresql-setup.png`             |
|   2   | **Instalasi Prisma**            | Pemasangan `prisma@6` dan `@prisma/client@6` di proyek backend                 | `docs/screenshots/week10/02-prisma-install.png`               |
|   3   | **Migrasi Awal Prisma**         | Eksekusi `npx prisma migrate dev --name init` & generate Prisma Client         | `docs/screenshots/week10/03-prisma-migrate-init.png`          |
|   4   | **Verifikasi Tabel PostgreSQL** | Pemeriksaan tabel `"Memory"` & `_prisma_migrations` via `psql` (`\dt`, `\d`)   | `docs/screenshots/week10/04-postgresql-table-memory.png`      |
|   5   | **CRUD: POST (`MEM-01`)**      | Menambah catatan memori pertama (`201 Created`)                                | `docs/screenshots/week10/05-post-memory-01.jpeg`              |
|   6   | **CRUD: POST (`MEM-02`)**      | Menambah catatan memori kedua (`201 Created`)                                  | `docs/screenshots/week10/06-post-memory-02.jpeg`              |
|   7   | **CRUD: POST (`MEM-03`)**      | Menambah catatan memori ketiga (`201 Created`)                                 | `docs/screenshots/week10/07-post-memory-03.jpeg`              |
|   8   | **CRUD: GET All**              | Mengambil seluruh data memori dari PostgreSQL (`200 OK`)                       | `docs/screenshots/week10/08-get-all-memories.jpeg`            |
|   9   | **CRUD: DELETE (`MEM-03`)**    | Menghapus catatan memori berdasarkan ID (`200 OK`)                             | `docs/screenshots/week10/09-delete-memory-03.jpeg`            |
|  10   | **Query Lanjutan: Stats**      | Endpoint `GET /memories/stats` (statistik `count` & `groupBy` kategori)        | `docs/screenshots/week10/10-get-stats-all.jpeg`               |
|  11   | **Query Lanjutan: Filter**     | Endpoint `GET /memories/stats?category=study&minImportance=4` (`where`)        | `docs/screenshots/week10/11-get-stats-filtered.jpeg`          |
|  12   | **Persistensi Setelah Restart** | `GET /memories` setelah server NestJS di-restart membuktikan data tetap ada    | `docs/screenshots/week10/12-persistence-after-restart.jpeg`   |
|  13   | **Tampilan UI Desktop**         | Tampilan desktop React terhubung ke NestJS Live + PostgreSQL                   | `docs/screenshots/week10/13-ui-desktop.jpeg`                  |
|  14   | **Tampilan UI Mobile**          | Tampilan responsif mobile React terhubung ke NestJS Live + PostgreSQL          | `docs/screenshots/week10/14-ui-mobile.jpeg`                   |

### Tangkapan Layar Week 7 (Ajax & Konsumsi API)

|  No   | Kondisi State          | Deskripsi                                                          | Berkas Tangkapan Layar                                 |
| :---: | :--------------------- | :----------------------------------------------------------------- | :----------------------------------------------------- |
|   1   | **Kondisi Loading**    | Indikator spinner dan teks status saat data sedang diambil         | `docs/screenshots/week7/01-api-loading-state.jpeg`     |
|   2   | **Kondisi Success**    | Render list terstruktur kartu kutipan via `.map()` dengan key unik | `docs/screenshots/week7/02-api-success-state.jpeg`     |
|   3   | **Kondisi Error**      | Pesan kesalahan detail beserta tombol wajib "Coba Lagi" (*retry*)  | `docs/screenshots/week7/03-api-error-state.jpeg`       |

### Tangkapan Layar Week 6 (React & State Management)

|  No   | Fitur                 | Deskripsi                                             | Berkas Tangkapan Layar                                      |
| :---: | :-------------------- | :---------------------------------------------------- | :---------------------------------------------------------- |
|   1   | **Instalasi Vite**    | Terminal eksekusi instalasi `npm create vite@latest`  | `docs/screenshots/week6/01-installation-vite.jpeg`          |
|   2   | **Tabel Memori Awal** | Halaman pengaturan dengan tabel catatan memori terisi | `docs/screenshots/week6/02-memory-vault-initial-list.jpeg`  |
|   3   | **Form & Validasi**   | Formulir tambah memori terbuka beserta validasi input | `docs/screenshots/week6/03-memory-vault-add-validation.jpeg`|
|   4   | **Pesan Data Kosong** | Tampilan *empty state* saat semua data dikosongkan    | `docs/screenshots/week6/04-memory-vault-empty-state.jpeg`   |

### Dokumentasi Week 9 (NestJS & MVC)

|  No   | Materi                     | Deskripsi                                                        | Berkas Dokumentasi                                    |
| :---: | :------------------------- | :-------------------------------------------------------------- | :--------------------------------------------------- |
|   1   | **Tahapan & Response API** | Request dan response endpoint CRUD serta skenario error backend | `docs/screenshots/week9/Tahapan dan Response API.pdf` |
