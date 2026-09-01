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

export const GENDER = {
  m: { label: "Муж.", short: "муж." },
  f: { label: "Жен.", short: "жен." },
};

export const AD_SOURCES = [
  "Внешний вид клуба",
  "Рекомендация друга",
  "Интернет-реклама",
  "Соцсети",
  "Наружная реклама",
  "Промоакция",
  "Другое",
];

// Группы вложенных вкладок карточки клиента — визуально объединяют 19 разделов
// FH USZ в 4 смысловых блока, чтобы не выводить их плоским списком.
export const CLIENT_TAB_GROUPS = [
  { id: "contracts", label: "Абонементы и договоры" },
  { id: "finance", label: "Финансы" },
  { id: "visits", label: "Посещения" },
  { id: "other", label: "Прочее" },
];

// Конфигурация вложенных вкладок карточки клиента (как в FH USZ).
// source — ключ массива в CLIENT_RELATED (utils/mockData.js), columns — колонки таблицы
// (используются и для отображения, и для автогенерации формы CRUD).
export const CLIENT_DETAIL_TABS = [
  { id: "contracts", label: "Договоры", source: "contracts", group: "contracts", columns: [
    { key: "number", label: "Номер" }, { key: "name", label: "Название" },
    { key: "card", label: "Карта" }, { key: "regDate", label: "Дата рег." },
    { key: "start", label: "Начало" }, { key: "end", label: "Окончание" },
    { key: "cardType", label: "Вид карты" }, { key: "active", label: "Активен", type: "bool" },
  ], formColumns: [
    { key: "number", label: "Номер" }, { key: "card", label: "Карта" },
    { key: "active", label: "Активность", type: "bool" },
    { key: "regDate", label: "Дата регистрации" }, { key: "name", label: "Наименование" },
    { key: "start", label: "Дата начала" }, { key: "end", label: "Дата окончания" },
    { key: "period", label: "Период" }, { key: "visitTime", label: "Время посещ." },
    { key: "discount", label: "Скидка" }, { key: "category", label: "Категория", type: "number" },
    { key: "coefficient", label: "Коэффициент", type: "number" },
    { key: "bonusPercent", label: "Бонус %", type: "number" },
    { key: "bonusDiscount", label: "Скидка по бонусам" },
    { key: "extraDiscountPercent", label: "Доп.скидка %", type: "number" },
    { key: "extraDiscountRub", label: "Доп.скидка руб.", type: "number" },
    { key: "cost", label: "Стоимость", type: "money" },
    { key: "discountSum", label: "Сумма скидки", type: "money" },
    { key: "price", label: "Цена", type: "money" },
    { key: "paid", label: "Оплачено", type: "money" },
    { key: "paymentType", label: "Тип платежа" },
    { key: "organization", label: "Организация" },
    { key: "freezeDays", label: "Дней заморозки", type: "number" },
    { key: "frozen", label: "Заморожено", type: "number" },
    { key: "seller", label: "Продавец" }, { key: "manager", label: "Менеджер" },
    { key: "paymentDate", label: "Дата оплаты" }, { key: "paymentKind", label: "Вид платежа" },
    { key: "credit", label: "Кредит", type: "bool" },
    { key: "fixEnd", label: "Фикс.окончание", type: "bool" },
    { key: "fixEndDate", label: "Фикс.дата окончания" },
    { key: "terminationReason", label: "Расторж. о." },
    { key: "reportPoint", label: "Пункт отчёта" },
    { key: "support", label: "Сопровождение" },
    { key: "overdraft", label: "Овердрафт", type: "bool" },
    { key: "floorM", label: "М.пол." },
    { key: "rentFloor", label: "Аренда пол." },
    { key: "rentEnd", label: "Окончание аренды" },
    { key: "maxVisits", label: "Макс.визитов", type: "number" },
    { key: "usedVisits", label: "Исп.визитов", type: "number" },
    { key: "leftVisits", label: "Ост.визитов", type: "number" },
    { key: "cardType", label: "Вид карты" },
  ] },
  { id: "subscriptions", label: "Абонементы", source: "subscriptions", group: "contracts", columns: [
    { key: "number", label: "Номер" }, { key: "name", label: "Название" },
    { key: "used", label: "Исп.", type: "number" }, { key: "left", label: "Ост.", type: "number" },
    { key: "start", label: "Начало" }, { key: "end", label: "Окончание" },
    { key: "cardType", label: "Вид карты" },
  ] },
  { id: "freezesNew", label: "Нов.Заморозки", source: "freezesNew", group: "contracts", columns: [
    { key: "created", label: "Создана" }, { key: "start", label: "Начало" }, { key: "end", label: "Окончание" },
    { key: "days", label: "Дней", type: "number" }, { key: "reason", label: "Причина" }, { key: "status", label: "Статус" },
  ] },
  { id: "freezesAvailable", label: "Доступные заморозки", source: "freezesAvailable", group: "contracts", columns: [
    { key: "doc", label: "Договор/Абонемент" }, { key: "available", label: "Доступно дней", type: "number" }, { key: "used", label: "Использовано дней", type: "number" },
  ] },
  { id: "terminations", label: "Расторжение", source: "terminations", group: "contracts", columns: [
    { key: "date", label: "Дата" }, { key: "contract", label: "Договор" },
    { key: "reason", label: "Причина" }, { key: "refund", label: "К возврату", type: "money" }, { key: "status", label: "Статус" },
  ] },
  { id: "subTerminations", label: "Аб.расторжение", source: "subTerminations", group: "contracts", columns: [
    { key: "date", label: "Дата" }, { key: "subscription", label: "Абонемент" },
    { key: "reason", label: "Причина" }, { key: "refund", label: "К возврату", type: "money" }, { key: "status", label: "Статус" },
  ] },
  { id: "payments", label: "Оплаты", source: "payments", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "sum", label: "Сумма", type: "money" },
    { key: "method", label: "Способ" }, { key: "purpose", label: "Назначение" },
    { key: "cashier", label: "Кассир" },
  ] },
  { id: "receipts", label: "Чеки", source: "receipts", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "number", label: "№ чека" },
    { key: "sum", label: "Сумма", type: "money" }, { key: "items", label: "Товары/услуги" },
    { key: "cashier", label: "Кассир" },
  ] },
  { id: "discounts", label: "Скидки", source: "discounts", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "title", label: "Название" },
    { key: "size", label: "Размер" }, { key: "reason", label: "Основание" },
  ] },
  { id: "balance", label: "Баланс", source: "balance", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "op", label: "Операция" },
    { key: "sum", label: "Сумма", type: "money" }, { key: "rest", label: "Остаток", type: "money" },
  ] },
  { id: "deposit", label: "Депозит/ОД", source: "deposit", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "op", label: "Операция" },
    { key: "sum", label: "Сумма", type: "money" }, { key: "rest", label: "Остаток", type: "money" },
  ] },
  { id: "contractBonuses", label: "Бонусы по договору", source: "contractBonuses", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "contract", label: "Договор" },
    { key: "accrued", label: "Начислено", type: "number" }, { key: "spent", label: "Списано", type: "number" }, { key: "rest", label: "Остаток", type: "number" },
  ] },
  { id: "subBonuses", label: "Бонусы по абонементу", source: "subBonuses", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "subscription", label: "Абонемент" },
    { key: "accrued", label: "Начислено", type: "number" }, { key: "spent", label: "Списано", type: "number" }, { key: "rest", label: "Остаток", type: "number" },
  ] },
  { id: "visits", label: "Посещения", source: "visits", group: "visits", columns: [
    { key: "date", label: "Дата" }, { key: "time", label: "Время" },
    { key: "club", label: "Клуб" }, { key: "type", label: "Тип" },
    { key: "doc", label: "Документ" },
  ] },
  { id: "visitsBySub", label: "Посещения по абонементу", source: "visitsBySub", group: "visits", columns: [
    { key: "date", label: "Дата" }, { key: "time", label: "Время" },
    { key: "subscription", label: "Абонемент" }, { key: "club", label: "Клуб" },
  ] },
  { id: "notes", label: "Заметки", source: "notes", group: "other", columns: [
    { key: "date", label: "Дата" }, { key: "author", label: "Автор" }, { key: "text", label: "Текст" },
  ] },
  { id: "shop", label: "Бар/Магазин", source: "shop", group: "other", columns: [
    { key: "date", label: "Дата" }, { key: "item", label: "Товар" },
    { key: "qty", label: "Кол-во", type: "number" }, { key: "sum", label: "Сумма", type: "money" },
  ] },
  { id: "mentors", label: "Наставники", source: "mentors", group: "other", columns: [
    { key: "name", label: "ФИО наставника" }, { key: "spec", label: "Специализация" }, { key: "since", label: "Назначен" },
  ] },
  { id: "linked", label: "Связанные", source: "linked", group: "other", columns: [
    { key: "name", label: "ФИО" }, { key: "relation", label: "Связь" }, { key: "phone", label: "Телефон" },
  ] },
];

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

