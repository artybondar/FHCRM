// components/shared/Toggle.jsx
export function Toggle({ label, value, onChange }) {
  return (
    <div className="toggle">
      <span className="toggle-label">{label}</span>
      <div
        onClick={() => onChange(!value)}
        className={`toggle-switch ${value ? "toggle-switch--active" : ""}`}
      >
        <div className={`toggle-knob ${value ? "toggle-knob--active" : ""}`} />
      </div>
    </div>
  );
}