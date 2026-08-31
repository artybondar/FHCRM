// components/shared/Drawer.jsx
import { useEffect } from "react";
import { Icons } from "./Icons";

export function Drawer({ title, subtitle, onClose, children, footer, width = 920 }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="drawer" style={{ maxWidth: width }}>
        <div className="drawer-header">
          <div>
            <div className="modal-title">{title}</div>
            {subtitle && <div className="table-cell-sub" style={{ marginTop: 2 }}>{subtitle}</div>}
          </div>
          <button className="modal-close" onClick={onClose}>
            {Icons.close}
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
    </div>
  );
}
