export default function MemoryToolbar({
  memories,
  selectedCategory,
  onCategoryChange,
}) {
  const stats = {
    total: memories.length,
    utama: memories.filter((m) => m.priority === "Utama").length,
    penting: memories.filter((m) => m.priority === "Penting").length,
    sedang: memories.filter((m) => m.priority === "Sedang").length,
  };

  return (
    <div className="memory-toolbar flex flex-wrap items-center justify-between gap-3 p-3 bg-black/20 rounded-lg border border-cyan-500/20">
      <div id="memory-stats-summary" className="text-sm text-cyan-300 font-medium">
        Total Memori: {stats.total} item &bull;{" "}
        <span style={{ color: "#38bdf8" }}>{stats.utama} Utama</span> &bull;{" "}
        <span style={{ color: "#2dd4bf" }}>{stats.penting} Penting</span> &bull;{" "}
        <span style={{ color: "#94a8b3" }}>{stats.sedang} Sedang</span>
      </div>

      <div className="filter-group flex items-center gap-2">
        <label htmlFor="filter-memory-category" className="text-xs text-slate-300">
          Filter Kategori:
        </label>
        <select
          id="filter-memory-category"
          className="model-select text-xs py-1 px-2"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          <option value="Identitas">Identitas &amp; Profil</option>
          <option value="Minat">Hobi &amp; Minat</option>
          <option value="Kuliah">Aktivitas Kuliah</option>
        </select>
      </div>
    </div>
  );
}
