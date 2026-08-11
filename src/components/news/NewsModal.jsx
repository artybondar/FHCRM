// components/news/NewsModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "../shared/Modal";
import { Input, Select, Textarea } from "../shared/Inputs";
import { Toggle } from "../shared/Toggle";
import { CLUBS } from "../../utils/mockData";
import { getAllClubsOption } from "../../utils/helpers";

export function NewsModal({ item, onSave, onClose, onDelete }) {
  const isNew = !item;
  const [form, setForm] = useState(
    item || {
      title: "",
      body: "",
      date: "",
      clubId: 0,
      published: false,
    }
  );
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Modal title={isNew ? "Новая новость" : "Редактировать новость"} onClose={onClose} width={560}>
      <Input label="Заголовок" value={form.title} onChange={(v) => set("title", v)} placeholder="Заголовок новости" />
      <Textarea label="Текст" value={form.body} onChange={(v) => set("body", v)} rows={4} />
      <div className="modal-grid-2">
        <Select
          label="Клуб"
          value={form.clubId}
          onChange={(v) => set("clubId", +v)}
          options={getAllClubsOption(CLUBS)}
        />
        <Input label="Дата (ДД.ММ.ГГГГ)" value={form.date} onChange={(v) => set("date", v)} placeholder="01.01.2026" />
      </div>
      <Toggle label="Опубликовать" value={form.published} onChange={(v) => set("published", v)} />
      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? () => onDelete(form.id) : undefined}
      />
    </Modal>
  );
}