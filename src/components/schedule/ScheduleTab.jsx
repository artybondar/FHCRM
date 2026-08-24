// components/schedule/ScheduleTab.jsx
import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "../shared/PageHeader";
import { Button } from "../shared/Button";
import { Error } from "../shared/Error";
import { SearchBar } from "../shared/SearchBar";
import { ScheduleModal } from "./ScheduleModal";
import { CITIES, CLUBS, ISCHED } from "../../utils/mockData";
import { api } from "../../utils/api";
import { Icons } from "../shared/Icons";
import { 
  getTagColor, 
  toISO, 
  fromISO, 
  dotToDate, 
  fmtDot, 
  nextId 
} from "../../utils/helpers";

const DEV_TOKEN = "dev-access-token";

export default function ScheduleTab({ token }) {
  const isDev = !token || token === DEV_TOKEN;
  
  const [cities, setCities] = useState(CITIES);
  const [clubs, setClubs] = useState(CLUBS);
  const [metaLoad, setMetaLoad] = useState(!isDev);
  
  // Фильтры как в других вкладках
  const [cityFilter, setCityFilter] = useState("");
  const [clubFilter, setClubFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Фильтры по датам
  const today = new Date();
  const [dateFrom, setDateFrom] = useState(toISO(today));
  const [dateTo, setDateTo] = useState(toISO(new Date(+today + 30 * 24 * 60 * 60 * 1000)));
  
  // Все данные
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);

  // Загрузка данных при монтировании и при изменении дат
  useEffect(() => {
    if (isDev) {
      loadDevData();
    } else {
      loadRealData();
    }
  }, [dateFrom, dateTo]);

  // Загрузка DEV данных
  const loadDevData = () => {
    setLoading(true);
    setError("");
    
    const f = fromISO(dateFrom);
    const t = fromISO(dateTo);
    let filtered = ISCHED.filter(e => {
      const d = dotToDate(e.date);
      return d >= f && d <= t;
    });
    
    setAllData(filtered);
    setLoading(false);
  };

  // Загрузка реальных данных
  const loadRealData = async () => {
    setLoading(true);
    setError("");

    try {
      const allEvents = [];
      const dateFromStr = fmtDot(fromISO(dateFrom));
      const dateToStr = fmtDot(fromISO(dateTo));
      
      for (const club of CLUBS) {
        try {
          const data = await api.schedule(token, club.id, dateFromStr, dateToStr);
          let events = [];
          if (Array.isArray(data)) events = data;
          else {
            for (const k of ["data", "schedule", "items", "lessons", "classes", "events", "result"]) {
              if (Array.isArray(data[k])) { events = data[k]; break; }
            }
          }
          if (events.length === 0 && Object.values(data).some(v => Array.isArray(v))) {
            events = Object.values(data).flat();
          }
          allEvents.push(...events.map(e => ({ ...e, clubId: club.id })));
        } catch (e) {
          console.warn(`Ошибка загрузки клуба ${club.id}:`, e);
        }
      }
      setAllData(allEvents);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  // Фильтрация данных (как в других вкладках)
  const filteredData = useMemo(() => {
    let result = allData;

    // Фильтр по городу
    if (cityFilter) {
      const cityClubs = clubs.filter(c => String(c.city) === cityFilter).map(c => c.id);
      result = result.filter(e => cityClubs.includes(e.clubId));
    }

    // Фильтр по клубу
    if (clubFilter) {
      result = result.filter(e => String(e.clubId) === clubFilter);
    }

    // Поиск по названию или тренеру
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(e => 
        e.name.toLowerCase().includes(query) ||
        (e.trainer && e.trainer.toLowerCase().includes(query))
      );
    }

    return result;
  }, [allData, cityFilter, clubFilter, searchQuery, clubs]);

  // Группировка по датам
  const grouped = useMemo(() => {
    return filteredData.reduce((acc, e) => {
      const key = e.date || e.day || e.eventDate || (e.dateTime || "").split("T")[0] || "Без даты";
      (acc[key] || (acc[key] = [])).push(e);
      return acc;
    }, {});
  }, [filteredData]);

  // Получение списка клубов для фильтра
  const getClubsForCity = () => {
    if (!cityFilter) return clubs;
    return clubs.filter(c => String(c.city) === cityFilter);
  };

  const totalCount = filteredData.length;

  const save = (item) => {
    if (item.id) {
      setAllData(prev => prev.map(e => e.id === item.id ? item : e));
    } else {
      const n = { ...item, id: nextId(allData) };
      setAllData(prev => [...prev, n]);
    }
    setModal(null);
  };

  const del = (id) => {
    setAllData(prev => prev.filter(e => e.id !== id));
    setModal(null);
  };

  // Получение названия клуба
  const getClubName = (id) => {
    const club = CLUBS.find(c => c.id === id);
    return club ? club.name : "—";
  };

  return (
    <div className="schedule-tab">
      <PageHeader
        title="Расписание занятий"
        sub={`${totalCount} занятий`}
        action="Добавить занятие"
        onAction={() => setModal("new")}
      />
      
      {/* Фильтры - единый стиль с другими вкладками */}
      <div style={{ 
        display: "flex", 
        gap: "12px", 
        flexWrap: "wrap", 
        marginBottom: "16px",
        alignItems: "center"
      }}>
        <div style={{ minWidth: "150px" }}>
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="input select"
          >
            <option value="">— Все города</option>
            {cities.map(c => (
              <option key={c.id} value={String(c.id)}>{c.name}</option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: "200px" }}>
          <select
            value={clubFilter}
            onChange={e => setClubFilter(e.target.value)}
            className="input select"
          >
            <option value="">— Все клубы</option>
            {getClubsForCity().map(c => (
              <option key={c.id} value={String(c.id)}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Даты */}
        <div style={{ minWidth: "150px" }}>
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="input"
          />
        </div>

        <div style={{ minWidth: "150px" }}>
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="input"
          />
        </div>

        <div style={{ flex: 1, minWidth: "200px", maxWidth: "400px" }}>
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Поиск по названию или тренеру…"
          />
        </div>

        {loading && (
          <div style={{ color: "var(--text-secondary)", padding: "10px 0" }}>
            ⟳ Загрузка...
          </div>
        )}
      </div>

      <Error msg={error} />

      {!loading && totalCount === 0 && (
        <div className="schedule-empty">
          <div className="schedule-empty-icon">{Icons.empty}</div>
          <div>{searchQuery ? "Занятий по вашему запросу не найдено" : "Занятий в выбранный период нет"}</div>
        </div>
      )}

      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="schedule-day">
          <div className="schedule-day-header">
            <div className="schedule-day-label">{date}</div>
            <div className="schedule-divider" />
            <div className="schedule-count">{items.length} зан.</div>
          </div>
          <div className="schedule-items">
            {items.map(ev => {
              const color = getTagColor(ev.name);
              const full = ev.available <= 0;
              return (
                <div
                  key={ev.id}
                  onClick={() => setModal(ev)}
                  className={`schedule-item ${full ? "schedule-item--full" : ""}`}
                  style={{ borderLeftColor: full ? "var(--dim)" : color }}
                >
                  <div className="schedule-time">
                    <div className="schedule-time-main">{ev.time}</div>
                    <div className="schedule-time-duration">{ev.duration} мин</div>
                  </div>
                  <div
                    className={`schedule-dot ${!full ? "schedule-dot--active" : ""}`}
                    style={{ background: full ? "var(--dim)" : color }}
                  />
                  <div className="schedule-info">
                    <div className="schedule-name">{ev.name}</div>
                    <div className="schedule-meta">
                      {ev.trainer && <span className="schedule-meta-item">{Icons.trainer} {ev.trainer}</span>}
                      {ev.zone && <span className="schedule-meta-item">{Icons.location} {ev.zone}</span>}
                      <span className="schedule-meta-item" style={{ color: "var(--text-muted)" }}>
                        {getClubName(ev.clubId)}
                      </span>
                    </div>
                  </div>
                  <span 
                    className={`schedule-capacity ${full ? "schedule-capacity--full" : ""}`}
                    style={!full ? { background: `${color}22`, color } : undefined}
                  >
                    {full ? "Мест нет" : `${ev.available} / ${ev.total}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {modal && (
        <ScheduleModal
          item={modal === "new" ? null : modal}
          onSave={save}
          onClose={() => setModal(null)}
          onDelete={del}
        />
      )}
    </div>
  );
}