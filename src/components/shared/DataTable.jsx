// components/shared/DataTable.jsx
import { Icons } from "./Icons";

const fmtCell = (row, col) => {
  const v = row[col.key];
  if (col.type === "bool") return v ? "Да" : "Нет";
  if (col.type === "money") return v || v === 0 ? `${Number(v).toLocaleString("ru-RU")} ₽` : "—";
  return v === "" || v === undefined || v === null ? "—" : v;
};

export function DataTable({ columns, rows, emptyText = "Нет данных", onEdit, onDelete }) {
  const withActions = Boolean(onEdit || onDelete);
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            {withActions && <th style={{ width: 64 }}></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={onEdit ? "table-row" : ""} onClick={onEdit ? () => onEdit(row) : undefined}>
              {columns.map((c) => (
                <td key={c.key} className="table-cell-text">
                  {fmtCell(row, c)}
                </td>
              ))}
              {withActions && (
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-8" style={{ justifyContent: "flex-end" }}>
                    {onEdit && (
                      <button type="button" className="row-action-btn" onClick={() => onEdit(row)} title="Редактировать">
                        {Icons.edit}
                      </button>
                    )}
                    {onDelete && (
                      <button type="button" className="row-action-btn row-action-btn--danger" onClick={() => onDelete(row.id)} title="Удалить">
                        {Icons.trash}
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (withActions ? 1 : 0)} style={{ textAlign: "center", padding: "28px", color: "var(--muted)" }}>
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
