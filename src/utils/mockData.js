// utils/mockData.js
export const CITIES = [
  { id: 1, name: "Санкт-Петербург" },
  { id: 2, name: "Самара" },
  { id: 3, name: "Казань" },
];

export const CLUBS = [
  { id: 14, city: 1, name: "FH Московский" },
  { id: 15, city: 1, name: "FH Приморский" },
  { id: 16, city: 1, name: "FH Комендантский" },
  { id: 17, city: 2, name: "FH Амбар" },
  { id: 18, city: 2, name: "FH Роза" },
  { id: 19, city: 3, name: "FH Казань Центр" },
];

export const ISCHED = [
  { id: 1, clubId: 14, date: "04.09.2026", time: "09:00", name: "Хатха-йога", trainer: "Кузнецова А.", zone: "Зал 2", duration: 60, available: 8, total: 15 },
  { id: 2, clubId: 14, date: "05.09.2026", time: "11:00", name: "Body Pump", trainer: "Марков П.", zone: "Тренажёрный", duration: 45, available: 2, total: 20 },
  { id: 3, clubId: 14, date: "06.09.2026", time: "13:00", name: "Зумба", trainer: "Орлова Н.", zone: "Танцевальный", duration: 55, available: 0, total: 18 },
  { id: 4, clubId: 14, date: "01.09.2026", time: "18:00", name: "Пилатес", trainer: "Смирнова В.", zone: "Зал 1", duration: 50, available: 5, total: 12 },
  { id: 5, clubId: 14, date: "02.09.2026", time: "09:00", name: "Аквааэробика", trainer: "Петров К.", zone: "Бассейн", duration: 45, available: 10, total: 20 },
  { id: 6, clubId: 14, date: "03.09.2026", time: "11:00", name: "Силовой тренинг", trainer: "Волков Д.", zone: "Тренажёрный", duration: 60, available: 3, total: 15 },
  { id: 7, clubId: 14, date: "04.09.2026", time: "19:00", name: "Кикбоксинг", trainer: "Быков А.", zone: "Единоборства", duration: 60, available: 7, total: 14 },
  { id: 8, clubId: 15, date: "06.09.2026", time: "10:00", name: "Стретчинг", trainer: "Фомина Е.", zone: "Зал 1", duration: 45, available: 6, total: 10 },
  { id: 9, clubId: 15, date: "05.09.2026", time: "12:00", name: "Кардио Микс", trainer: "Горев С.", zone: "Зал 2", duration: 50, available: 0, total: 16 },
];

export const ICLIENTS = [
  { id: 1, lastName: "Иванова", firstName: "Мария", middleName: "Сергеевна", phone: "+7 921 123-45-67", email: "ivanova@mail.ru", clubId: 14, status: "active", card: "FH-00123", since: "12.03.2024", visits: 47, birthDate: "14.06.1990", gender: "f", photo: false, medCert: "05.12.2026", adSource: "Рекомендация друга", address: "СПб, ул. Ленина, 12" },
  { id: 2, lastName: "Петров", firstName: "Александр", middleName: "Николаевич", phone: "+7 912 234-56-78", email: "petrov@gmail.com", clubId: 14, status: "active", card: "FH-00241", since: "05.01.2025", visits: 12, birthDate: "22.11.1985", gender: "m", photo: true, medCert: "", adSource: "Интернет-реклама", address: "СПб, Невский пр., 45" },
  { id: 3, lastName: "Сидорова", firstName: "Ольга", middleName: "Ивановна", phone: "+7 961 345-67-89", email: "", clubId: 15, status: "frozen", card: "FH-00189", since: "20.07.2023", visits: 103, birthDate: "03.02.1978", gender: "f", photo: true, medCert: "18.09.2026", adSource: "Соцсети", address: "СПб, ул. Марата, 8" },
  { id: 4, lastName: "Козлов", firstName: "Дмитрий", middleName: "Валерьевич", phone: "+7 981 456-78-90", email: "kozlov@yandex.ru", clubId: 14, status: "active", card: "FH-00312", since: "14.11.2024", visits: 28, birthDate: "30.07.1993", gender: "m", photo: false, medCert: "", adSource: "Промоакция", address: "СПб, пр. Просвещения, 60" },
  { id: 5, lastName: "Новикова", firstName: "Анна", middleName: "Павловна", phone: "+7 921 567-89-01", email: "novikova@mail.ru", clubId: 16, status: "expired", card: "FH-00078", since: "03.04.2022", visits: 215, birthDate: "19.09.1982", gender: "f", photo: true, medCert: "01.02.2026", adSource: "Наружная реклама", address: "СПб, Комендантский пр., 5" },
  { id: 6, lastName: "Морозов", firstName: "Игорь", middleName: "Алексеевич", phone: "+7 911 678-90-12", email: "", clubId: 15, status: "active", card: "FH-00445", since: "28.02.2025", visits: 6, birthDate: "11.04.1999", gender: "m", photo: false, medCert: "", adSource: "Внешний вид клуба", address: "СПб, ул. Савушкина, 22" },
  { id: 7, lastName: "Волкова", firstName: "Светлана", middleName: "Дмитриевна", phone: "+7 952 789-01-23", email: "volkova@inbox.ru", clubId: 14, status: "active", card: "FH-00521", since: "09.05.2025", visits: 19, birthDate: "27.01.1996", gender: "f", photo: true, medCert: "12.07.2026", adSource: "Другое", address: "СПб, ул. Восстания, 33" },
];

