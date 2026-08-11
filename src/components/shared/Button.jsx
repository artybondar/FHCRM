// components/shared/Button.jsx
import { useState } from "react";

export function Button({ children, loading, disabled, onClick, className = "", style = {}, ...props }) {
  const [hover, setHover] = useState(false);
  const off = disabled || loading;

  return (
    <button
      onClick={off ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={off}
      className={`btn ${off ? "btn-disabled" : ""} ${className}`}
      style={style}
      {...props}
    >
      {loading ? "Загрузка…" : children}
    </button>
  );
}