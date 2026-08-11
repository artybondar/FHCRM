// components/shared/Error.jsx
export function Error({ msg }) {
  if (!msg) return null;
  return (
    <div className="error">
      <span>!</span>
      <span>{msg}</span>
    </div>
  );
}