export default function MemoryRow({
  memory,
  onDeleteRequest,
  onEditRequest,
}) {
  const { id, category, fact, factText, priority, importance } = memory;
  const displayText = factText || fact;

  // Pemetaan label kategori yang ramah & sesuai backend
  const categoryLabels = {
    identity: "Identitas & Profil",
    hobby: "Hobi & Minat",
    study: "Aktivitas Kuliah",
    preference: "Preferensi Personal",
    Identitas: "Identitas & Profil",
    Minat: "Hobi & Minat",
    Kuliah: "Aktivitas Kuliah",
  };
  const displayCategory = categoryLabels[category] || category;

  // Skala prioritas (1 - 5)
  const numImportance =
    importance !== undefined
      ? importance
      : priority === "Utama"
      ? 5
      : priority === "Penting"
      ? 4
      : 3;

  let priorityBadge = null;
  if (numImportance >= 5) {
    priorityBadge = (
      <span style={{ color: "#38bdf8", fontWeight: 600 }}>Utama (5)</span>
    );
  } else if (numImportance === 4) {
    priorityBadge = (
      <span style={{ color: "#2dd4bf", fontWeight: 500 }}>Penting (4)</span>
    );
  } else if (numImportance === 3) {
    priorityBadge = <span style={{ color: "#94a8b3" }}>Sedang (3)</span>;
  } else {
    priorityBadge = (
      <span style={{ color: "#64748b" }}>Rendah ({numImportance})</span>
    );
  }

  return (
    <tr data-id={id}>
      <th scope="row" className="font-mono text-cyan-300">
        {id}
      </th>
      <td>{displayCategory}</td>
      <td>{displayText}</td>
      <td>{priorityBadge}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-edit-memory"
            data-id={id}
            onClick={() => onEditRequest && onEditRequest(memory)}
            style={{
              background: "none",
              border: "none",
              color: "#38bdf8",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "0.85rem",
            }}
          >
            Ubah
          </button>
          <span style={{ color: "rgba(148, 168, 179, 0.4)" }}>|</span>
          <button
            type="button"
            className="btn-delete-memory"
            data-id={id}
            onClick={() => onDeleteRequest(id)}
            style={{
              background: "none",
              border: "none",
              color: "#f43f5e",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "0.85rem",
            }}
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}
