// component
import { title } from "process";
import Iconify from "../../components/Iconify";
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const dashboardConfig = [
  {
    title: "داشبورد",
    path: "dashboard",
    icon: getIcon("ri:pie-chart-2-line"),
  },
];

const reportsConfig = [
  {
    title: "گزارش فراخوانی",
    path: "reports?page=0&size=10&limit=10",
    icon: getIcon("tabler:report"),
  },
  {
    title: "گزارش احراز حویت",
    path: "kycIdentification",
    icon: getIcon("tabler:report"),
  },
];

const navConfig = [
  {
    title: "داشبورد",
    path: "dashboard",
    icon: getIcon("ri:pie-chart-2-line"),
  },

  {
    title: "سرویس ها",
    path: "services",
    icon: getIcon("material-symbols:list-alt-outline"),
  },

  {
    title: "کاربران",
    path: "users",
    icon: getIcon("ph:users-three-bold"),
  },
  // {
  //   title: "kyc",
  //   path: "kyc",
  //   // icon: getIcon("material-symbols:document-scanner-outline"),
  // },
];

const menus = [
  {
    open: false,
    title: "گزارشات",
    id: "reportsConfig",
    icon: getIcon("tabler:report"),
    listMenu: [
      {
        title: "گزارش فراخوانی",
        path: "reports?page=0&size=10&limit=10",
        icon: getIcon("tabler:api-app"),
      },
      {
        title: "گزارش احراز حویت",
        path: "kycIdentification",
        icon: getIcon("tabler:id"),
      },
    ],
  },
  {
    open: false,
    title: "پیاده سازی",
    id: "implimentation",

    icon: getIcon("tabler:timeline"),
    listMenu: [
      {
        title: "مستندات",
        path: "documents",
        icon: getIcon("ri:pie-chart-2-line"),
      },
      {
        title: "به روزرسانی ها",
        path: "updates",
        icon: getIcon("ri:pie-chart-2-line"),
      },
    ],
  },
  {
    open: false,
    title: "پشتیبانی",
    id: "supportConfig",
    icon: getIcon("tabler:hours-24"),
    listMenu: [
      {
        title: "قوانین",
        path: "rules",
        icon: getIcon("ri:pie-chart-2-line"),
      },
      {
        title: "راهنما",
        path: "guide",
        icon: getIcon("tabler:report"),
      },
      {
        title: "سوالات متداول",
        path: "questions",
        icon: getIcon("tabler:report"),
      },
      {
        title: "ثبت تیکت جدید",
        path: "createNewTicketPage",
        icon: getIcon("tabler:report"),
      },
      {
        title: "لیست تیکت ها",
        path: "tickets",
        icon: getIcon("tabler:report"),
      },
      {
        title: "تماس با لوانت",
        path: "contact",
        icon: getIcon("tabler:report"),
      },
    ],
  },
  {
    open: false,
    title: "مالی",
    id: "finantialConfig",
    icon: getIcon("tabler:report-money"),
    listMenu: [
      {
        title: "صورت حساب",
        path: "invoice",
        icon: getIcon("tabler:report"),
      },
      {
        title: "پرداخت ها",
        path: "payments",
        icon: getIcon("tabler:report"),
      },
      {
        title: "افزایش موجودی",
        path: "increaseInventory",
        icon: getIcon("tabler:report"),
      },
    ],
  },
];
const implimentation = [
  {
    title: "مستندات",
    path: "documents",
    icon: getIcon("ri:pie-chart-2-line"),
  },
  {
    title: "به روزرسانی ها",
    path: "updates",
    icon: getIcon("ri:pie-chart-2-line"),
  },
];
const supportSection = [
  {
    title: "قوانین",
    path: "rules",
    icon: getIcon("ri:pie-chart-2-line"),
  },
  {
    title: "راهنما",
    path: "guide",
    icon: getIcon("tabler:report"),
  },
  {
    title: "سوالات متداول",
    path: "questions",
    icon: getIcon("tabler:report"),
  },
  {
    title: "ثبت تیکت جدید",
    path: "createTicket",
    icon: getIcon("tabler:report"),
  },
  {
    title: "لیست تیکت ها",
    path: "tickets",
    icon: getIcon("tabler:report"),
  },
  {
    title: "تماس با لوانت",
    path: "contact",
    icon: getIcon("tabler:report"),
  },
];

const finantial = [
  {
    title: "صورت حساب",
    path: "invoice",
    icon: getIcon("tabler:report"),
  },
  {
    title: "پرداخت ها",
    path: "payments",
    icon: getIcon("tabler:report"),
  },
  {
    title: "افزایش موجودی",
    path: "increaseInventory",
    icon: getIcon("tabler:report"),
  },
];

export {
  dashboardConfig,
  reportsConfig,
  navConfig,
  supportSection,
  implimentation,
  finantial,
  menus,
};
