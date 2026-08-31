// utils/helpers.js
import { TAG_COLORS } from "./constants";

export const pad = (n) => String(n).padStart(2, "0");

export const fmtDot = (d) => 
  `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;

export const toISO = (d) => 
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromISO = (s) => {
  if (!s) return new Date();
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const dotToDate = (s) => {
  if (!s) return new Date();
  const [d, m, y] = s.split(".").map(Number);
  return new Date(y, m - 1, d);
};

export const nextId = (arr) => 
  arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1;

export const getTagColor = (name = "") => {
  const s = name.toLowerCase();
  if (/йог|yoga|стрет|stretch/.test(s)) return TAG_COLORS.yoga;
  if (/силов|power|body|памп|pump/.test(s)) return TAG_COLORS.strength;
  if (/кардио|зумб|аэроб|степ|cardio/.test(s)) return TAG_COLORS.cardio;
  if (/пилат|баланс/.test(s)) return TAG_COLORS.pilates;
  if (/бокс|кикбокс|единоборств|мма/.test(s)) return TAG_COLORS.boxing;
  if (/танц|dance|латин/.test(s)) return TAG_COLORS.dance;
  if (/аква|плав|бассейн|water/.test(s)) return TAG_COLORS.aqua;
  if (/спин|вело|cycle/.test(s)) return TAG_COLORS.cycle;
  return TAG_COLORS.default;
};

export const fullName = (c) =>
  [c.lastName, c.firstName, c.middleName].filter(Boolean).join(" ");

export const calcAge = (birthDateDot) => {
  if (!birthDateDot) return null;
  const b = dotToDate(birthDateDot);
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const beforeBirthday =
    now.getMonth() < b.getMonth() ||
    (now.getMonth() === b.getMonth() && now.getDate() < b.getDate());
  if (beforeBirthday) age--;
  return age;
};

export const diffDaysFromToday = (dotDate) => {
  if (!dotDate) return null;
  const d = dotToDate(dotDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - today) / 86400000);
};

export const initials = (c) =>
  `${(c.lastName || c.name || "?")[0] || "?"}${(c.firstName || "")[0] || ""}`.toUpperCase();

export const getClientStats = (clientId, related) => {
  const contracts = (related.contracts || []).filter((c) => c.clientId === clientId);
  const activeContract = contracts.find((c) => c.active) || null;
  const balanceOps = (related.balance || []).filter((b) => b.clientId === clientId);
  const balance = balanceOps.length ? balanceOps[balanceOps.length - 1].rest : 0;
  const freezesAvailable = (related.freezesAvailable || [])
    .filter((f) => f.clientId === clientId)
    .reduce((sum, f) => sum + (f.available - f.used), 0);
  const visitsCount = (related.visits || []).filter((v) => v.clientId === clientId).length;
  return {
    activeContract,
    daysLeft: activeContract ? diffDaysFromToday(activeContract.end) : null,
    balance,
    freezesAvailable,
    visitsCount,
  };
};

export const getEmployeeStats = (empId, related) => {
  const scheduleCount = (related.schedule || []).filter((s) => s.empId === empId).length;
  const clientsCount = (related.clients || []).filter((c) => c.empId === empId).length;
  const payrollOps = (related.payroll || []).filter((p) => p.empId === empId);
  const lastPayroll = payrollOps.length ? payrollOps[payrollOps.length - 1].sum : 0;
  return { scheduleCount, clientsCount, lastPayroll };
};

export const getClubName = (id, clubs) => {
  if (!clubs || !Array.isArray(clubs)) return "—";
  const club = clubs.find((c) => c.id === id);
  return club?.name || "—";
};

export const getAllClubsOption = (clubs) => {
  if (!clubs || !Array.isArray(clubs)) return [{ value: 0, label: "Все клубы" }];
  return [
    { value: 0, label: "Все клубы" },
    ...clubs.map((c) => ({ value: c.id, label: c.name })),
  ];
};