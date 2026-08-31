// components/clients/ClientDrawer.jsx
import { useState } from "react";
import { Drawer } from "../shared/Drawer";
import { Input, Select, Textarea } from "../shared/Inputs";
import { Toggle } from "../shared/Toggle";
import { Badge } from "../shared/Badge";
import { Avatar } from "../shared/Avatar";
import { StatCard } from "../shared/StatCard";
import { Button } from "../shared/Button";
import { EntityDetailTabs } from "../shared/EntityDetailTabs";
import { CLUBS } from "../../utils/mockData";
import { CLIENT_STATUS, GENDER, AD_SOURCES, CLIENT_DETAIL_TABS, CLIENT_TAB_GROUPS } from "../../utils/constants";
import { calcAge, fullName, initials, getClientStats, getClubName } from "../../utils/helpers";

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

export function ClientDrawer({ item, onSave, onClose, onDelete, related, onRelatedChange }) {
  const isNew = !item;
  const [form, setForm] = useState(item || emptyForm);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const age = calcAge(form.birthDate);
  const stats = !isNew ? getClientStats(form.id, related) : null;

  return (
    <Drawer
      title={isNew ? "Новый клиент" : fullName(form)}
      subtitle={!isNew ? `Клиент с ${form.since || "—"} · ${getClubName(form.clubId, CLUBS)}` : "Заполните карточку клиента"}
      onClose={onClose}
      footer={
        <>
          {!isNew && (
            <button className="btn btn-danger" onClick={() => onDelete(form.id)}>
              Удалить клиента
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
          <Avatar initials={initials(form)} seed={form.id} size={52} statusColor={CLIENT_STATUS[form.status]?.color} />
          <div>
            <div className="drawer-profile-name">{fullName(form)}</div>
            <div className="drawer-profile-sub">
              <Badge label={CLIENT_STATUS[form.status]?.label} color={CLIENT_STATUS[form.status]?.color} />
              {"  "}№ {form.card || "—"} · {form.phone}
            </div>
          </div>
        </div>
      )}

      {stats && (
        <div className="stat-card-grid">
          <StatCard label="Баланс" value={`${stats.balance.toLocaleString("ru-RU")} ₽`} color="var(--ok)" />
          <StatCard
            label="Активный договор"
            value={stats.activeContract ? stats.activeContract.name : "Нет"}
            sub={stats.activeContract ? `до ${stats.activeContract.end}` : undefined}
            color={stats.activeContract ? "var(--text)" : "var(--muted)"}
          />
          <StatCard
            label="Дней до окончания"
            value={stats.daysLeft ?? "—"}
            color={stats.daysLeft != null && stats.daysLeft <= 7 ? "var(--warn)" : "var(--text)"}
          />
          <StatCard label="Визитов всего" value={stats.visitsCount} />
          <StatCard label="Доступно заморозок" value={`${stats.freezesAvailable} дн.`} />
        </div>
      )}

      <div className="client-section-title" style={{ marginTop: 0 }}>Личные данные</div>
      <div className="drawer-grid-3">
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
      <div className="drawer-grid-3">
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
          options={Object.entries(CLIENT_STATUS).map(([k, v]) => ({ value: k, label: v.label }))}
        />
        <Input label="Номер карты" value={form.card} onChange={(v) => set("card", v)} placeholder="FH-00000" />
        <Input label="Дата вступления" value={form.since} onChange={(v) => set("since", v)} placeholder="01.01.2025" />
        <Input label="Мед.справка (действует до)" value={form.medCert} onChange={(v) => set("medCert", v)} placeholder="ДД.ММ.ГГГГ" />
        <Select
          label="Реклама"
          value={form.adSource}
          onChange={(v) => set("adSource", v)}
          options={AD_SOURCES.map((s) => ({ value: s, label: s }))}
        />
      </div>

      <div className="drawer-grid-3">
        <div style={{ gridColumn: "1 / -1" }}>
          <Textarea label="Адрес" value={form.address} onChange={(v) => set("address", v)} rows={2} />
        </div>
      </div>
      <Toggle label="Фото сделано" value={form.photo} onChange={(v) => set("photo", v)} />

      {!isNew && (
        <EntityDetailTabs
          groups={CLIENT_TAB_GROUPS}
          tabs={CLIENT_DETAIL_TABS}
          data={related}
          entityId={form.id}
          entityKey="clientId"
          onChange={onRelatedChange}
        />
      )}
    </Drawer>
  );
}