// Данные вложенных вкладок карточки клиента (Договоры, Абонементы, Посещения и т.д.)
// Каждая запись привязана к clientId. Заполнено реалистично для клиента id=1,
// у остальных — частично/пусто (как в реальной CRM: не у всех есть история по каждой вкладке).
export const CLIENT_RELATED = {
  contracts: [
    { id: 1, clientId: 1, number: "M13/26020415555", name: "1 месяц Подписка Мультикарта ps", card: "", regDate: "09.04.2026", start: "10.03.2026", end: "09.04.2026", cardType: "1 месяц (D30,V999,P0…)", active: true },
    { id: 2, clientId: 1, number: "M102/25081113002", name: "1 месяц Подписка Мультикарта", card: "", regDate: "11.08.2025", start: "11.08.2025", end: "10.09.2025", cardType: "1 месяц (D30,V999,P0…)", active: false },
    { id: 3, clientId: 1, number: "M102/22071913003", name: "Акция 1 год (не более 80 виз.)", card: "666123", regDate: "20.07.2022", start: "01.09.2021", end: "27.08.2022", cardType: "1 год 80 визитов (D3…)", active: false },
    { id: 4, clientId: 3, number: "M40/23091500221", name: "Годовой абонемент", card: "551201", regDate: "15.09.2023", start: "15.09.2023", end: "14.09.2024", cardType: "1 год (D365,V999,P0…)", active: false },
  ],
  subscriptions: [
    { id: 1, clientId: 1, number: "M102/2…", name: "Первоначальный платёж", used: 0, left: 1, start: "11.08.2025", end: "12.08.2025", cardType: "1 день (D1,V1,P1,C1)" },
    { id: 2, clientId: 1, number: "M102/2…", name: "Пакет Персональных Тренир…", used: 0, left: 8, start: "22.03.2022", end: "22.03.2023", cardType: "\"1 год\" (D365,V999,P…)" },
    { id: 3, clientId: 1, number: "M102/2…", name: "Пакет Персональных Тренир…", used: 0, left: 8, start: "04.02.2022", end: "04.02.2023", cardType: "\"1 год\" (D365,V999,P…)" },
  ],
  visits: [
    { id: 1, clientId: 1, date: "28.08.2026", time: "10:47", club: "FH Московский", type: "Вход", doc: "M13/26020415555" },
    { id: 2, clientId: 1, date: "25.08.2026", time: "18:12", club: "FH Московский", type: "Вход", doc: "M13/26020415555" },
    { id: 3, clientId: 1, date: "20.08.2026", time: "09:03", club: "FH Московский", type: "Вход", doc: "M13/26020415555" },
    { id: 4, clientId: 2, date: "26.08.2026", time: "19:40", club: "FH Московский", type: "Вход", doc: "FH-00241" },
  ],
  visitsBySub: [
    { id: 1, clientId: 1, date: "22.03.2022", time: "11:00", subscription: "Пакет Персональных Тренировок", club: "FH Московский" },
  ],
  payments: [
    { id: 1, clientId: 1, date: "11.08.2025", sum: 3500, method: "Карта", purpose: "1 месяц Подписка Мультикарта", cashier: "Соколов А.М." },
    { id: 2, clientId: 1, date: "09.04.2026", sum: 3900, method: "Карта", purpose: "1 месяц Подписка Мультикарта ps", cashier: "Соколов А.М." },
  ],
  receipts: [
    { id: 1, clientId: 1, date: "09.04.2026", number: "000481", sum: 3900, items: "Абонемент 1 мес.", cashier: "Соколов А.М." },
  ],
  discounts: [],
  notes: [
    { id: 1, clientId: 1, date: "17.06.2026", author: "Бондарь А.", text: "Переоформление карты, см. статус." },
  ],
  shop: [
    { id: 1, clientId: 1, date: "20.08.2026", item: "Вода 0.5л", qty: 1, sum: 90 },
  ],
  balance: [
    { id: 1, clientId: 1, date: "09.04.2026", op: "Пополнение", sum: 3900, rest: 3900 },
  ],
  deposit: [],
  contractBonuses: [],
  subBonuses: [],
  mentors: [],
  linked: [],
  freezesNew: [],
  freezesAvailable: [
    { id: 1, clientId: 1, doc: "M13/26020415555", available: 14, used: 0 },
  ],
  terminations: [],
  subTerminations: [],
};

