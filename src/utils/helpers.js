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