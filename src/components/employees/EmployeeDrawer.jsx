// components/employees/EmployeeDrawer.jsx
import { useState } from "react";
import { Drawer } from "../shared/Drawer";
import { Input, Select } from "../shared/Inputs";
import { Badge } from "../shared/Badge";
import { Avatar } from "../shared/Avatar";
import { StatCard } from "../shared/StatCard";
import { Button } from "../shared/Button";
import { EntityDetailTabs } from "../shared/EntityDetailTabs";
import { CLUBS } from "../../utils/mockData";
import {
  EMPLOYEE_ROLE,
  EMPLOYEE_STATUS,
  EMPLOYEE_CATEGORY,
  GENDER,
  EMPLOYEE_DETAIL_TABS,
  EMPLOYEE_TAB_GROUPS,
} from "../../utils/constants";
import { calcAge, fullName, initials, getEmployeeStats, getClubName } from "../../utils/helpers";

const emptyForm = {
  lastName: "",
  firstName: "",
  middleName: "",
  role: "trainer",
  clubId: 14,
  phone: "",
  email: "",
  status: "active",
  since: "",
  birthDate: "",
  gender: "f",
  address: "",
  specialization: "",
  category: EMPLOYEE_CATEGORY[0],
  rate: 0,
  medCert: "",
};

export function EmployeeDrawer({ item, onSave, onClose, onDelete, related, onRelatedChange }) {
  const isNew = !item;
  const [form, setForm] = useState(item || emptyForm);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const age = calcAge(form.birthDate);
  const stats = !isNew ? getEmployeeStats(form.id, related) : null;

  return (
    <Drawer
      title={isNew ? "Новый сотрудник" : fullName(form)}
      subtitle={!isNew ? `${EMPLOYEE_ROLE[form.role]?.label} · ${getClubName(form.clubId, CLUBS)}` : "Заполните карточку сотрудника"}
      onClose={onClose}
      footer={
        <>
          {!isNew && (
            <button className="btn btn-danger" onClick={() => onDelete(form.id)}>
              Удалить сотрудника
            </button>
          )}
          <div className="modal-footer-spacer" />
          <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
          <Button onClick={() => onSave(form)}>Сохранить</Button>
        </>
      }
    >
      {!isNew && (
        <div className="drawer-profile-header">
          <Avatar initials={initials(form)} seed={form.id} size={52} statusColor={EMPLOYEE_STATUS[form.status]?.color} />
          <div>
            <div className="drawer-profile-name">{fullName(form)}</div>
            <div className="drawer-profile-sub">
              <Badge label={EMPLOYEE_STATUS[form.status]?.label} color={EMPLOYEE_STATUS[form.status]?.color} />
              {"  "}{form.specialization || "—"}
            </div>
          </div>
        </div>
      )}

      {stats && (
        <div className="stat-card-grid">
          <StatCard label="Занятий в расписании" value={stats.scheduleCount} />
          <StatCard label="Клиентов" value={stats.clientsCount} />
          <StatCard label="Последнее начисление" value={`${stats.lastPayroll.toLocaleString("ru-RU")} ₽`} color="var(--ok)" />
          <StatCard label="Ставка за занятие" value={`${form.rate} ₽`} />
        </div>
      )}

      <div className="client-section-title" style={{ marginTop: 0 }}>Личные данные</div>
      <div className="drawer-grid-3">
        <Input label="Фамилия" value={form.lastName} onChange={(v) => set("lastName", v)} placeholder="Кузнецова" />
        <Input label="Имя" value={form.firstName} onChange={(v) => set("firstName", v)} placeholder="Анна" />
        <Input label="Отчество" value={form.middleName} onChange={(v) => set("middleName", v)} placeholder="Игоревна" />
        <Select
          label="Пол"
          value={form.gender}
          onChange={(v) => set("gender", v)}
          options={Object.entries(GENDER).map(([k, v]) => ({ value: k, label: v.label }))}
        />
        <Input label="Дата рождения" value={form.birthDate} onChange={(v) => set("birthDate", v)} placeholder="02.05.1994" />
        <Input label="Возраст" value={age ?? "—"} onChange={() => {}} disabled />
        <Input label="Телефон" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+7 900 000-00-00" />
        <Input label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" placeholder="name@fh.ru" />
      </div>

      <div className="client-section-title">Работа</div>
      <div className="drawer-grid-3">
        <Select
          label="Роль"
          value={form.role}
          onChange={(v) => set("role", v)}
          options={Object.entries(EMPLOYEE_ROLE).map(([k, v]) => ({ value: k, label: v.label }))}
        />
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
          options={Object.entries(EMPLOYEE_STATUS).map(([k, v]) => ({ value: k, label: v.label }))}
        />
        <Input label="Специализация" value={form.specialization} onChange={(v) => set("specialization", v)} placeholder="Йога, стретчинг" />
        <Select
          label="Категория"
          value={form.category}
          onChange={(v) => set("category", v)}
          options={EMPLOYEE_CATEGORY.map((c) => ({ value: c, label: c || "—" }))}
        />
        <Input label="Ставка за занятие, ₽" type="number" value={form.rate} onChange={(v) => set("rate", v === "" ? "" : Number(v))} />
        <Input label="Дата трудоустройства" value={form.since} onChange={(v) => set("since", v)} placeholder="01.01.2024" />
        <Input label="Мед.справка (действует до)" value={form.medCert} onChange={(v) => set("medCert", v)} placeholder="ДД.ММ.ГГГГ" />
        <Input label="Адрес" value={form.address} onChange={(v) => set("address", v)} placeholder="СПб, ул. Ленина, 1" />
      </div>

      {!isNew && (
        <EntityDetailTabs
          groups={EMPLOYEE_TAB_GROUPS}
          tabs={EMPLOYEE_DETAIL_TABS}
          data={related}
          entityId={form.id}
          entityKey="empId"
          onChange={onRelatedChange}
        />
      )}
    </Drawer>
  );
}
