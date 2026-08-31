// components/shared/RecordFormModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "./Modal";
import { Input } from "./Inputs";
import { Toggle } from "./Toggle";

export function RecordFormModal({ title, columns, record, onSave, onClose, onDelete }) {
  const isNew = !record;
  const initial = record || Object.fromEntries(
    columns.map((c) => [c.key, c.type === "bool" ? false : c.type === "number" || c.type === "money" ? 0 : ""])
  );
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Modal title={`${isNew ? "Новая запись" : "Редактирование"} — ${title}`} onClose={onClose} width={520}>
      <div className="modal-grid-2">
        {columns.map((c) => {
          if (c.type === "bool") {
            return (
              <div key={c.key} style={{ gridColumn: "1 / -1" }}>
                <Toggle label={c.label} value={Boolean(form[c.key])} onChange={(v) => set(c.key, v)} />
              </div>
            );
          }
          if (c.type === "number" || c.type === "money") {
            return (
              <Input
                key={c.key}
                label={c.label}
                type="number"
                value={form[c.key]}
                onChange={(v) => set(c.key, v === "" ? "" : Number(v))}
              />
            );
          }
          return (
            <Input
              key={c.key}
              label={c.label}
              value={form[c.key] ?? ""}
              onChange={(v) => set(c.key, v)}
              placeholder={/^(date|start|end|since|regDate|created|validUntil)$/i.test(c.key) ? "ДД.ММ.ГГГГ" : ""}
            />
          );
        })}
      </div>
      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? onDelete : undefined}
      />
    </Modal>
  );
}
