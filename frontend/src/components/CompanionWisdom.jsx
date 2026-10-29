import { useState, useEffect, useCallback } from "react";

const API_DEFAULT_URL = "https://dummyjson.com/quotes?limit=4";
const API_NORMAL_URL = import.meta.env.VITE_QUOTES_API_URL || API_DEFAULT_URL;
const API_ERROR_URL = "https://dummyjson.com/quotes-invalid-endpoint-simulation";

export default function CompanionWisdom({ onSaveToMemory, showToast }) {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(API_NORMAL_URL);

  // Fungsi pengambil data asinkron menggunakan fetch()
  const fetchQuotes = useCallback(async (urlToFetch) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(urlToFetch);

      if (!response.ok) {
        throw new Error(
          `Gagal menghubungi server (HTTP Status: ${response.status} ${response.statusText || "Not Found"})`
        );
      }

      const json = await response.json();

      if (!json.quotes || !Array.isArray(json.quotes)) {
        throw new Error("Format respon data API tidak sesuai standar.");
      }

      setQuotes(json.quotes);
    } catch (err) {
      console.error("AJAX Error:", err);
      setError(
        err.message.includes("Failed to fetch")
          ? "Gagal terhubung ke internet. Periksa koneksi jaringan Anda."
          : err.message
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Panggil saat pertama kali komponen dimuat (mounting)
  useEffect(() => {
    fetchQuotes(currentUrl);
  }, [fetchQuotes, currentUrl]);

  // Handler: Tombol Coba Lagi (Retry) saat error
  const handleRetry = () => {
    fetchQuotes(currentUrl);
  };

  // Handler: Tombol Refresh Data Normal
  const handleRefresh = () => {
    setCurrentUrl(API_NORMAL_URL);
    const randomSkip = Math.floor(Math.random() * 50);
    const separator = API_NORMAL_URL.includes("?") ? "&" : "?";
    fetchQuotes(`${API_NORMAL_URL}${separator}skip=${randomSkip}`);
    if (showToast) showToast("Memperbarui wawasan kutipan dari cloud API...", "save");
  };

  // Handler: Uji Coba Simulasi Error
  const handleSimulateError = () => {
    setCurrentUrl(API_ERROR_URL);
    fetchQuotes(API_ERROR_URL);
  };

  // Handler: Kembalikan ke URL Normal
  const handleRestoreNormal = () => {
    setCurrentUrl(API_NORMAL_URL);
    fetchQuotes(API_NORMAL_URL);
  };

  // Simpan kutipan API ke dalam memori karakter
  const handleAddQuoteToMemory = (quoteItem) => {
    if (onSaveToMemory) {
      onSaveToMemory({
        category: "Minat",
        priority: "Sedang",
        fact: `Kutipan dari ${quoteItem.author}: "${quoteItem.quote}"`,
      });
    }
  };

  return (
    <section className="settings-card" id="quotes-api-settings" aria-labelledby="heading-wisdom">
      {/* Header Kartu */}
      <div className="card-summary flex items-center justify-between">
        <div className="card-text">
          <div className="wisdom-header-title">
            <h2 id="heading-wisdom">Kutipan &amp; Wawasan Eksternal</h2>
            <span className={`wisdom-status-tag ${error ? "wisdom-status-err" : "wisdom-status-ok"}`}>
              {error ? "ERR_CONNECTION" : "API_ONLINE"}
            </span>
          </div>
          <p>
            Konsumsi data asinkron via <code>fetch()</code> dari endpoint publik <code>dummyjson.com/quotes</code>.
          </p>
        </div>

        {/* Tombol Aksi Header Utama (Hanya 1 tombol terfokus) */}
        {!error ? (
          <button
            type="button"
            className="back-link cursor-pointer hover:bg-cyan-500/20"
            onClick={handleRefresh}
            disabled={isLoading}
            title="Segarkan data kutipan dari API"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "0.82rem",
              padding: "6px 14px",
              flexShrink: 0,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Segarkan Data</span>
          </button>
        ) : (
          <button
            type="button"
            className="back-link cursor-pointer hover:bg-cyan-500/20"
            onClick={handleRetry}
            disabled={isLoading}
            title="Coba ambil data kembali"
            style={{
              fontSize: "0.82rem",
              padding: "6px 14px",
              flexShrink: 0,
            }}
          >
            Coba Lagi
          </button>
        )}
      </div>

      {/* 1. Kondisi Loading (Pemuatan Data) */}
      {isLoading && (
        <div className="api-state-box api-loading-box">
          <div className="api-spinner"></div>
          <p style={{ color: "#38bdf8", fontSize: "0.88rem", fontWeight: 500, margin: 0 }}>
            Memuat data kutipan dari endpoint server...
          </p>
          <span style={{ color: "#94a8b3", fontSize: "0.78rem" }}>
            Metode: <code>GET {currentUrl}</code>
          </span>
        </div>
      )}

      {/* 2. Kondisi Error (Gagal Mengambil Data) */}
      {!isLoading && error && (
        <div className="api-state-box api-error-box">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600, margin: 0 }}>
              Gagal Mengambil Data API
            </h3>
          </div>

          <p style={{ color: "#fca5a5", fontSize: "0.85rem", maxWidth: "520px", margin: 0 }}>
            {error}
          </p>

          <div className="api-error-actions">
            <button
              type="button"
              className="save-btn cursor-pointer"
              onClick={handleRetry}
              style={{
                backgroundColor: "#be123c",
                borderColor: "rgba(244, 63, 94, 0.5)",
                padding: "6px 18px",
                fontSize: "0.84rem",
              }}
            >
              Coba Lagi
            </button>
            <button
              type="button"
              className="back-link cursor-pointer"
              onClick={handleRestoreNormal}
              style={{ fontSize: "0.84rem", padding: "6px 14px" }}
            >
              Gunakan Endpoint Normal
            </button>
          </div>
        </div>
      )}

      {/* 3. Kondisi Success (Render List Data Terstruktur Menggunakan .map()) */}
      {!isLoading && !error && (
        <div className="quotes-grid">
          {quotes.map((item) => (
            <article key={item.id} className="quote-card">
              <div>
                <span className="quote-badge">
                  KUTIPAN #{String(item.id).padStart(3, "0")}
                </span>
                <p className="quote-text">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="quote-card-footer">
                <span className="quote-author">
                  — {item.author}
                </span>

                <button
                  type="button"
                  className="btn-save-quote"
                  onClick={() => handleAddQuoteToMemory(item)}
                  title="Simpan kutipan ini ke Catatan Memori Karakter"
                >
                  Simpan ke Memori
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Testing Actions (Simulasi Error & Reset untuk Pengambilan Screenshot Tugas) */}
      <div className="memory-test-actions">
        <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Pengujian Tugas 7:</span>
        <button
          type="button"
          onClick={handleSimulateError}
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
          onMouseEnter={(e) => (e.target.style.color = "#fda4af")}
          onMouseLeave={(e) => (e.target.style.color = "#94a8b3")}
          title="Uji coba kondisi error API untuk screenshot tugas"
        >
          Uji Simulasi Error API
        </button>
        <span style={{ color: "rgba(148, 168, 179, 0.4)" }}>&bull;</span>
        <button
          type="button"
          onClick={handleRestoreNormal}
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
          onMouseEnter={(e) => (e.target.style.color = "#38bdf8")}
          onMouseLeave={(e) => (e.target.style.color = "#94a8b3")}
          title="Kembalikan endpoint ke URL normal"
        >
          Reset Endpoint Normal
        </button>
      </div>
    </section>
  );
}
