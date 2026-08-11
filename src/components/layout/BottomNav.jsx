// components/layout/BottomNav.jsx
import { NAV_ITEMS } from "../../utils/constants";

export function BottomNav({ tab, onTab }) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ id, icon, label }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            onClick={() => onTab(id)}
            className={`bottom-nav-item ${active ? "bottom-nav-item--active" : ""}`}
          >
            <span className="bottom-nav-icon">{icon}</span>
            <span className={`bottom-nav-label ${active ? "bottom-nav-label--active" : ""}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}