import { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export default function AuthPanel({ onAuthSuccess, showToast }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("kaisar@aira.local");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    if (mode === "register" && name.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }

    if (mode === "register" && password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "register"
          ? `${API_BASE_URL}/auth/register`
          : `${API_BASE_URL}/auth/login`;

      const payload =
        mode === "register"
          ? { name: name.trim(), email: trimmedEmail, password }
          : { email: trimmedEmail, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message || `Permintaan gagal (HTTP ${res.status}).`;
        throw new Error(msg);
      }

      if (mode === "register") {
        if (showToast) {
          showToast("Registrasi berhasil! Silakan masuk dengan akun Anda.", "save");
        }
        setMode("login");
        setPassword("");
      } else {
        if (!data.accessToken) {
          throw new Error("Server tidak mengembalikan accessToken.");
        }
        onAuthSuccess(data.accessToken, data.user);
      }
    } catch (err) {
      setError(err.message || "Gagal menghubungi server autentikasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="settings-container max-w-md mx-auto flex flex-col gap-6">
      <div className="settings-title-bar flex items-center gap-3">
        <h1>{mode === "login" ? "Masuk ke AIRA" : "Daftar Akun AIRA"}</h1>
      </div>

      <section className="settings-card" aria-labelledby="heading-auth">
        <div className="card-summary flex items-center justify-between">
          <div className="card-text">
            <h2 id="heading-auth">
              {mode === "login" ? "Autentikasi JWT" : "Buat Akun Baru"}
            </h2>
            <p>
              {mode === "login"
                ? "Masuk untuk mendapatkan JWT Bearer token dan mengakses Catatan Memori."
                : "Password akan di-hash menggunakan bcrypt sebelum disimpan ke PostgreSQL."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="settings-form" id="auth-form">
          {mode === "register" && (
            <div className="form-group">
              <label htmlFor="auth-name">Nama Lengkap:</label>
              <input
                type="text"
                id="auth-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Kaisar"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Email:</label>
            <input
              type="email"
              id="auth-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@aira.local"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Password:</label>
            <input
              type="password"
              id="auth-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              required
            />
          </div>

          {error && (
            <div
              className="inline-error-text"
              style={{ display: "block", marginBottom: "8px" }}
            >
              {error}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 mt-2">
            <button
              type="submit"
              className="save-btn cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Memproses..."
                : mode === "login"
                ? "Masuk (Dapatkan JWT)"
                : "Daftar Akun"}
            </button>

            <button
              type="button"
              className="back-link cursor-pointer"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
            >
              {mode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
