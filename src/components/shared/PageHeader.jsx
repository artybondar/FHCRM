// components/shared/PageHeader.jsx
import { Button } from "./Button";

export function PageHeader({ title, sub, action, onAction }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
      {action && (
        <Button onClick={onAction} className="flex-shrink-0" style={{ whiteSpace: "nowrap" }}>
          + {action}
        </Button>
      )}
    </div>
  );
}