export const IEMPS = [
  { id: 1, lastName: "Кузнецова", firstName: "Анна", middleName: "Игоревна", role: "trainer", clubId: 14, phone: "+7 921 111-22-33", email: "kuznetsova@fh.ru", status: "active", since: "15.03.2021", birthDate: "02.05.1994", gender: "f", address: "СПб, ул. Гороховая, 10", specialization: "Йога, стретчинг", category: "Высшая категория", rate: 800, medCert: "20.10.2026" },
  { id: 2, lastName: "Марков", firstName: "Павел", middleName: "Олегович", role: "trainer", clubId: 14, phone: "+7 912 222-33-44", email: "markov@fh.ru", status: "active", since: "01.09.2022", birthDate: "14.08.1990", gender: "m", address: "СПб, ул. Профессора Попова, 3", specialization: "Тренажёрный зал, Body Pump", category: "Первая категория", rate: 700, medCert: "05.11.2026" },
  { id: 3, lastName: "Орлова", firstName: "Надежда", middleName: "Сергеевна", role: "trainer", clubId: 14, phone: "+7 961 333-44-55", email: "orlova@fh.ru", status: "active", since: "12.01.2023", birthDate: "09.12.1992", gender: "f", address: "СПб, Кондратьевский пр., 15", specialization: "Зумба, танцы", category: "Первая категория", rate: 700, medCert: "" },
  { id: 4, lastName: "Смирнова", firstName: "Виктория", middleName: "Андреевна", role: "trainer", clubId: 14, phone: "+7 981 444-55-66", email: "smirnova@fh.ru", status: "vacation", since: "07.06.2020", birthDate: "21.03.1988", gender: "f", address: "СПб, Каменноостровский пр., 40", specialization: "Пилатес", category: "Высшая категория", rate: 850, medCert: "15.01.2026" },
  { id: 5, lastName: "Соколов", firstName: "Артём", middleName: "Максимович", role: "admin", clubId: 14, phone: "+7 921 555-66-77", email: "sokolov@fh.ru", status: "active", since: "20.11.2019", birthDate: "17.06.1985", gender: "m", address: "СПб, Лиговский пр., 78", specialization: "Администрирование клуба", category: "", rate: 500, medCert: "" },
  { id: 6, lastName: "Фомина", firstName: "Елена", middleName: "Николаевна", role: "trainer", clubId: 15, phone: "+7 911 666-77-88", email: "fomina@fh.ru", status: "active", since: "03.04.2022", birthDate: "05.02.1991", gender: "f", address: "СПб, ул. Савушкина, 100", specialization: "Стретчинг", category: "Вторая категория", rate: 650, medCert: "22.03.2026" },
  { id: 7, lastName: "Горев", firstName: "Сергей", middleName: "Павлович", role: "trainer", clubId: 15, phone: "+7 952 777-88-99", email: "gorev@fh.ru", status: "active", since: "17.08.2023", birthDate: "30.10.1996", gender: "m", address: "СПб, пр. Испытателей, 20", specialization: "Кардио, функциональный тренинг", category: "Вторая категория", rate: 650, medCert: "" },
  { id: 8, lastName: "Быков", firstName: "Андрей", middleName: "Романович", role: "trainer", clubId: 14, phone: "+7 921 888-99-00", email: "bykov@fh.ru", status: "active", since: "29.05.2024", birthDate: "12.09.1998", gender: "m", address: "СПб, ул. Восстания, 5", specialization: "Кикбоксинг, единоборства", category: "Без категории", rate: 600, medCert: "" },
];

