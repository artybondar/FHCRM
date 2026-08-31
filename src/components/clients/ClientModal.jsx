// components/clients/ClientModal.jsx
import { useState } from "react";
import { Modal, ModalFooter } from "../shared/Modal";
import { Input, Select, Textarea } from "../shared/Inputs";
import { Toggle } from "../shared/Toggle";
import { ClientDetailTabs } from "./ClientDetailTabs";
import { CLUBS } from "../../utils/mockData";
import { CLIENT_STATUS, GENDER, AD_SOURCES } from "../../utils/constants";
import { calcAge } from "../../utils/helpers";

const emptyForm = {
  lastName: "",
  firstName: "",
  middleName: "",
  phone: "",
  email: "",
  clubId: 14,
  status: "active",
  card: "",
  since: "",
  visits: 0,
  birthDate: "",
  gender: "f",
  photo: false,
  medCert: "",
  adSource: AD_SOURCES[0],
  address: "",
};

export function ClientModal({ item, onSave, onClose, onDelete }) {
  const isNew = !item;
  const [form, setForm] = useState(item || emptyForm);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const age = calcAge(form.birthDate);

  return (
    <Modal title={isNew ? "Новый клиент" : "Редактировать клиента"} onClose={onClose} width={760}>
      <div className="client-section-title" style={{ marginTop: 0 }}>Личные данные</div>
      <div className="modal-grid-2">
        <Input label="Фамилия" value={form.lastName} onChange={(v) => set("lastName", v)} placeholder="Иванова" />
        <Input label="Имя" value={form.firstName} onChange={(v) => set("firstName", v)} placeholder="Мария" />
        <Input label="Отчество" value={form.middleName} onChange={(v) => set("middleName", v)} placeholder="Сергеевна" />
        <Select
          label="Пол"
          value={form.gender}
          onChange={(v) => set("gender", v)}
          options={Object.entries(GENDER).map(([k, v]) => ({ value: k, label: v.label }))}
        />
        <Input label="Дата рождения" value={form.birthDate} onChange={(v) => set("birthDate", v)} placeholder="14.06.1990" />
        <Input label="Возраст" value={age ?? "—"} onChange={() => {}} disabled />
        <Input label="Телефон" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+7 900 000-00-00" />
        <Input label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" placeholder="mail@example.com" />
      </div>

      <div className="client-section-title">Клуб и статус</div>
      <div className="modal-grid-2">
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

      <div className="client-section-title">Дополнительно</div>
      <div className="modal-grid-2">
        <Input label="Мед.справка (действует до)" value={form.medCert} onChange={(v) => set("medCert", v)} placeholder="ДД.ММ.ГГГГ" />
        <Select
          label="Реклама"
          value={form.adSource}
          onChange={(v) => set("adSource", v)}
          options={AD_SOURCES.map((s) => ({ value: s, label: s }))}
        />
      </div>
      <Textarea label="Адрес" value={form.address} onChange={(v) => set("address", v)} rows={2} />
      <Toggle label="Фото сделано" value={form.photo} onChange={(v) => set("photo", v)} />

      {!isNew && (
        <>
          <div style={{ height: 4 }} />
          <ClientDetailTabs clientId={form.id} />
        </>
      )}

      <ModalFooter
        onCancel={onClose}
        onSave={() => onSave(form)}
        onDelete={!isNew ? () => onDelete(form.id) : undefined}
      />
    </Modal>
  );
}
