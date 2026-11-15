import { useState } from "react";

export default function MemoryForm({
  onAddMemory,
  onEditMemory,
  onCancel,
  initialData = null,
  isEdit = false,
}) {
  const [category, setCategory] = useState(
    initialData?.category || "study",
  );
  const [importance, setImportance] = useState(
    initialData?.importance !== undefined
      ? initialData.importance
      : initialData?.priority === "Utama"
      ? 5
      : 4,
  );
  const [factText, setFactText] = useState(
    initialData?.factText || initialData?.fact || "",
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedFact = factText.trim();
    if (!trimmedFact) {
      setError("Fakta memori wajib diisi.");
      return;
    }
    if (trimmedFact.length < 5) {
      setError("Fakta memori minimal 5 karakter (aturan validasi DTO).");
      return;
    }

    if (isEdit && onEditMemory) {
      onEditMemory(initialData.id, {
        category,
        importance: Number(importance),
        factText: trimmedFact,
      });
    } else if (onAddMemory) {
      onAddMemory({
        category,
        importance: Number(importance),
        factText: trimmedFact,
      });
    }

    if (!isEdit) {
      setFactText("");
    }
    setError("");
  };
  const handleFactChange = (e) => {
    setFactText(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form" id="add-memory-form">
      <fieldset>
        <legend>
          {isEdit ? `Ubah Catatan (${initialData?.id})` : "Tambah Catatan Baru"}
        </legend>

        <div className="form-group">
          <label htmlFor="new-mem-cat">Kategori Catatan:</label>
          <select
            id="new-mem-cat"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="study">Aktivitas Kuliah (study)</option>
            <option value="identity">Identitas &amp; Profil (identity)</option>
            <option value="hobby">Hobi &amp; Minat (hobby)</option>
            <option value="preference">Preferensi Personal (preference)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="new-mem-priority">Prioritas / Importance (1 - 5):</label>
          <select
            id="new-mem-priority"
            name="importance"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value={5}>Utama (Skala 5)</option>
            <option value={4}>Penting (Skala 4)</option>
            <option value={3}>Sedang (Skala 3)</option>
            <option value={2}>Rendah (Skala 2)</option>
            <option value={1}>Info Tambahan (Skala 1)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="new-mem-text">
            Informasi / Fakta Baru <span className="required-asterisk">*</span>
          </label>
          <textarea
            id="new-mem-text"
            name="fact"
            rows="2"
            value={factText}
            onChange={handleFactChange}
            placeholder="Tuliskan informasi penting baru tentang pengguna..."
            className={error ? "input-invalid" : ""}
          ></textarea>
          {error && (
            <div
              id="new-mem-error"
              className="inline-error-text"
              style={{ display: "block" }}
            >
              {error}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-3">
          <button type="submit" className="save-btn">
            {isEdit ? "Simpan Perubahan" : "+ Simpan ke Memori"}
          </button>
          <button
            type="button"
            id="cancel-memory-form-btn"
            className="back-link cursor-pointer"
            onClick={onCancel}
          >
            Batal
          </button>
        </div>
      </fieldset>
    </form>
  );
}