export const EMPLOYEE_CATEGORY = ["Без категории", "Вторая категория", "Первая категория", "Высшая категория"];

// Группы вложенных вкладок карточки сотрудника — по аналогии с клиентской.
export const EMPLOYEE_TAB_GROUPS = [
  { id: "work", label: "Работа" },
  { id: "finance", label: "Финансы" },
  { id: "other", label: "Прочее" },
];

export const EMPLOYEE_DETAIL_TABS = [
  { id: "schedule", label: "Расписание", source: "schedule", group: "work", columns: [
    { key: "date", label: "Дата" }, { key: "time", label: "Время" },
    { key: "name", label: "Занятие" }, { key: "club", label: "Клуб" }, { key: "duration", label: "Мин.", type: "number" },
  ] },
  { id: "clients", label: "Клиенты", source: "clients", group: "work", columns: [
    { key: "name", label: "ФИО клиента" }, { key: "service", label: "Услуга" }, { key: "since", label: "С" },
  ] },
  { id: "certificates", label: "Аттестации/Документы", source: "certificates", group: "work", columns: [
    { key: "date", label: "Дата" }, { key: "title", label: "Документ" }, { key: "validUntil", label: "Действует до" },
  ] },
  { id: "payroll", label: "Начисления", source: "payroll", group: "finance", columns: [
    { key: "date", label: "Дата" }, { key: "type", label: "Тип" },
    { key: "sum", label: "Сумма", type: "money" }, { key: "comment", label: "Комментарий" },
  ] },
  { id: "leaves", label: "Отпуска/Больничные", source: "leaves", group: "other", columns: [
    { key: "type", label: "Тип" }, { key: "start", label: "Начало" }, { key: "end", label: "Окончание" }, { key: "days", label: "Дней", type: "number" },
  ] },
  { id: "notes", label: "Заметки", source: "notes", group: "other", columns: [
    { key: "date", label: "Дата" }, { key: "author", label: "Автор" }, { key: "text", label: "Текст" },
  ] },
];

import { Icons } from "../components/shared/Icons";
export const NAV_ITEMS = [
  { id: "schedule", icon: Icons.schedule, label: "Расписание" },
  { id: "clients", icon: Icons.clients, label: "Клиенты" },
  { id: "employees", icon: Icons.employees, label: "Сотрудники" },
  { id: "news", icon: Icons.news, label: "Новости" },
  { id: "promos", icon: Icons.promos, label: "Акции" },
];