export default function MemoryRow({ memory, onDeleteRequest }) {
  const { id, category, fact, priority } = memory;

  let priorityBadge = null;
  if (priority === "Utama") {
    priorityBadge = (
      <span style={{ color: "#38bdf8", fontWeight: 600 }}>Utama</span>
    );
  } else if (priority === "Penting") {
    priorityBadge = (
      <span style={{ color: "#2dd4bf", fontWeight: 500 }}>Penting</span>
    );
  } else {
    priorityBadge = <span style={{ color: "#94a8b3" }}>Sedang</span>;
  }

  return (
    <tr data-id={id}>
      <th scope="row">{id}</th>
      <td>{category}</td>
      <td>{fact}</td>
      <td>{priorityBadge}</td>
      <td>
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
      </td>
    </tr>
  );
}
