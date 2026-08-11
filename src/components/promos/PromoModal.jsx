// components/promos/PromoModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "../shared/Modal";
import { Input, Select, Textarea } from "../shared/Inputs";
import { Toggle } from "../shared/Toggle";
import { CLUBS } from "../../utils/mockData";
import { getAllClubsOption } from "../../utils/helpers";

export function PromoModal({ item, onSave, onClose, onDelete }) {
  const isNew = !item;
  const [form, setForm] = useState(
    item || {
      title: "",
      desc: "",
      from: "",
      to: "",
      clubId: 0,
      active: true,
    }
  );
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Modal title={isNew ? "Новая акция" : "Редактировать акцию"} onClose={onClose} width={540}>
      <Input label="Название" value={form.title} onChange={(v) => set("title", v)} placeholder="Летняя акция -30%" />
      <Textarea label="Описание" value={form.desc} onChange={(v) => set("desc", v)} rows={3} />
      <div className="modal-grid-2">
        <Select
          label="Клуб"
          value={form.clubId}
          onChange={(v) => set("clubId", +v)}
          options={getAllClubsOption(CLUBS)}
        />
        <div />
        <Input label="Начало (ДД.ММ.ГГГГ)" value={form.from} onChange={(v) => set("from", v)} placeholder="01.01.2026" />
        <Input label="Конец (ДД.ММ.ГГГГ)" value={form.to} onChange={(v) => set("to", v)} placeholder="31.01.2026" />
      </div>
      <Toggle label="Акция активна" value={form.active} onChange={(v) => set("active", v)} />
      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? () => onDelete(form.id) : undefined}
      />
    </Modal>
  );
}