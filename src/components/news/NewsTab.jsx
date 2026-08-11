// components/news/NewsTab.jsx
import { useState } from "react";
import { PageHeader } from "../shared/PageHeader";
import { Badge } from "../shared/Badge";
import { NewsModal } from "./NewsModal";
import { INEWS, CLUBS } from "../../utils/mockData";
import { nextId } from "../../utils/helpers";

export default function NewsTab() {
  const [news, setNews] = useState(INEWS);
  const [modal, setModal] = useState(null);

  const save = (item) => {
    if (item.id) {
      setNews((ns) => ns.map((n) => (n.id === item.id ? item : n)));
    } else {
      setNews((ns) => [...ns, { ...item, id: nextId(ns) }]);
    }
    setModal(null);
  };

  const del = (id) => {
    setNews((ns) => ns.filter((n) => n.id !== id));
    setModal(null);
  };

  const toggle = (id, key) => {
    setNews((ns) => ns.map((n) => (n.id === id ? { ...n, [key]: !n[key] } : n)));
  };

  const getClubName = (id) => {
    if (id === 0) return "Все клубы";
    return CLUBS.find((c) => c.id === id)?.name || "—";
  };

  return (
    <div style={{ padding: "24px 24px 32px" }}>
      <PageHeader
        title="Новости"
        sub="Публикация и управление новостями"
        action="Создать новость"
        onAction={() => setModal("new")}
      />

      <div className="card-grid">
        {news.map((n) => (
          <div key={n.id} className="card">
            <div className="card-body" onClick={() => setModal(n)}>
              <div className="card-title">{n.title}</div>
              <div className="card-description">{n.body}</div>
              <div className="card-meta">
                <Badge label={getClubName(n.clubId)} color="var(--info)" />
                <span className="card-meta-date">{n.date}</span>
              </div>
            </div>
            <div className="card-footer">
              <Badge
                label={n.published ? "Опубликовано" : "Черновик"}
                color={n.published ? "var(--ok)" : "var(--muted)"}
              />
              <div
                onClick={() => toggle(n.id, "published")}
                className={`toggle-switch ${n.published ? "toggle-switch--active" : ""}`}
                style={{ width: 40, height: 22, borderRadius: 11 }}
              >
                <div
                  className={`toggle-knob ${n.published ? "toggle-knob--active" : ""}`}
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <div className="schedule-empty">
          <div className="schedule-empty-icon schedule-empty-icon--dim">▤</div>
          <div>Новостей нет</div>
        </div>
      )}

      {modal && (
        <NewsModal
          item={modal === "new" ? null : modal}
          onSave={save}
          onClose={() => setModal(null)}
          onDelete={del}
        />
      )}
    </div>
  );
}