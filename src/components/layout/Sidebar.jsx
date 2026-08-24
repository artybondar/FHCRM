// components/layout/Sidebar.jsx
import { NAV_ITEMS } from "../../utils/constants";
import { Icons } from "../shared/Icons";

export function Sidebar({ tab, onTab, phone, onLogout, theme, onThemeToggle }) {
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
        <div className="sidebar-phone">Ваш аккаунт: {phone}</div>
        
        {/* Переключатель темы - исправлено */}
        <button 
          className="theme-toggle" 
          onClick={onThemeToggle}
          style={{ marginBottom: "8px", width: "100%", justifyContent: "center" }}
        >
          <span className="icon">
            {theme === "light" ? Icons.moon : Icons.sun}
          </span>
          {theme === "light" ? "Темная" : "Светлая"}
        </button>
        
        <button className="logout-btn" onClick={onLogout}>
          Выйти из системы
        </button>
      </div>
    </aside>
  );
}