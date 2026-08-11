// components/schedule/ScheduleModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "../shared/Modal";
import { Input, Select } from "../shared/Inputs";
import { CLUBS } from "../../utils/mockData";

export function ScheduleModal({ item, onSave, onClose, onDelete }) {
  const isNew = !item;
  const [form, setForm] = useState(
    item || {
      clubId: 14,
      date: "10.08.2026",
      time: "09:00",
      name: "",
      trainer: "",
      zone: "",
      duration: 60,
      available: 10,
      total: 20,
    }
  );
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const clubOptions = [
    { value: "", label: "— Выберите клуб" },
    ...CLUBS.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <Modal title={isNew ? "Новое занятие" : "Редактировать занятие"} onClose={onClose} width={520}>
      <div className="modal-grid-2">
        <Select
          label="Клуб"
          value={form.clubId}
          onChange={(v) => set("clubId", +v)}
          options={clubOptions}
        />
        <Input label="Название" value={form.name} onChange={(v) => set("name", v)} placeholder="Хатха-йога" />
        <Input label="Дата (ДД.ММ.ГГГГ)" value={form.date} onChange={(v) => set("date", v)} placeholder="10.08.2026" />
        <Input label="Время" value={form.time} onChange={(v) => set("time", v)} placeholder="09:00" />
        <Input label="Тренер" value={form.trainer} onChange={(v) => set("trainer", v)} placeholder="Фамилия И." />
        <Input label="Зал / Зона" value={form.zone} onChange={(v) => set("zone", v)} placeholder="Зал 1" />
        <Input label="Длительность (мин)" value={form.duration} onChange={(v) => set("duration", +v)} type="number" />
        <Input label="Свободных мест" value={form.available} onChange={(v) => set("available", +v)} type="number" />
        <Input label="Всего мест" value={form.total} onChange={(v) => set("total", +v)} type="number" />
      </div>
      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? () => onDelete(form.id) : undefined}
      />
    </Modal>
  );
}