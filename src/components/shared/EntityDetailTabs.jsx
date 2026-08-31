// components/shared/EntityDetailTabs.jsx
import { useState } from "react";
import { DataTable } from "./DataTable";
import { RecordFormModal } from "./RecordFormModal";
import { Icons } from "./Icons";
import { nextId } from "../../utils/helpers";

export function EntityDetailTabs({ groups, tabs, data, entityId, entityKey, onChange }) {
  const [activeGroup, setActiveGroup] = useState(groups[0].id);
  const [activeTabId, setActiveTabId] = useState(tabs.find((t) => t.group === groups[0].id)?.id);
  const [editing, setEditing] = useState(null); // { record, isNew } | null

  const selectGroup = (g) => {
    setActiveGroup(g);
    setActiveTabId(tabs.find((t) => t.group === g)?.id);
  };

  const tab = tabs.find((t) => t.id === activeTabId) || tabs.find((t) => t.group === activeGroup);
  const allRows = data[tab.source] || [];
  const rows = allRows.filter((r) => r[entityKey] === entityId);

  const commit = (nextRows) => onChange(tab.source, nextRows);

  const handleSave = (record) => {
    if (record.id) {
      commit(allRows.map((r) => (r.id === record.id ? { ...record } : r)));
    } else {
      commit([...allRows, { ...record, id: nextId(allRows), [entityKey]: entityId }]);
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    commit(allRows.filter((r) => r.id !== id));
    setEditing(null);
  };

  return (
    <div>
      <div className="client-section-title" style={{ marginTop: 24 }}>История и связанные данные</div>

      <div className="entity-tab-groups">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`entity-tab-group ${g.id === activeGroup ? "entity-tab-group--active" : ""}`}
            onClick={() => selectGroup(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="client-tabs">
        {tabs.filter((t) => t.group === activeGroup).map((t) => (
          <button
            key={t.id}
            type="button"
            className={`client-tab ${t.id === activeTabId ? "client-tab--active" : ""}`}
            onClick={() => setActiveTabId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-12">
        <div className="table-cell-sub" style={{ fontSize: 12 }}>{rows.length} записей</div>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: "6px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}
          onClick={() => setEditing({ record: null, isNew: true })}
        >
          {Icons.plus} Добавить
        </button>
      </div>

      <DataTable
        columns={tab.columns}
        rows={rows}
        onEdit={(row) => setEditing({ record: row, isNew: false })}
        onDelete={handleDelete}
      />

      {editing && (
        <RecordFormModal
          title={tab.label}
          columns={tab.columns}
          record={editing.record}
          onSave={handleSave}
          onDelete={!editing.isNew ? () => handleDelete(editing.record.id) : undefined}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
