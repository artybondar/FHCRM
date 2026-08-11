// utils/constants.js
export const COLORS = {
  bg: "#08090F",
  s1: "#0F1219",
  s2: "#161B26",
  s3: "#1D2333",
  border: "#232B3E",
  primary: "#E53946",
  primaryHover: "#C22D38",
  text: "#E6ECF8",
  sub: "#8896B0",
  muted: "#4E5C78",
  dim: "#2E3850",
  ok: "#22C489",
  warn: "#F09D30",
  info: "#2FADD8",
};

export const TAG_COLORS = {
  yoga: "#7B5FE6",
  strength: "#E53946",
  cardio: "#F09D30",
  pilates: "#2FADD8",
  boxing: "#FF6B35",
  dance: "#E040A8",
  aqua: "#00B9DC",
  cycle: "#44C878",
  default: "#22C489",
};

export const CLIENT_STATUS = {
  active: { label: "Активный", color: "#22C489" },
  frozen: { label: "Заморожен", color: "#2FADD8" },
  expired: { label: "Истёк", color: "#4E5C78" },
};

export const EMPLOYEE_ROLE = {
  trainer: { label: "Тренер", color: "#2FADD8" },
  admin: { label: "Администратор", color: "#F09D30" },
  manager: { label: "Менеджер", color: "#7B5FE6" },
};

export const EMPLOYEE_STATUS = {
  active: { label: "Активный", color: "#22C489" },
  vacation: { label: "Отпуск", color: "#F09D30" },
  inactive: { label: "Уволен", color: "#E53946" },
};

export const NAV_ITEMS = [
  { id: "schedule", icon: "📅", label: "Расписание" },
  { id: "clients", icon: "👤", label: "Клиенты" },
  { id: "employees", icon: "👥", label: "Сотрудники" },
  { id: "news", icon: "📰", label: "Новости" },
  { id: "promos", icon: "🏷️", label: "Акции" },
];