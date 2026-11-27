import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import AuthPanel from "./components/AuthPanel";
import MemoryToolbar from "./components/MemoryToolbar";
import MemoryTable from "./components/MemoryTable";
import MemoryForm from "./components/MemoryForm";
import ToastContainer from "./components/ToastContainer";
import CompanionWisdom from "./components/CompanionWisdom";

const INITIAL_MEMORIES = [
  {
    id: "MEM-01",
    category: "Identitas",
    fact: "Nama pengguna adalah Kaisar.",
    priority: "Utama",
    createdAt: "2026-10-11 14:00",
  },
  {
    id: "MEM-02",
    category: "Minat",
    fact: "Menyukai serial detektif dan membaca komik.",
    priority: "Sedang",
    createdAt: "2026-10-11 14:05",
  },
  {
    id: "MEM-03",
    category: "Kuliah",
    fact: "Sedang mengerjakan tugas praktikum pemrograman web Telkom University.",
    priority: "Penting",
    createdAt: "2026-10-11 14:10",
  },
];
const API_MEMORIES_URL =
  import.meta.env.VITE_MEMORIES_API_URL || "http://localhost:3001/memories";
const AUTH_TOKEN_KEY = "aira_jwt_token";
const AUTH_USER_KEY = "aira_auth_user";

