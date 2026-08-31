// components/clients/ClientDetailTabs.jsx
import { useState } from "react";
import { DataTable } from "../shared/DataTable";
import { CLIENT_DETAIL_TABS } from "../../utils/constants";
import { CLIENT_RELATED } from "../../utils/mockData";

export function ClientDetailTabs({ clientId }) {
  const [active, setActive] = useState(CLIENT_DETAIL_TABS[0].id);
  const tab = CLIENT_DETAIL_TABS.find((t) => t.id === active);
  const rows = (CLIENT_RELATED[tab.source] || []).filter((r) => r.clientId === clientId);

  return (
    <div>
      <div className="client-section-title">История и связанные данные</div>
      <div className="client-tabs">
        {CLIENT_DETAIL_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`client-tab ${t.id === active ? "client-tab--active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <DataTable columns={tab.columns} rows={rows} />
    </div>
  );
}
