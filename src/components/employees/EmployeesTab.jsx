// components/employees/EmployeesTab.jsx
import { useState } from "react";
import { PageHeader } from "../shared/PageHeader";
import { Badge } from "../shared/Badge";
import { EmployeeModal } from "./EmployeeModal";
import { IEMPS, CLUBS } from "../../utils/mockData";
import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from "../../utils/constants";
import { getClubName, nextId } from "../../utils/helpers";

export default function EmployeesTab() {
  const [emps, setEmps] = useState(IEMPS);
  const [clubFilter, setClubFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [modal, setModal] = useState(null);

  const filtered = emps.filter((e) => {
    if (clubFilter && String(e.clubId) !== clubFilter) return false;
    if (roleFilter && e.role !== roleFilter) return false;
    return true;
  });

  const save = (item) => {
    if (item.id) {
      setEmps((es) => es.map((e) => (e.id === item.id ? item : e)));
    } else {
      setEmps((es) => [...es, { ...item, id: nextId(es) }]);
    }
    setModal(null);
  };

  const del = (id) => {
    setEmps((es) => es.filter((e) => e.id !== id));
    setModal(null);
  };

  return (
    <div style={{ padding: "24px 24px 32px" }}>
      <PageHeader
        title="Сотрудники"
        sub="Управление персоналом клубов"
        action="Добавить сотрудника"
        onAction={() => setModal("new")}
      />

      <div className="flex gap-10 flex-wrap mb-16">
        <select
          value={clubFilter}
          onChange={(e) => setClubFilter(e.target.value)}
          className="input select"
          style={{ maxWidth: 200 }}
        >
          <option value="">— Все клубы</option>
          {CLUBS.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="input select"
          style={{ maxWidth: 180 }}
        >
          <option value="">— Все роли</option>
          {Object.entries(EMPLOYEE_ROLE).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table className="table" style={{ minWidth: 560 }}>
          <thead>
            <tr>
              {["Сотрудник", "Роль", "Клуб", "Статус", "С"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="table-row" onClick={() => setModal(e)}>
                <td>
                  <div className="table-cell-name">{e.name}</div>
                  <div className="table-cell-sub">{e.phone}</div>
                </td>
                <td>
                  <Badge
                    label={EMPLOYEE_ROLE[e.role]?.label || e.role}
                    color={EMPLOYEE_ROLE[e.role]?.color || "var(--muted)"}
                  />
                </td>
                <td className="table-cell-text" style={{ whiteSpace: "nowrap" }}>
                  {getClubName(e.clubId, CLUBS)}
                </td>
                <td>
                  <Badge
                    label={EMPLOYEE_STATUS[e.status]?.label || e.status}
                    color={EMPLOYEE_STATUS[e.status]?.color || "var(--muted)"}
                  />
                </td>
                <td className="table-cell-text" style={{ whiteSpace: "nowrap" }}>
                  {e.since}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                  Сотрудников не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <EmployeeModal
          item={modal === "new" ? null : modal}
          onSave={save}
          onClose={() => setModal(null)}
          onDelete={del}
        />
      )}
    </div>
  );
}