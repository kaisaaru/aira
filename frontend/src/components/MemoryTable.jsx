import MemoryRow from "./MemoryRow";

export default function MemoryTable({
  memories,
  filteredMemories,
  onDeleteRequest,
}) {
  return (
    <div className="table-responsive">
      <table className="settings-table w-full text-left">
        <thead>
          <tr>
            <th scope="col">Kode</th>
            <th scope="col">Kategori</th>
            <th scope="col">Fakta yang Diingat</th>
            <th scope="col">Prioritas</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody id="memory-table-body">
          {memories.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  color: "#94a8b3",
                  padding: "24px",
                  fontSize: "0.88rem",
                }}
              >
                Belum ada data catatan memori. Tambahkan catatan baru melalui formulir di atas.
              </td>
            </tr>
          ) : filteredMemories.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  color: "#94a8b3",
                  padding: "24px",
                  fontSize: "0.85rem",
                }}
              >
                Tidak ada catatan memori yang sesuai dengan filter.
              </td>
            </tr>
          ) : (
            filteredMemories.map((item) => (
              <MemoryRow
                key={item.id}
                memory={item}
                onDeleteRequest={onDeleteRequest}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
