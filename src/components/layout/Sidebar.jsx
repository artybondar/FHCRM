// components/layout/Sidebar.jsx
import { NAV_ITEMS } from "../../utils/constants";

export function Sidebar({ tab, onTab, phone, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">FH</div>
        <div>
          <div className="sidebar-brand">Fitness House</div>
          <div className="sidebar-sub">CRM Dashboard</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ id, icon, label }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className={`sidebar-nav-item ${active ? "sidebar-nav-item--active" : ""}`}
            >
              <span className={`sidebar-nav-icon ${active ? "sidebar-nav-icon--active" : ""}`}>
                {icon}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-phone">{phone}</div>
        <button className="logout-btn" onClick={onLogout}>
          Выйти из системы
        </button>
      </div>
    </aside>
  );
}