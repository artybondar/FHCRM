// components/clients/ClientsTab.jsx
import { useState } from "react";
import { PageHeader } from "../shared/PageHeader";
import { SearchBar } from "../shared/SearchBar";
import { Badge } from "../shared/Badge";
import { ClientModal } from "./ClientModal";
import { ICLIENTS, CLUBS } from "../../utils/mockData";
import { CLIENT_STATUS } from "../../utils/constants";
import { getClubName, nextId } from "../../utils/helpers";

export default function ClientsTab() {
  const [clients, setClients] = useState(ICLIENTS);
  const [query, setQuery] = useState("");
  const [clubFilter, setClubFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState(null);

  const filtered = clients.filter((c) => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.phone.includes(query))
      return false;
    if (clubFilter && String(c.clubId) !== clubFilter) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    return true;
  });

  const save = (item) => {
    if (item.id) {
      setClients((cs) => cs.map((c) => (c.id === item.id ? item : c)));
    } else {
      setClients((cs) => [...cs, { ...item, id: nextId(cs) }]);
    }
    setModal(null);
  };

  const del = (id) => {
    setClients((cs) => cs.filter((c) => c.id !== id));
    setModal(null);
  };

  return (
    <div style={{ padding: "24px 24px 32px" }}>
      <PageHeader
        title="Клиенты"
        sub="Управление клиентской базой"
        action="Добавить клиента"
        onAction={() => setModal("new")}
      />
      
      <div className="flex gap-10 flex-wrap mb-16">
        <SearchBar value={query} onChange={setQuery} placeholder="Имя или телефон…" />
        <select
          value={clubFilter}
          onChange={(e) => setClubFilter(e.target.value)}
          className="input select"
          style={{ maxWidth: 200 }}
        >
          <option value="">— Все клубы</option>
          {CLUBS.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input select"
          style={{ maxWidth: 160 }}
        >
          <option value="">— Все статусы</option>
          {Object.entries(CLIENT_STATUS).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              {["Клиент", "Клуб", "Статус", "Карта", "Визиты", "С"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="table-row" onClick={() => setModal(c)}>
                <td>
                  <div className="table-cell-name">{c.name}</div>
                  <div className="table-cell-sub">{c.phone}</div>
                </td>
                <td className="table-cell-text" style={{ whiteSpace: "nowrap" }}>
                  {getClubName(c.clubId, CLUBS)}
                </td>
                <td>
                  <Badge
                    label={CLIENT_STATUS[c.status]?.label || c.status}
                    color={CLIENT_STATUS[c.status]?.color || "var(--muted)"}
                  />
                </td>
                <td className="table-cell-text table-cell-monospace">{c.card}</td>
                <td className="table-cell-text--white" style={{ textAlign: "center", fontWeight: 600 }}>
                  {c.visits}
                </td>
                <td className="table-cell-text" style={{ whiteSpace: "nowrap" }}>
                  {c.since}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                  Клиентов не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <ClientModal
          item={modal === "new" ? null : modal}
          onSave={save}
          onClose={() => setModal(null)}
          onDelete={del}
        />
      )}
    </div>
  );
}