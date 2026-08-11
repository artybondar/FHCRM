// components/clients/ClientModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "../shared/Modal";
import { Input, Select } from "../shared/Inputs";
import { CLUBS } from "../../utils/mockData";
import { CLIENT_STATUS } from "../../utils/constants";

export function ClientModal({ item, onSave, onClose, onDelete }) {
  const isNew = !item;
  const [form, setForm] = useState(
    item || {
      name: "",
      phone: "",
      email: "",
      clubId: 14,
      status: "active",
      card: "",
      since: "",
      visits: 0,
    }
  );
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Modal title={isNew ? "Новый клиент" : "Редактировать клиента"} onClose={onClose}>
      <Input label="ФИО" value={form.name} onChange={(v) => set("name", v)} placeholder="Иванова Мария Сергеевна" />
      <div className="modal-grid-2">
        <Input label="Телефон" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+7 900 000-00-00" />
        <Input label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" placeholder="mail@example.com" />
        <Select
          label="Клуб"
          value={form.clubId}
          onChange={(v) => set("clubId", +v)}
          options={CLUBS.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Select
          label="Статус"
          value={form.status}
          onChange={(v) => set("status", v)}
          options={Object.entries(CLIENT_STATUS).map(([k, v]) => ({
            value: k,
            label: v.label,
          }))}
        />
        <Input label="Номер карты" value={form.card} onChange={(v) => set("card", v)} placeholder="FH-00000" />
        <Input label="Дата вступления" value={form.since} onChange={(v) => set("since", v)} placeholder="01.01.2025" />
      </div>
      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? () => onDelete(form.id) : undefined}
      />
    </Modal>
  );
}