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
  { id: 1, clubId: 14, date: "13.08.2026", time: "09:00", name: "Хатха-йога", trainer: "Кузнецова А.", zone: "Зал 2", duration: 60, available: 8, total: 15 },
  { id: 2, clubId: 14, date: "14.08.2026", time: "11:00", name: "Body Pump", trainer: "Марков П.", zone: "Тренажёрный", duration: 45, available: 2, total: 20 },
  { id: 3, clubId: 14, date: "15.08.2026", time: "13:00", name: "Зумба", trainer: "Орлова Н.", zone: "Танцевальный", duration: 55, available: 0, total: 18 },
  { id: 4, clubId: 14, date: "13.08.2026", time: "18:30", name: "Пилатес", trainer: "Смирнова В.", zone: "Зал 1", duration: 50, available: 5, total: 12 },
  { id: 5, clubId: 14, date: "14.08.2026", time: "09:00", name: "Аквааэробика", trainer: "Петров К.", zone: "Бассейн", duration: 45, available: 10, total: 20 },
  { id: 6, clubId: 14, date: "15.08.2026", time: "11:30", name: "Силовой тренинг", trainer: "Волков Д.", zone: "Тренажёрный", duration: 60, available: 3, total: 15 },
  { id: 7, clubId: 14, date: "13.08.2026", time: "19:00", name: "Кикбоксинг", trainer: "Быков А.", zone: "Единоборства", duration: 60, available: 7, total: 14 },
  { id: 8, clubId: 15, date: "14.08.2026", time: "10:00", name: "Стретчинг", trainer: "Фомина Е.", zone: "Зал 1", duration: 45, available: 6, total: 10 },
  { id: 9, clubId: 15, date: "15.08.2026", time: "12:00", name: "Кардио Микс", trainer: "Горев С.", zone: "Зал 2", duration: 50, available: 0, total: 16 },
];

export const ICLIENTS = [
  { id: 1, name: "Иванова Мария Сергеевна", phone: "+7 921 123-45-67", email: "ivanova@mail.ru", clubId: 14, status: "active", card: "FH-00123", since: "12.03.2024", visits: 47 },
  { id: 2, name: "Петров Александр Николаевич", phone: "+7 912 234-56-78", email: "petrov@gmail.com", clubId: 14, status: "active", card: "FH-00241", since: "05.01.2025", visits: 12 },
  { id: 3, name: "Сидорова Ольга Ивановна", phone: "+7 961 345-67-89", email: "", clubId: 15, status: "frozen", card: "FH-00189", since: "20.07.2023", visits: 103 },
  { id: 4, name: "Козлов Дмитрий Валерьевич", phone: "+7 981 456-78-90", email: "kozlov@yandex.ru", clubId: 14, status: "active", card: "FH-00312", since: "14.11.2024", visits: 28 },
  { id: 5, name: "Новикова Анна Павловна", phone: "+7 921 567-89-01", email: "novikova@mail.ru", clubId: 16, status: "expired", card: "FH-00078", since: "03.04.2022", visits: 215 },
  { id: 6, name: "Морозов Игорь Алексеевич", phone: "+7 911 678-90-12", email: "", clubId: 15, status: "active", card: "FH-00445", since: "28.02.2025", visits: 6 },
  { id: 7, name: "Волкова Светлана Дмитриевна", phone: "+7 952 789-01-23", email: "volkova@inbox.ru", clubId: 14, status: "active", card: "FH-00521", since: "09.05.2025", visits: 19 },
];

export const IEMPS = [
  { id: 1, name: "Кузнецова Анна Игоревна", role: "trainer", clubId: 14, phone: "+7 921 111-22-33", email: "kuznetsova@fh.ru", status: "active", since: "15.03.2021" },
  { id: 2, name: "Марков Павел Олегович", role: "trainer", clubId: 14, phone: "+7 912 222-33-44", email: "markov@fh.ru", status: "active", since: "01.09.2022" },
  { id: 3, name: "Орлова Надежда Сергеевна", role: "trainer", clubId: 14, phone: "+7 961 333-44-55", email: "orlova@fh.ru", status: "active", since: "12.01.2023" },
  { id: 4, name: "Смирнова Виктория Андреевна", role: "trainer", clubId: 14, phone: "+7 981 444-55-66", email: "smirnova@fh.ru", status: "vacation", since: "07.06.2020" },
  { id: 5, name: "Соколов Артём Максимович", role: "admin", clubId: 14, phone: "+7 921 555-66-77", email: "sokolov@fh.ru", status: "active", since: "20.11.2019" },
  { id: 6, name: "Фомина Елена Николаевна", role: "trainer", clubId: 15, phone: "+7 911 666-77-88", email: "fomina@fh.ru", status: "active", since: "03.04.2022" },
  { id: 7, name: "Горев Сергей Павлович", role: "trainer", clubId: 15, phone: "+7 952 777-88-99", email: "gorev@fh.ru", status: "active", since: "17.08.2023" },
  { id: 8, name: "Быков Андрей Романович", role: "trainer", clubId: 14, phone: "+7 921 888-99-00", email: "bykov@fh.ru", status: "active", since: "29.05.2024" },
];

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