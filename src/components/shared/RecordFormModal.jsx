// components/shared/RecordFormModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "./Modal";
import { Toggle } from "./Toggle";

const isDateKey = (key) => /^(date|start|end|since|regDate|created|validUntil|paymentDate|fixEndDate|rentEnd)$/i.test(key);

export function RecordFormModal({ title, columns, record, onSave, onClose, onDelete }) {
  const isNew = !record;
  const initial = record || Object.fromEntries(
    columns.map((c) => [c.key, c.type === "bool" ? false : c.type === "number" || c.type === "money" ? 0 : ""])
  );
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const width = columns.length > 14 ? 640 : 480;

  return (
    <Modal title={`${isNew ? "Новая запись" : "Редактирование"} — ${title}`} onClose={onClose} width={width}>
      <div className="field-list">
        {columns.map((c) => (
          <div className="field-row" key={c.key}>
            <div className="field-row-label">{c.label}</div>
            <div className="field-row-value">
              {c.type === "bool" ? (
                <Toggle value={Boolean(form[c.key])} onChange={(v) => set(c.key, v)} />
              ) : c.type === "number" || c.type === "money" ? (
                <input
                  type="number"
                  className="input"
                  value={form[c.key]}
                  onChange={(e) => set(c.key, e.target.value === "" ? "" : Number(e.target.value))}
                  step={c.type === "money" ? "0.01" : "1"}
                />
              ) : (
                <input
                  type="text"
                  className="input"
                  value={form[c.key] ?? ""}
                  onChange={(e) => set(c.key, e.target.value)}
                  placeholder={isDateKey(c.key) ? "ДД.ММ.ГГГГ" : ""}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? onDelete : undefined}
      />
    </Modal>
  );
}
