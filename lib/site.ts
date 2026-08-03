export const siteConfig = {
  name: "РостПро",
  tagline: "Единая система для планирования, ресурсов и финансов проекта",
  description:
    "РостПро автоматически связывает задачи, табели учёта времени, подрядчиков и финансовые показатели проекта, показывая прибыльность каждого этапа в режиме реального времени.",
  url: "https://rostpro.tech",
  email: "office@rostpro.com",
  phone: "+7 (473) 202-66-62",
  phoneHref: "tel:74732026662",
};

export const legalEntity = {
  name: "Общество с ограниченной ответственностью «РОСТ СОФТ»",
  shortName: "ООО «РОСТ СОФТ»",
  address: "394024, Воронежская обл., г. Воронеж, ул. Транспортная, д. 12, оф. 3",
  inn: "3665813259",
  kpp: "366601001",
  ogrn: "1213600001020",
};

export type NavChild = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Возможности", href: "/features" },
  { label: "Тарифы", href: "/pricing" },
  {
    label: "Технологии",
    href: "/technologies",
    children: [
      { label: "Технологии", href: "/technologies" },
      { label: "Документация", href: "https://docs.rostpro.tech/", external: true },
      { label: "История версий", href: "/changelog" },
    ],
  },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contact" },
];
