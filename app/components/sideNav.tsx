import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Inventory2 as Inventory2Icon,
  Category as CategoryIcon,
  Link as LinkIcon,
  Queue as QueueIcon,
  Reddit as RedditIcon,
  Money as MoneyIcon,
  Print as PrintIcon,
  Engineering as EngineeringIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";

export const sideNav = (setSelectedPage: (page: string) => void, pendingOrderCount: number) => [
  { kind: "header", title: "Main items" },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon onClick={() => setSelectedPage("dashboard")} />,
  },
 
  
  { kind: "divider" },
  { kind: "header", title: "Users" },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "sales",
  //       title: "Sales",
  //       icon: <BarChartIcon onClick={() => setSelectedPage("reports/sales")} />,
  //     },
  //     {
  //       segment: "products",
  //       title: "Products",
  //       icon: <BarChartIcon onClick={() => setSelectedPage("reports/products")} />,
  //     },
  //     {
  //       segment: "stocks",
  //       title: "Stocks",
  //       icon: <BarChartIcon onClick={() => setSelectedPage("reports/stocks")} />,
  //     },
  //   ],
  // },

   {
    segment:"customers",
    title: "Customer",
    icon : <RedditIcon onClick={() => setSelectedPage("customers")} />,
    children: [
      {
        segment: "list",
        title: "Customer List",
        icon: <VisibilityIcon onClick={() => setSelectedPage("customers/list")} />,
      },
      {
        segment: "add",
        title: "Add Customer",
        icon: <AddIcon onClick={() => setSelectedPage("customers/add")} />,
      }
    ]
  },
  // … rest of your admin navigation items
];
