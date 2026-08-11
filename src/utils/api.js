// utils/api.js
import { BASE } from "../config";

export async function apiFetch(url, opts = {}) {
  try {
    const r = await fetch(url, opts);
    const body = await r.json().catch(() => null);
    if (!r.ok) throw new Error(body?.errorMessage || `HTTP ${r.status}`);
    return body;
  } catch (e) {
    if (e.name === "TypeError") {
      throw new Error("Сетевая ошибка. Проверьте CORS на API-сервере.");
    }
    throw e;
  }
}

export const api = {
  confirmPhone: (phone, isRetry = false) =>
    apiFetch(`${BASE}/api/v1/confirmPhone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        isRetry,
        key: true,
        deviceInfo: "FH Web CRM",
      }),
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