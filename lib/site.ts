export const siteConfig = {
  name: "PlanR",
  tagline: "Единая система для планирования, ресурсов и финансов проекта",
  description:
    "PlanR автоматически связывает задачи, табели учёта времени, подрядчиков и финансовые показатели проекта, показывая прибыльность каждого этапа в режиме реального времени.",
  url: "https://planr.cloud",
  email: "office@planr.cloud",
  phone: "+7 (473) 202-66-62",
  phoneHref: "tel:74732026662",
};

export const legalEntity = {
  name: "Общество с ограниченной ответственностью «РОСТСОФТ»",
  shortName: "ООО «РОСТСОФТ»",
  address: "394024, Воронежская обл., г. Воронеж, ул. Транспортная, д. 12, оф. 3",
  inn: "3665813259",
  kpp: "366601001",
  ogrn: "1213600001020",
};

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Возможности", href: "/features" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Технологии", href: "/technologies" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contact" },
];
