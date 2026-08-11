// components/shared/Badge.jsx
export function Badge({ label, color }) {
  return (
    <span className="badge" style={{ background: `${color}22`, color }}>
      {label}
    </span>
  );
}