// Данные вложенных вкладок карточки сотрудника (Расписание, Клиенты, Начисления и т.д.)
export const EMPLOYEE_RELATED = {
  schedule: [
    { id: 1, empId: 1, date: "24.08.2026", time: "09:00", name: "Хатха-йога", club: "FH Московский", duration: 60 },
    { id: 2, empId: 1, date: "27.08.2026", time: "18:30", name: "Пилатес", club: "FH Московский", duration: 50 },
    { id: 3, empId: 2, date: "25.08.2026", time: "11:00", name: "Body Pump", club: "FH Московский", duration: 45 },
  ],
  clients: [
    { id: 1, empId: 1, name: "Иванова Мария Сергеевна", service: "Персональные тренировки", since: "22.03.2022" },
    { id: 2, empId: 1, name: "Волкова Светлана Дмитриевна", service: "Йога 1-на-1", since: "09.05.2025" },
  ],
  certificates: [
    { id: 1, empId: 1, date: "20.10.2021", title: "Сертификат инструктора йоги", validUntil: "20.10.2026" },
  ],
  payroll: [
    { id: 1, empId: 1, date: "31.07.2026", type: "Оклад + ставка за занятия", sum: 68000, comment: "Июль" },
    { id: 2, empId: 1, date: "30.06.2026", type: "Оклад + ставка за занятия", sum: 71200, comment: "Июнь" },
  ],
  leaves: [
    { id: 1, empId: 4, type: "Отпуск", start: "18.08.2026", end: "31.08.2026", days: 14 },
  ],
  notes: [
    { id: 1, empId: 1, date: "03.08.2026", author: "Соколов А.М.", text: "Отличные отзывы клиентов за июль." },
  ],
};

export const INEWS = [
  { id: 1, title: "Открытие нового зала единоборств", body: "В клубе FH Московский пр. открылся обновлённый зал единоборств с профессиональным покрытием и новым оборудованием.", date: "05.08.2026", clubId: 14, published: true },
  { id: 2, title: "Новый тренер по йоге — Кузнецова А.", body: "Мы рады представить нашего нового тренера по йоге и стретчингу. Анна — сертифицированный инструктор с 8-летним стажем.", date: "02.08.2026", clubId: 14, published: true },
  { id: 3, title: "Технические работы 15 августа", body: "15 августа с 09:00 до 14:00 в клубе FH Приморский будут проводиться плановые технические работы.", date: "01.08.2026", clubId: 15, published: false },
  { id: 4, title: "Обновление расписания — осень 2026", body: "С 1 сентября вводится новое расписание занятий. Добавлены утренние группы по пилатесу и вечерние по кикбоксингу.", date: "28.07.2026", clubId: 0, published: true },
];

export const IPROMOS = [
  { id: 1, title: "Летняя акция — абонемент -30%", desc: "Приобрети годовой абонемент до 31 августа со скидкой 30%. Действует для новых клиентов.", from: "01.08.2026", to: "31.08.2026", clubId: 0, active: true },
  { id: 2, title: "Приведи друга +1 месяц", desc: "Приведи друга — получите оба по одному месяцу в подарок при оформлении абонемента от 3 месяцев.", from: "15.07.2026", to: "15.09.2026", clubId: 0, active: true },
  { id: 3, title: "Утренние занятия -20%", desc: "Скидка 20% на все занятия с 07:00 до 10:00 в будние дни.", from: "01.06.2026", to: "30.06.2026", clubId: 14, active: false },
];