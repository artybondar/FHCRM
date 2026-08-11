// components/promos/PromosTab.jsx
import { useState } from "react";
import { PageHeader } from "../shared/PageHeader";
import { Badge } from "../shared/Badge";
import { PromoModal } from "./PromoModal";
import { IPROMOS, CLUBS } from "../../utils/mockData";
import { nextId } from "../../utils/helpers";

export default function PromosTab() {
  const [promos, setPromos] = useState(IPROMOS);
  const [modal, setModal] = useState(null);

  const save = (item) => {
    if (item.id) {
      setPromos((ps) => ps.map((p) => (p.id === item.id ? item : p)));
    } else {
      setPromos((ps) => [...ps, { ...item, id: nextId(ps) }]);
    }
    setModal(null);
  };

  const del = (id) => {
    setPromos((ps) => ps.filter((p) => p.id !== id));
    setModal(null);
  };

  const toggle = (id) => {
    setPromos((ps) => ps.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const getClubName = (id) => {
    if (id === 0) return "Все клубы";
    return CLUBS.find((c) => c.id === id)?.name || "—";
  };

  return (
    <div style={{ padding: "24px 24px 32px" }}>
      <PageHeader
        title="Акции"
        sub="Специальные предложения и скидки"
        action="Создать акцию"
        onAction={() => setModal("new")}
      />

      <div className="card-grid">
        {promos.map((p) => (
          <div key={p.id} className={`card ${p.active ? "card--active" : ""}`}>
            <div className="card-body" onClick={() => setModal(p)}>
              <div className="card-title">{p.title}</div>
              <div className="card-description">{p.desc}</div>
              <div className="card-meta">
                <Badge label={getClubName(p.clubId)} color="var(--info)" />
                <span className="card-meta-date">
                  {p.from} — {p.to}
                </span>
              </div>
            </div>
            <div className="card-footer">
              <Badge
                label={p.active ? "Активна" : "Завершена"}
                color={p.active ? "var(--warn)" : "var(--muted)"}
              />
              <div
                onClick={() => toggle(p.id)}
                className={`toggle-switch ${p.active ? "toggle-switch--active" : ""}`}
                style={{ width: 40, height: 22, borderRadius: 11 }}
              >
                <div
                  className={`toggle-knob ${p.active ? "toggle-knob--active" : ""}`}
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {promos.length === 0 && (
        <div className="schedule-empty">
          <div className="schedule-empty-icon schedule-empty-icon--dim">◈</div>
          <div>Акций нет</div>
        </div>
      )}

      {modal && (
        <PromoModal
          item={modal === "new" ? null : modal}
          onSave={save}
          onClose={() => setModal(null)}
          onDelete={del}
        />
      )}
    </div>
  );
}