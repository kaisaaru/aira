import { useState } from "react";

export default function MemoryForm({ onAddMemory, onCancel }) {
  const [category, setCategory] = useState("Identitas");
  const [priority, setPriority] = useState("Penting");
  const [fact, setFact] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedFact = fact.trim();
    if (!trimmedFact) {
      setError("Fakta memori wajib diisi.");
      return;
    }

    onAddMemory({
      category,
      priority,
      fact: trimmedFact,
    });

    setFact("");
    setError("");
  };

  const handleFactChange = (e) => {
    setFact(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="settings-form" id="add-memory-form">
      <fieldset>
        <legend>Tambah Catatan Baru</legend>

        <div className="form-group">
          <label htmlFor="new-mem-cat">Kategori Catatan:</label>
          <select
            id="new-mem-cat"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Identitas">Identitas &amp; Profil</option>
            <option value="Minat">Hobi &amp; Minat</option>
            <option value="Kuliah">Aktivitas Kuliah</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="new-mem-priority">Tingkat Prioritas:</label>
          <select
            id="new-mem-priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Utama">Utama (High Priority)</option>
            <option value="Penting">Penting (Important)</option>
            <option value="Sedang">Sedang (Standard)</option>
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
            value={fact}
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
            + Simpan ke Memori
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