export default function App() {
  // State autentikasi JWT
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem(AUTH_TOKEN_KEY) || "",
  );
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // State entitas utama: Catatan Memori dari Backend NestJS
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [isLoadingMemories, setIsLoadingMemories] = useState(true);
  const [backendStatus, setBackendStatus] = useState("connecting");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Handler: Tampilkan Toast Baru (Bertumpuk ke bawah, toast lama di atas)
  const showToast = useCallback((message, type = "save") => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const handleDismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAuthSuccess = (token, user) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    setAuthToken(token);
    setAuthUser(user);
    showToast(`Selamat datang, ${user?.name || "Pengguna"}! JWT aktif.`, "save");
  };

  const handleLogout = useCallback(
    (reason) => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      setAuthToken("");
      setAuthUser(null);
      setMemories([]);
      setBackendStatus("connecting");
      showToast(
        typeof reason === "string" ? reason : "Anda telah keluar dari sesi AIRA.",
        "delete",
      );
    },
    [showToast],
  );

  // GET: Memuat semua data memori dari backend NestJS (dengan Bearer token)
  const fetchMemories = useCallback(async () => {
    if (!authToken) {
      setIsLoadingMemories(false);
      return;
    }

    try {
      setIsLoadingMemories(true);
      const res = await fetch(API_MEMORIES_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status === 401) {
        handleLogout("Sesi JWT berakhir atau tidak valid. Silakan masuk kembali.");
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Gagal memuat data dari server NestJS.`);
      }
      const data = await res.json();
      setMemories(data);
      setBackendStatus("connected");
    } catch (err) {
      console.warn("Backend NestJS offline atau tidak terjangkau:", err);
      setBackendStatus("offline");
      // Fallback lokal jika backend belum berjalan
      const saved = localStorage.getItem("aira_memories_week6");
      if (saved) {
        setMemories(JSON.parse(saved));
      } else {
        setMemories(INITIAL_MEMORIES);
      }
    } finally {
      setIsLoadingMemories(false);
    }
  }, [authToken, handleLogout]);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  // POST: Menambah Catatan Baru ke Backend NestJS
  const handleAddMemory = async (input) => {
    const categoryMap = {
      Identitas: "identity",
      Minat: "hobby",
      Kuliah: "study",
      Preferensi: "preference",
    };
    const category = categoryMap[input.category] || input.category || "study";
    const factText = input.factText || input.fact;
    const importance =
      input.importance !== undefined
        ? Number(input.importance)
        : input.priority === "Utama"
        ? 5
        : input.priority === "Penting"
        ? 4
        : 3;

    try {
      const res = await fetch(API_MEMORIES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ category, factText, importance }),
      });

      if (res.status === 401) {
        handleLogout("Sesi JWT berakhir atau tidak valid. Silakan masuk kembali.");
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg = Array.isArray(errData.message)
          ? errData.message.join(", ")
          : errData.message || "Gagal menambah data ke backend.";
        throw new Error(msg);
      }

      const created = await res.json();
      setMemories((prev) => [...prev, created]);
      setIsFormOpen(false);
      showToast(`Catatan memori ${created.id} berhasil ditambahkan ke backend!`, "save");
    } catch (err) {
      console.error("Gagal menambah memori:", err);
      showToast(err.message, "delete");
    }
  };

  // PATCH: Mengubah Data Memori di Backend NestJS
  const handleEditMemory = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_MEMORIES_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedFields),
      });

      if (res.status === 401) {
        handleLogout("Sesi JWT berakhir atau tidak valid. Silakan masuk kembali.");
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg = Array.isArray(errData.message)
          ? errData.message.join(", ")
          : errData.message || "Gagal mengubah data di backend.";
        throw new Error(msg);
      }

      const updated = await res.json();
      setMemories((prev) =>
        prev.map((item) => (item.id === id ? updated : item)),
      );
      setEditTarget(null);
      showToast(`Catatan memori ${id} berhasil diperbarui di backend!`, "save");
    } catch (err) {
      console.error("Gagal memperbarui memori:", err);
      showToast(err.message, "delete");
    }
  };

  // DELETE: Menghapus Data Memori dari Backend NestJS
  const openDeleteModal = (id) => {
    setDeleteTargetId(id);
  };

  const cancelDelete = () => {
    setDeleteTargetId(null);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    const target = deleteTargetId;

    try {
      const res = await fetch(`${API_MEMORIES_URL}/${target}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.status === 401) {
        handleLogout("Sesi JWT berakhir atau tidak valid. Silakan masuk kembali.");
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Gagal menghapus data dari backend.");
      }

      setMemories((prev) => prev.filter((item) => item.id !== target));
      setDeleteTargetId(null);
      showToast(`Catatan memori ${target} telah dihapus dari backend.`, "delete");
    } catch (err) {
      console.error("Gagal menghapus memori:", err);
      showToast(err.message, "delete");
    }
  };

  // Handler: Sinkronkan / Refetch Ulang Data dari Backend
  const handleRefreshBackend = () => {
    fetchMemories();
    showToast("Memperbarui data dari backend NestJS...", "save");
  };

  // Handler: Uji Empty State & Reset Default
  const handleClearAll = () => {
    setMemories([]);
    showToast("Data memori dikosongkan (Uji Empty State).", "delete");
  };

  const handleResetDefaults = () => {
    fetchMemories();
    setFilterCategory("all");
    showToast("Memulihkan data memori dari backend NestJS.", "save");
  };
  // Filter Kategori
  const filteredMemories = memories.filter((item) => {
    if (!filterCategory || filterCategory === "all") return true;
    const cat = (item.category || "").toLowerCase();
    const target = filterCategory.toLowerCase();
    if (target === "identity" || target === "identitas") {
      return cat === "identity" || cat === "identitas";
    }
    if (target === "hobby" || target === "minat") {
      return cat === "hobby" || cat === "minat";
    }
    if (target === "study" || target === "kuliah") {
      return cat === "study" || cat === "kuliah";
    }
    return cat === target;
  });
  if (!authToken) {
    return (
      <div>
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
        <Navbar />
        <AuthPanel onAuthSuccess={handleAuthSuccess} showToast={showToast} />
      </div>
    );
  }

  return (
    <div>
      {/* Floating Stacked Toast Notifications (Identik Week 5 & Bertumpuk) */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Modal Konfirmasi Hapus Memori (Identik Week 5) */}
      {deleteTargetId && (
        <div
          id="delete-modal"
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-card">
            <div className="modal-header">
              <span className="modal-icon-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </span>
              <h3 id="modal-title" className="modal-title">
                Hapus Catatan Memori?
              </h3>
            </div>
            <p id="modal-desc" className="modal-description">
              Catatan memori{" "}
              <strong id="modal-mem-id" className="text-sky-300">
                {deleteTargetId}
              </strong>{" "}
              akan dihapus permanen dari ingatan AIRA. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                id="modal-cancel-btn"
                className="modal-btn-cancel"
                onClick={cancelDelete}
              >
                Batal
              </button>
              <button
                type="button"
                id="modal-confirm-delete-btn"
                className="modal-btn-delete"
                onClick={confirmDelete}
              >
                Ya, Hapus Catatan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ubah Memori (Week 9 - Integrasi PATCH Backend NestJS) */}
      {editTarget && (
        <div
          id="edit-modal"
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-modal-title"
        >
          <div className="modal-card max-w-lg">
            <div className="modal-header">
              <span className="modal-icon-badge">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </span>
              <h3 id="edit-modal-title" className="modal-title">
                Ubah Catatan Memori ({editTarget.id})
              </h3>
            </div>
            <p className="modal-description mb-3">
              Perbarui data memori pada server backend NestJS (metode HTTP PATCH).
            </p>
            <MemoryForm
              initialData={editTarget}
              isEdit={true}
              onEditMemory={handleEditMemory}
              onCancel={() => setEditTarget(null)}
            />
          </div>
        </div>
      )}
      {/* Komponen 1: Navbar (Sticky di Atas) */}
      <Navbar authUser={authUser} onLogout={() => handleLogout()} />

      {/* Konten Utama Halaman Pengaturan (100% Identik Week 5 settings.html) */}
      <main className="settings-container max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header Judul Pengaturan */}
        <div className="settings-title-bar flex items-center gap-3">
          <a href="#" className="back-arrow" title="Kembali ke Panggung">
            &lsaquo;
          </a>
          <h1>Pengaturan Karakter &amp; Tampilan</h1>
        </div>

        {/* Daftar Modul Pengaturan */}
        <div className="settings-list flex flex-col gap-6">
          {/* 1. Profil & Persona Karakter */}
          <section className="settings-card" id="card-settings" aria-labelledby="heading-card">
            <div className="card-summary">
              <div className="card-text">
                <h2 id="heading-card">Profil Karakter</h2>
                <p>Atur nama, sapaan awal, dan deskripsi kepribadian karakter AIRA.</p>
              </div>
            </div>

            <form action="#" onSubmit={(e) => { e.preventDefault(); showToast("Profil karakter berhasil disimpan!"); }} className="settings-form">
              <div className="form-group">
                <label htmlFor="char-name">Nama Karakter:</label>
                <input type="text" id="char-name" name="name" defaultValue="AIRA" required />
              </div>

              <div className="form-group">
                <label htmlFor="char-greeting">Sapaan Pertama:</label>
                <textarea
                  id="char-greeting"
                  name="greeting"
                  rows="2"
                  defaultValue="Halo! Selamat datang di AIRA. Hari ini kamu lagi fokus ngerjain tugas apa nih?"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="char-prompt">Deskripsi Sifat &amp; Gaya Bahasa:</label>
                <textarea
                  id="char-prompt"
                  name="system_prompt"
                  rows="3"
                  defaultValue="AIRA adalah karakter pendamping virtual yang ramah, santun, dan suportif. Menggunakan bahasa Indonesia yang komunikatif dan santai untuk menemani sesi belajar."
                ></textarea>
              </div>

              <button type="submit" className="save-btn">
                Simpan Profil Karakter
              </button>
            </form>
          </section>

          {/* 2. Model Visual Karakter */}
          <section className="settings-card" id="model-settings" aria-labelledby="heading-models">
            <div className="card-summary">
              <div className="card-text">
                <h2 id="heading-models">Model Visual</h2>
                <p>Pilih atau ganti tampilan visual karakter untuk panggung utama.</p>
              </div>
            </div>

            <form action="#" onSubmit={(e) => { e.preventDefault(); showToast("Model visual diterapkan!"); }} className="settings-form">
              <div className="form-group">
                <label htmlFor="model-preset">Model Karakter Aktif:</label>
                <select id="model-preset" name="model_preset" defaultValue="hiyori">
                  <option value="hiyori">Hiyori (Tampilan Standar - Seragam)</option>
                  <option value="avatar_a">Model Alternatif A (Kasual)</option>
                  <option value="avatar_b">Model Alternatif B (Hoodie)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="custom-model">Unggah Gambar / Model Baru (.png / .vrm):</label>
                <input type="file" id="custom-model" name="custom_file" accept=".png,.vrm,.jpg" />
              </div>

              <button type="submit" className="save-btn">
                Terapkan Model
              </button>
            </form>
          </section>

          {/* 3. Catatan Memori Pengguna (Data Tabular Dinamis Week 6) */}
          <section className="settings-card" id="memory-settings" aria-labelledby="heading-memory">
            <div className="card-summary flex items-center justify-between">
              <div className="card-text">
                <div className="flex items-center gap-3">
                  <h2 id="heading-memory">Catatan Memori</h2>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
                      backendStatus === "connected"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {backendStatus === "connected"
                      ? "● NestJS Live (Port 3001)"
                      : "○ Connecting Backend"}
                  </span>
                </div>
                <p>Daftar catatan dan preferensi pengguna yang diingat oleh karakter.</p>
              </div>
              {/* Tombol Interaktif Buka/Tutup Form */}
              <button
                type="button"
                id="toggle-memory-form-btn"
                className="back-link cursor-pointer hover:bg-cyan-500/20"
                title="Buka form input memori"
                onClick={() => setIsFormOpen(!isFormOpen)}
              >
                {isFormOpen ? "Tutup Formulir" : "Tambah Catatan"}
              </button>
            </div>

            {/* Komponen 2: MemoryToolbar (Ringkasan Statistik & Filter Kategori) */}
            <MemoryToolbar
              memories={memories}
              selectedCategory={filterCategory}
              onCategoryChange={setFilterCategory}
            />

            {/* Komponen 3: MemoryTable (Daftar Data & Conditional Rendering) */}
            <MemoryTable
              memories={memories}
              filteredMemories={filteredMemories}
              isLoading={isLoadingMemories}
              onDeleteRequest={openDeleteModal}
              onEditRequest={(item) => setEditTarget(item)}
            />
            {/* Komponen 5: MemoryForm (Form Terkontrol dengan Validasi) */}
            {isFormOpen && (
              <MemoryForm
                onAddMemory={handleAddMemory}
                onCancel={() => setIsFormOpen(false)}
              />
            )}

            {/* Quick Testing Actions (Membantu pengujian Empty State & Reset) */}
            <div className="memory-test-actions">
              <button
                type="button"
                onClick={handleClearAll}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a8b3",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "0.8rem",
                  fontFamily: "inherit",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f43f5e")}
                onMouseLeave={(e) => (e.target.style.color = "#94a8b3")}
                title="Kosongkan memori untuk menguji pesan 'Belum ada data'"
              >
                Uji Empty State (Kosongkan Data)
              </button>
              <span style={{ color: "rgba(148, 168, 179, 0.4)" }}>&bull;</span>
              <button
                type="button"
                onClick={handleRefreshBackend}
                style={{
                  background: "none",
                  border: "none",
                  color: "#38bdf8",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "0.8rem",
                  fontFamily: "inherit",
                  transition: "color 0.2s",
                }}
                title="Muat ulang data dari server NestJS"
              >
                Sinkronkan dengan Backend NestJS (GET)
              </button>
            </div>
          </section>

          {/* 4. Wawasan & Inspirasi AI (Integrasi AJAX & API Eksternal - Tugas 7) */}
          <CompanionWisdom onSaveToMemory={handleAddMemory} showToast={showToast} />

          {/* 5. Pengaturan Respon Obrolan */}
          <section className="settings-card" id="provider-settings" aria-labelledby="heading-providers">
            <div className="card-summary">
              <div className="card-text">
                <h2 id="heading-providers">Pengaturan Obrolan</h2>
                <p>Pilihan mode balasan percakapan dan tingkat variasi respon.</p>
              </div>
            </div>

            <form action="#" onSubmit={(e) => { e.preventDefault(); showToast("Pengaturan obrolan disimpan!"); }} className="settings-form">
              <div className="form-group">
                <label htmlFor="llm-provider">Mode Respon Karakter:</label>
                <select id="llm-provider" name="provider" defaultValue="lokal">
                  <option value="lokal">Mode Percakapan Standar</option>
                  <option value="belajar">Mode Tanya Jawab Tugas Web</option>
                  <option value="santai">Mode Obrolan Santai</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="llm-temp">Tingkat Variasi Respon (Ekspresif):</label>
                <input type="range" id="llm-temp" name="temperature" min="0" max="100" defaultValue="70" />
              </div>

              <button type="submit" className="save-btn">
                Simpan Pengaturan Obrolan
              </button>
            </form>
          </section>

          {/* 5. Preferensi Tampilan & Interaksi */}
          <section className="settings-card" id="system-settings" aria-labelledby="heading-system">
            <div className="card-summary">
              <div className="card-text">
                <h2 id="heading-system">Preferensi Tampilan</h2>
                <p>Pengaturan visual dan animasi pada panggung antarmuka web.</p>
              </div>
            </div>

            <form action="#" onSubmit={(e) => { e.preventDefault(); showToast("Preferensi tampilan disimpan!"); }} className="settings-form">
              <div className="form-group checkbox-group">
                <input type="checkbox" id="auto-blink" name="auto_blink" defaultChecked />
                <label htmlFor="auto-blink">Aktifkan efek animasi halus pada panggung</label>
              </div>

              <div className="form-group checkbox-group">
                <input type="checkbox" id="sound-effect" name="sound_effect" defaultChecked />
                <label htmlFor="sound-effect">Bunyikan nada ringan saat pesan terkirim</label>
              </div>

              <button type="submit" className="save-btn">
                Simpan Preferensi
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
