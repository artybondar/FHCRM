import { useState, useEffect } from "react";

// В dev режиме BASE="" — Vite проксирует /api/* на mapi.fitnesshouse.ru
// В prod выставь VITE_API_BASE=https://mapi.fitnesshouse.ru
const BASE = import.meta.env.VITE_API_BASE ?? "";

// ─── Dev bypass ───────────────────────────────────────────────────────────────
const DEV_PHONE = "+76661234567";
const DEV_CODE  = "0315";
const DEV_TOKEN = { accessToken: "dev-access-token", refreshToken: "dev-refresh-token", isPersonLinked: true };

// ─── API ──────────────────────────────────────────────────────────────────────
async function apiFetch(url, opts = {}) {
  try {
    const r = await fetch(url, opts);
    const body = await r.json().catch(() => null);
    if (!r.ok) throw new Error(body?.errorMessage || `HTTP ${r.status}`);
    return body;
  } catch (e) {
    if (e.name === "TypeError")
      throw new Error(
        "Сетевая ошибка. В dev-режиме убедитесь что запущен `npm run dev` с прокси. " +
        "В production настройте CORS на mapi.fitnesshouse.ru."
      );
    throw e;
  }
}

const api = {
  confirmPhone: (phone, isRetry = false) =>
    apiFetch(`${BASE}/api/v1/confirmPhone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, isRetry, key: true, deviceInfo: "FH Web CRM 1.0" }),
    }),

  confirmCode: (id, code) =>
    apiFetch(`${BASE}/api/v1/confirmPhoneCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, code: parseInt(code, 10) }),
    }),

  citiesClubs: (token) =>
    apiFetch(`${BASE}/api/v1/citiesClubs`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  schedule: (token, club, dateFrom, dateTo) =>
    apiFetch(
      `${BASE}/api/v1/clubsSchedule?club=${club}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};

// ─── Date helpers ─────────────────────────────────────────────────────────────
function fmtDot(d) {
  return [
    String(d.getDate()).padStart(2, "0"),
    String(d.getMonth() + 1).padStart(2, "0"),
    d.getFullYear(),
  ].join(".");
}
function toISO(d) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}
function fromISO(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#08090F",
  s1: "#0F1219",
  s2: "#161B26",
  s3: "#1D2333",
  border: "#232B3E",
  primary: "#E53946",
  red2: "#C22D38",
  text: "#E6ECF8",
  sub: "#8896B0",
  muted: "#4E5C78",
  dim: "#2E3850",
  ok: "#22C489",
  warn: "#F09D30",
  info: "#2FADD8",
};

// Цвет по типу занятия
function tagColor(n = "") {
  const s = n.toLowerCase();
  if (/йог|yoga|стрет|stretch/.test(s)) return "#7B5FE6";
  if (/силов|power|body|памп|pump/.test(s)) return C.primary;
  if (/кардио|зумб|аэроб|степ|cardio/.test(s)) return C.warn;
  if (/пилат|баланс/.test(s)) return C.info;
  if (/бокс|кикбокс|единоборств|мма/.test(s)) return "#FF6B35";
  if (/танц|dance|латин/.test(s)) return "#E040A8";
  if (/аква|плав|бассейн|water/.test(s)) return "#00B9DC";
  if (/спин|вело|cycle/.test(s)) return "#44C878";
  return C.ok;
}

// ─── Shared ───────────────────────────────────────────────────────────────────
const selCss = {
  background: C.s2,
  border: `1px solid ${C.border}`,
  borderRadius: 9,
  padding: "10px 12px",
  color: C.text,
  fontSize: 14,
  outline: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  width: "100%",
  boxSizing: "border-box",
};
const inpCss = {
  background: C.s2,
  border: `1px solid ${C.border}`,
  borderRadius: 9,
  padding: "10px 12px",
  color: C.text,
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  transition: "border-color .15s",
};

function Field({ label, children }) {
  return (
    <div>
      {label && (
        <div
          style={{
            color: C.muted,
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            marginBottom: 5,
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

function ErrBox({ msg }) {
  return (
    <div
      style={{
        background: `${C.primary}1C`,
        border: `1px solid ${C.primary}44`,
        borderRadius: 8,
        padding: "10px 14px",
        color: C.primary,
        fontSize: 13,
        marginBottom: 12,
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        lineHeight: 1.5,
      }}
    >
      <span>⚠</span>
      <span>{msg}</span>
    </div>
  );
}

function PrimaryBtn({ children, loading, disabled, onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  const off = disabled || loading;
  return (
    <button
      onClick={off ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: off ? C.s3 : hov ? C.red2 : C.primary,
        color: off ? C.sub : "#fff",
        border: "none",
        borderRadius: 9,
        padding: "13px 24px",
        fontSize: 15,
        fontWeight: 700,
        cursor: off ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background .15s",
        ...style,
      }}
    >
      {loading ? "Загрузка…" : children}
    </button>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [step, setStep] = useState("phone"); // "phone" | "code"
  const [phone, setPhone] = useState("+7");
  const [confId, setConfId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ttl, setTtl] = useState(0);

  useEffect(() => {
    if (ttl <= 0) return;
    const t = setTimeout(() => setTtl((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [ttl]);

  const onPhoneInput = (e) => {
    let v = e.target.value.replace(/[^\d+]/g, "");
    if (!v.startsWith("+7")) v = "+7" + v.replace(/\D/g, "");
    v = "+7" + v.slice(2).replace(/\D/g, "").slice(0, 10);
    setPhone(v);
    setError("");
  };

  const sendSms = async (isRetry = false) => {
    if (phone.replace(/\D/g, "").length < 11) {
      setError("Введите полный номер в формате +7XXXXXXXXXX");
      return;
    }
    // DEV bypass — переходим на шаг кода без запроса к API
    if (phone === DEV_PHONE) {
      setStep("code");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const d = await api.confirmPhone(phone, isRetry);
      setConfId(d.id);
      setTtl(d.codeLifeTimeSec || 60);
      setStep("code");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!code || code.length < 4) {
      setError("Введите код из SMS");
      return;
    }
    // DEV bypass — любой неверный код показывает подсказку
    if (phone === DEV_PHONE) {
      if (code !== DEV_CODE) {
        setError(`DEV: неверный код. Используйте ${DEV_CODE}`);
        return;
      }
      onAuth(DEV_TOKEN, phone);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const d = await api.confirmCode(confId, code);
      onAuth(d, phone);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const baseInput = {
    ...inpCss,
    width: "100%",
    fontSize: 16,
    borderRadius: 10,
    padding: "13px 15px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position: "fixed",
          top: "-15%",
          right: "-10%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.primary}20 0%,transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-20%",
          left: "-12%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle,${C.info}18 0%,transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ width: 380, position: "relative", zIndex: 1 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{ display: "inline-flex", alignItems: "center", gap: 13 }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                background: C.primary,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 16,
                letterSpacing: "-1px",
                boxShadow: `0 4px 24px ${C.primary}50`,
              }}
            >
              FH
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  color: C.text,
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Fitness House
              </div>
              <div
                style={{
                  color: C.muted,
                  fontSize: 12,
                  marginTop: 3,
                  letterSpacing: "0.04em",
                }}
              >
                CRM · Управление клубами
              </div>
            </div>
          </div>
        </div>

        {phone === DEV_PHONE && (
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <span style={{ background: "#F09D3022", border: "1px solid #F09D3055",
              color: C.warn, borderRadius: 6, padding: "3px 10px",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em" }}>
              ⚙ DEV MODE
            </span>
          </div>
        )}

        <div
          style={{
            background: C.s1,
            border: `1px solid ${phone === DEV_PHONE ? C.warn + "55" : C.border}`,
            borderRadius: 18,
            padding: "28px 28px 24px",
            boxShadow: "0 20px 60px rgba(0,0,0,.45)",
            transition: "border-color .2s",
          }}
        >
          {step === "phone" ? (
            <>
              <div
                style={{
                  color: C.text,
                  fontSize: 21,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                }}
              >
                Вход
              </div>
              <div
                style={{
                  color: C.sub,
                  fontSize: 13,
                  marginBottom: 22,
                  lineHeight: 1.5,
                }}
              >
                Введите номер телефона — пришлём код подтверждения
              </div>

              <Field label="Номер телефона">
                <input
                  value={phone}
                  onChange={onPhoneInput}
                  placeholder="+7 (___) ___-__-__"
                  onKeyDown={(e) => e.key === "Enter" && sendSms()}
                  style={baseInput}
                  onFocus={(e) => (e.target.style.borderColor = C.primary)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </Field>

              {error && <ErrBox msg={error} />}

              <PrimaryBtn
                onClick={() => sendSms(false)}
                loading={loading}
                style={{ width: "100%", marginTop: 8 }}
              >
                Получить SMS-код
              </PrimaryBtn>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setStep("phone");
                  setCode("");
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: C.sub,
                  cursor: "pointer",
                  padding: 0,
                  fontSize: 13,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "inherit",
                }}
              >
                ← {phone}
              </button>

              <div
                style={{
                  color: C.text,
                  fontSize: 21,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  marginBottom: 6,
                }}
              >
                Код из SMS
              </div>
              <div
                style={{ color: C.sub, fontSize: 13, marginBottom: 22 }}
              >
                Отправлен на{" "}
                <span style={{ color: C.text, fontWeight: 600 }}>{phone}</span>
              </div>

              <Field label="Код подтверждения">
                <input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                  placeholder="• • • • • •"
                  maxLength={6}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && verify()}
                  style={{
                    ...baseInput,
                    fontSize: 28,
                    letterSpacing: "0.22em",
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.primary)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </Field>

              {error && <ErrBox msg={error} />}

              <PrimaryBtn
                onClick={verify}
                loading={loading}
                style={{ width: "100%", marginTop: 8, marginBottom: 12 }}
              >
                Войти
              </PrimaryBtn>

              <div style={{ textAlign: "center", fontSize: 13 }}>
                {ttl > 0 ? (
                  <span style={{ color: C.muted }}>
                    Повторный код через {ttl} с.
                  </span>
                ) : (
                  <button
                    onClick={() => sendSms(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: C.info,
                      cursor: "pointer",
                      fontSize: 13,
                      fontFamily: "inherit",
                    }}
                  >
                    Отправить повторно
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: "schedule", icon: "▦", label: "Расписание" },
  { id: "clients", icon: "◉", label: "Клиенты" },
  { id: "employees", icon: "⬡", label: "Сотрудники" },
  { id: "news", icon: "▤", label: "Новости" },
  { id: "promos", icon: "◈", label: "Акции" },
];

function Sidebar({ tab, onTab, phone, onLogout }) {
  return (
    <aside
      style={{
        width: 216,
        minHeight: "100vh",
        background: C.s1,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "22px 18px 18px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: C.primary,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: "-0.5px",
              flexShrink: 0,
            }}
          >
            FH
          </div>
          <div>
            <div
              style={{
                color: C.text,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Fitness House
            </div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>
              CRM Dashboard
            </div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "10px 0" }}>
        {NAV.map(({ id, icon, label }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                background: active ? `${C.primary}1A` : "none",
                border: "none",
                borderLeft: `3px solid ${active ? C.primary : "transparent"}`,
                color: active ? C.text : C.sub,
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "inherit",
                textAlign: "left",
                transition: "all .12s",
              }}
            >
              <span style={{ fontSize: 14, opacity: active ? 1 : 0.55 }}>
                {icon}
              </span>
              <span style={{ fontWeight: active ? 600 : 400 }}>{label}</span>
            </button>
          );
        })}
      </nav>

      <div
        style={{
          padding: "12px 14px 16px",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            color: C.muted,
            fontSize: 11,
            marginBottom: 8,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {phone}
        </div>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            background: C.s2,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: "8px",
            color: C.sub,
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "inherit",
            transition: "all .12s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = C.s3;
            e.target.style.color = C.text;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = C.s2;
            e.target.style.color = C.sub;
          }}
        >
          Выйти из системы
        </button>
      </div>
    </aside>
  );
}

// ─── EventRow ─────────────────────────────────────────────────────────────────
function EventRow({ ev }) {
  const [hov, setHov] = useState(false);
  const name = ev.name || ev.className || ev.title || ev.type || ev.lesson || "Занятие";
  const time = ev.time || ev.startTime || ev.timeStart || ev.start || "";
  const dur = ev.duration || ev.durationMin || ev.durationMinutes || "";
  const trainer = ev.trainer || ev.instructorName || ev.coachName || ev.coach || "";
  const zone = ev.zone || ev.hall || ev.room || ev.place || "";
  const avail = ev.available ?? ev.freePlaces ?? ev.placesAvailable ?? ev.freeCount ?? null;
  const total = ev.total ?? ev.totalPlaces ?? ev.capacity ?? null;
  const status = ev.status || ev.state || "";
  const color = tagColor(name);
  const full = avail !== null && Number(avail) <= 0;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: hov ? C.s3 : C.s2,
        borderRadius: 10,
        padding: "11px 15px",
        borderLeft: `3px solid ${full ? C.dim : color}`,
        opacity: full ? 0.55 : 1,
        transition: "background .1s",
        cursor: "default",
      }}
    >
      {/* Time */}
      <div style={{ minWidth: 52, textAlign: "right", flexShrink: 0 }}>
        <div style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>{time}</div>
        {dur && (
          <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>
            {dur} мин
          </div>
        )}
      </div>

      {/* Dot */}
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: full ? C.dim : color,
          flexShrink: 0,
          boxShadow: full ? "none" : `0 0 6px ${color}70`,
        }}
      />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: C.text,
            fontSize: 14,
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        {(trainer || zone || status) && (
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 3,
              flexWrap: "wrap",
            }}
          >
            {trainer && (
              <span style={{ color: C.sub, fontSize: 12 }}>
                👤 {trainer}
              </span>
            )}
            {zone && (
              <span style={{ color: C.sub, fontSize: 12 }}>📍 {zone}</span>
            )}
            {status && (
              <span style={{ color: C.muted, fontSize: 12 }}>{status}</span>
            )}
          </div>
        )}
      </div>

      {/* Availability badge */}
      {avail !== null && (
        <div style={{ flexShrink: 0 }}>
          <span
            style={{
              background: full ? `${C.dim}44` : `${color}22`,
              color: full ? C.sub : color,
              borderRadius: 6,
              padding: "3px 10px",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {full ? "Мест нет" : `${avail}${total ? ` / ${total}` : ""}`}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Schedule tab ─────────────────────────────────────────────────────────────
function ScheduleTab({ token }) {
  const today = new Date();
  const [cities, setCities] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [cityId, setCityId] = useState("");
  const [clubId, setClubId] = useState("");
  const [from, setFrom] = useState(toISO(today));
  const [to, setTo] = useState(toISO(new Date(+today + 7 * 864e5)));
  const [sched, setSched] = useState(null);
  const [metaLoad, setMetaLoad] = useState(true);
  const [schedLoad, setSchedLoad] = useState(false);
  const [metaErr, setMetaErr] = useState("");
  const [schedErr, setSchedErr] = useState("");

  const filteredClubs = cityId
    ? clubs.filter(
        (c) =>
          String(c.city) === cityId || String(c.cityId) === cityId
      )
    : clubs;

  useEffect(() => {
    api
      .citiesClubs(token)
      .then((d) => {
        setCities(d.cities || []);
        setClubs(d.clubs || []);
      })
      .catch((e) => setMetaErr(e.message))
      .finally(() => setMetaLoad(false));
  }, [token]);

  useEffect(() => {
    setClubId("");
    setSched(null);
  }, [cityId]);

  const load = async () => {
    if (!clubId) return;
    setSchedLoad(true);
    setSchedErr("");
    setSched(null);
    try {
      const df = fmtDot(fromISO(from));
      const dt = fmtDot(fromISO(to));
      const data = await api.schedule(token, clubId, df, dt);
      setSched(data);
    } catch (e) {
      setSchedErr(e.message);
    } finally {
      setSchedLoad(false);
    }
  };

  // Нормализуем ответ к массиву событий
  const events = (() => {
    if (!sched) return null;
    if (Array.isArray(sched)) return sched;
    for (const k of [
      "data",
      "schedule",
      "items",
      "lessons",
      "classes",
      "events",
      "result",
    ]) {
      if (Array.isArray(sched[k])) return sched[k];
    }
    // Объект вида { "2026-08-06": [...], "2026-08-07": [...] }
    const vals = Object.values(sched);
    if (vals.length > 0 && Array.isArray(vals[0])) return vals.flat();
    return null;
  })();

  const grouped = events
    ? events.reduce((acc, e) => {
        const k =
          e.date ||
          e.day ||
          e.eventDate ||
          (e.dateTime || "").split("T")[0] ||
          "Без даты";
        if (!acc[k]) acc[k] = [];
        acc[k].push(e);
        return acc;
      }, {})
    : null;

  return (
    <div style={{ padding: "28px 30px", maxWidth: 1020 }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            color: C.text,
            fontSize: 22,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "-0.04em",
          }}
        >
          Расписание занятий
        </h1>
        <p style={{ color: C.sub, margin: "4px 0 0", fontSize: 13 }}>
          Выберите город, клуб и период
        </p>
      </div>

      {/* Filter bar */}
      <div
        style={{
          background: C.s1,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: "18px 20px",
          marginBottom: 24,
        }}
      >
        {metaErr && <ErrBox msg={metaErr} />}
        {metaLoad ? (
          <div style={{ color: C.sub, fontSize: 14 }}>
            ⟳ Загрузка городов и клубов…
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            <Field label="Город">
              <div style={{ minWidth: 170 }}>
                <select
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                  style={selCss}
                >
                  <option value="">— Все города</option>
                  {cities.map((c) => (
                    <option
                      key={c.id}
                      value={String(c.id)}
                      style={{ background: C.s2 }}
                    >
                      {c.name || c.title || `Город ${c.id}`}
                    </option>
                  ))}
                </select>
              </div>
            </Field>

            <Field label="Клуб">
              <div style={{ minWidth: 230 }}>
                <select
                  value={clubId}
                  onChange={(e) => setClubId(e.target.value)}
                  style={selCss}
                >
                  <option value="">— Выберите клуб</option>
                  {filteredClubs.map((c) => (
                    <option
                      key={c.id}
                      value={String(c.id)}
                      style={{ background: C.s2 }}
                    >
                      {c.name || c.title || `Клуб ${c.id}`}
                    </option>
                  ))}
                </select>
              </div>
            </Field>

            <Field label="С">
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={inpCss}
                onFocus={(e) => (e.target.style.borderColor = C.primary)}
                onBlur={(e) => (e.target.style.borderColor = C.border)}
              />
            </Field>

            <Field label="По">
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={inpCss}
                onFocus={(e) => (e.target.style.borderColor = C.primary)}
                onBlur={(e) => (e.target.style.borderColor = C.border)}
              />
            </Field>

            <button
              onClick={load}
              disabled={!clubId || schedLoad}
              style={{
                background: !clubId || schedLoad ? C.s3 : C.primary,
                color: !clubId || schedLoad ? C.muted : "#fff",
                border: "none",
                borderRadius: 9,
                padding: "10px 22px",
                fontSize: 14,
                fontWeight: 700,
                cursor: !clubId || schedLoad ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                alignSelf: "flex-end",
                transition: "background .15s",
              }}
            >
              {schedLoad ? "Загрузка…" : "Показать →"}
            </button>
          </div>
        )}
      </div>

      {schedErr && <ErrBox msg={schedErr} />}

      {/* Loading */}
      {schedLoad && (
        <div
          style={{
            textAlign: "center",
            padding: 64,
            color: C.sub,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>⟳</div>
          <div style={{ fontSize: 14 }}>Загрузка расписания…</div>
        </div>
      )}

      {/* Results */}
      {sched && !schedLoad && (
        <>
          {grouped ? (
            Object.keys(grouped).length === 0 ? (
              <div
                style={{ textAlign: "center", padding: 64, color: C.sub }}
              >
                <div style={{ fontSize: 42, marginBottom: 12 }}>📭</div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    marginBottom: 4,
                    color: C.text,
                  }}
                >
                  Занятий не найдено
                </div>
                <div style={{ fontSize: 13 }}>
                  В выбранный период расписание пустое
                </div>
              </div>
            ) : (
              Object.entries(grouped).map(([date, items]) => (
                <div key={date} style={{ marginBottom: 26 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        color: C.sub,
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.09em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {date}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: C.border,
                      }}
                    />
                    <div
                      style={{
                        color: C.muted,
                        fontSize: 11,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {items.length} зан.
                    </div>
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {items.map((ev, i) => (
                      <EventRow key={i} ev={ev} />
                    ))}
                  </div>
                </div>
              ))
            )
          ) : (
            // Неизвестная структура — показываем raw JSON
            <div
              style={{
                background: C.s1,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div
                style={{
                  color: C.muted,
                  fontSize: 12,
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Неизвестная структура ответа — raw JSON
              </div>
              <pre
                style={{
                  color: C.text,
                  fontSize: 12,
                  overflow: "auto",
                  margin: 0,
                  maxHeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {JSON.stringify(sched, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}

      {/* Idle */}
      {!sched && !schedLoad && !schedErr && (
        <div style={{ textAlign: "center", padding: 60, color: C.muted }}>
          <div style={{ fontSize: 42, marginBottom: 12, opacity: 0.35 }}>
            ▦
          </div>
          <div style={{ fontSize: 14 }}>
            Выберите клуб и нажмите «Показать»
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Stub tabs ────────────────────────────────────────────────────────────────
function StubTab({ title, desc, icon }) {
  return (
    <div style={{ padding: "28px 30px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            color: C.text,
            fontSize: 22,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </h1>
        <p style={{ color: C.sub, margin: "4px 0 0", fontSize: 13 }}>
          {desc}
        </p>
      </div>
      <div
        style={{
          background: C.s1,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: "64px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 46, marginBottom: 14, opacity: 0.35 }}>
          {icon}
        </div>
        <div
          style={{
            color: C.text,
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Раздел в разработке
        </div>
        <div
          style={{
            color: C.sub,
            fontSize: 13,
            maxWidth: 340,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Передайте эндпоинты из документации — реализуем в следующей итерации.
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(null);
  const [phone, setPhone] = useState("");
  const [tab, setTab] = useState("schedule");

  if (!auth) {
    return (
      <AuthScreen
        onAuth={(d, p) => {
          setAuth(d);
          setPhone(p);
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
      }}
    >
      <Sidebar
        tab={tab}
        onTab={setTab}
        phone={phone}
        onLogout={() => {
          setAuth(null);
          setPhone("");
          setTab("schedule");
        }}
      />
      <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {tab === "schedule" && <ScheduleTab token={auth.accessToken} />}
        {tab === "clients" && (
          <StubTab
            title="Клиенты"
            desc="Управление клиентской базой клубов"
            icon="◉"
          />
        )}
        {tab === "employees" && (
          <StubTab
            title="Сотрудники"
            desc="Управление персоналом"
            icon="⬡"
          />
        )}
        {tab === "news" && (
          <StubTab
            title="Новости"
            desc="Публикация и управление новостями"
            icon="▤"
          />
        )}
        {tab === "promos" && (
          <StubTab
            title="Акции"
            desc="Специальные предложения и скидки"
            icon="◈"
          />
        )}
      </main>
    </div>
  );
}
