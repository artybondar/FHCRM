// components/shared/Inputs.jsx
export function Field({ label, children }) {
  return (
    <div className="field">
      {label && <div className="field-label">{label}</div>}
      {children}
    </div>
  );
}

export function Input({ label, value, onChange, type = "text", placeholder, className = "", style = {}, ...props }) {
  return (
    <Field label={label}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input ${className}`}
        style={style}
        {...props}
      />
    </Field>
  );
}

export function Select({ label, value, onChange, options, className = "", style = {} }) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input select ${className}`}
        style={style}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Textarea({ label, value, onChange, rows = 3, className = "", style = {} }) {
  return (
    <Field label={label}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`input textarea ${className}`}
        style={style}
      />
    </Field>
  );
}