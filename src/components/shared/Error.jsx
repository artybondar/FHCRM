import { Icons } from "./Icons";

export function Error({ msg }) {
  if (!msg) return null;
  return (
    <div className="error">
      <span>{Icons.error}</span>
      <span>{msg}</span>
    </div>
  );
}