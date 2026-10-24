# AIRA — AI Virtual Companion

**Pilih Bahasa / Language:** **Bahasa Indonesia** • [English](README.en.md)

Aplikasi pendamping virtual AI berbasis web untuk praktikum mata kuliah **Pemrograman Web (Telkom University)**, terinspirasi secara visual dan konseptual dari [Project AIRI](https://github.com/moeru-ai/airi).

---

## Cara Menjalankan Proyek

Pastikan [Node.js](https://nodejs.org/) (versi 18+) telah terpasang.

```bash
# Masuk ke direktori frontend
cd frontend

# Pasang dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

Buka peramban di `http://localhost:5173/`.

---

## Struktur Direktori

```text
aira/
├── docs/                      # Dokumentasi & tangkapan layar tugas per pekan
├── README.md                  # Dokumentasi bahasa Indonesia
├── README.en.md               # Dokumentasi bahasa Inggris
└── frontend/                  # Proyek React (Vite)
    ├── index.html             # Dokumen HTML utama
    ├── package.json           # Konfigurasi dependensi
    ├── vite.config.js         # Konfigurasi Vite
    ├── public/                # Gambar avatar & model visual
    └── src/
        ├── main.jsx           # Entry point React
        ├── App.jsx            # State utama & perakitan halaman
        ├── style.css          # Desain sistem otentik AIRI (Week 5)
        ├── tailwind.css       # Utilitas styling
        └── components/        # 6 Komponen Modular React:
            ├── Navbar.jsx           # Navigasi sticky di bagian atas
            ├── MemoryToolbar.jsx    # Ringkasan statistik & filter kategori
            ├── MemoryTable.jsx      # Tabel data & conditional rendering
            ├── MemoryRow.jsx        # Baris catatan memori
            ├── MemoryForm.jsx       # Formulir input terkontrol (controlled form)
            └── ToastContainer.jsx   # Notifikasi bertumpuk & bilah durasi
```

---

## Perkembangan Tugas Mingguan

### Week 2 — HTML Semantik
- Membangun kerangka semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`).
- Menyusun formulir dengan pasangan `<label>` dan `<input>` yang valid serta tabel data berstruktur `<thead>`/`<tbody>`.

### Week 3 — CSS Murni & Responsif
- Menerapkan palet warna *dark-teal companion* (`style.css`) terinspirasi Project AIRI.
- Tata letak responsif untuk desktop dan perangkat bergerak (*mobile*).

### Week 4 — Tailwind CSS
- Mengintegrasikan utilitas Tailwind CSS untuk kerangka tampilan yang konsisten dan modular.
- Mempersiapkan transisi elemen antarmuka menuju komponen React.

### Week 5 — Logika JS DOM & Animasi jQuery
- Pengolahan data memori lokal menggunakan array of objects dan kamus respon percakapan.
- Animasi form input (`slideToggle`), pemfilteran kategori, modal dialog hapus, dan notifikasi mengambang.

### Week 6 — Dasar React (Vite & State Management)
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

---

## Dokumentasi Tangkapan Layar (Week 6)

|  No   | Fitur                 | Deskripsi                                             | Berkas Tangkapan Layar                                      |
| :---: | :-------------------- | :---------------------------------------------------- | :---------------------------------------------------------- |
|   1   | **Instalasi Vite**    | Terminal eksekusi instalasi `npm create vite@latest`  | `docs/screenshots/week6/01-installation-vite.jpeg`          |
|   2   | **Tabel Memori Awal** | Halaman pengaturan dengan tabel catatan memori terisi | `docs/screenshots/week6/02-memory-vault-initial-list.jpeg`  |
|   3   | **Form & Validasi**   | Formulir tambah memori terbuka beserta validasi input | `docs/screenshots/week6/03-memory-vault-add-validation.jpeg`|
|   4   | **Pesan Data Kosong** | Tampilan *empty state* saat semua data dikosongkan    | `docs/screenshots/week6/04-memory-vault-empty-state.jpeg`   |
