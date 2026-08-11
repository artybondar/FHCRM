// components/shared/SearchBar.jsx
export function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Поиск…"}
      className="input search-bar"
    />
  );
}