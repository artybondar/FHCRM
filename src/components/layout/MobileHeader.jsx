// components/layout/MobileHeader.jsx
import { Icons } from "../shared/Icons";

export function MobileHeader({ onMenu, tab }) {
  const current = NAV_ITEMS.find((n) => n.id === tab);
  return (
    <header className="mobile-header">
      <button className="mobile-menu-btn" onClick={onMenu}>
        {Icons.menu}
      </button>
      <div className="mobile-brand">
        <div className="mobile-logo">FH</div>
        <div className="mobile-title">{current?.label || "CRM"}</div>
      </div>
    </header>
  );
}