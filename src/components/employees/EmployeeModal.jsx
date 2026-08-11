// components/employees/EmployeeModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "../shared/Modal";
import { Input, Select } from "../shared/Inputs";
import { CLUBS } from "../../utils/mockData";
import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from "../../utils/constants";

export function EmployeeModal({ item, onSave, onClose, onDelete }) {
  const isNew = !item;
  const [form, setForm] = useState(
    item || {
      name: "",
      role: "trainer",
      clubId: 14,
      phone: "",
      email: "",
      status: "active",
      since: "",
    }
  );
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Modal title={isNew ? "Новый сотрудник" : "Редактировать сотрудника"} onClose={onClose}>
      <Input label="ФИО" value={form.name} onChange={(v) => set("name", v)} placeholder="Иванова Анна Сергеевна" />
      <div className="modal-grid-2">
        <Select
          label="Роль"
          value={form.role}
          onChange={(v) => set("role", v)}
          options={Object.entries(EMPLOYEE_ROLE).map(([k, v]) => ({
            value: k,
            label: v.label,
          }))}
        />
        <Select
          label="Клуб"
          value={form.clubId}
          onChange={(v) => set("clubId", +v)}
          options={CLUBS.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Input label="Телефон" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+7 900 000-00-00" />
        <Input label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" placeholder="name@fh.ru" />
        <Select
          label="Статус"
          value={form.status}
          onChange={(v) => set("status", v)}
          options={Object.entries(EMPLOYEE_STATUS).map(([k, v]) => ({
            value: k,
            label: v.label,
          }))}
        />
        <Input label="Дата трудоустройства" value={form.since} onChange={(v) => set("since", v)} placeholder="01.01.2024" />
      </div>
      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? () => onDelete(form.id) : undefined}
      />
    </Modal>
  );
}