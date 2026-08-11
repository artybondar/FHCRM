// components/shared/Modal.jsx
import { useEffect } from "react";
import { Button } from "./Button";

export function Modal({ title, onClose, children, width = 500 }) {
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
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${width > 520 ? "modal-wide" : ""}`} style={{ maxWidth: width }}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export function ModalFooter({ onCancel, onSave, onDelete, saveLabel = "Сохранить" }) {
  return (
    <div className="modal-footer">
      {onDelete && (
        <button className="btn btn-danger" onClick={onDelete}>
          Удалить
        </button>
      )}
      <div className="modal-footer-spacer" />
      <button className="btn btn-secondary" onClick={onCancel}>
        Отмена
      </button>
      <Button onClick={onSave}>{saveLabel}</Button>
    </div>
  );
}