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
  Payment as PaymentIcon,
  Shield as ShieldIcon,
  AccountBalance as AccountBalanceIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
} from "@mui/icons-material";

export const sideNav = (setSelectedPage: (page: string) => void, pendingOrderCount: number) => [
  { kind: "header", title: "Main items" },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon onClick={() => setSelectedPage("dashboard")} />,
  },
 
  
  { kind: "divider" },
  { kind: "header", title: "Core Operations" },

   {
    segment:"customers",
    title: "Customers",
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
  {
    segment:"loans",
    title: "Loans",
    icon : <MoneyIcon onClick={() => setSelectedPage("loans")} />,
    children: [
      {
        segment: "list",
        title: "Loan Applications",
        icon: <VisibilityIcon onClick={() => setSelectedPage("loans/list")} />,
      },
      {
        segment: "add",
        title: "Add Loan",
        icon: <AddIcon onClick={() => setSelectedPage("loans/add")} />,
      }
    ]
  },
  {
    segment:"repayments",
    title: "Repayments",
    icon : <PaymentIcon onClick={() => setSelectedPage("repayments")} />,
    children: [
      {
        segment: "list",
        title: "Repayment Records",
        icon: <VisibilityIcon onClick={() => setSelectedPage("repayments/list")} />,
      },
      {
        segment: "add",
        title: "Record Repayment",
        icon: <AddIcon onClick={() => setSelectedPage("repayments/add")} />,
      }
    ]
  },
  
  { kind: "divider" },
  { kind: "header", title: "Risk Management" },
  
  {
    segment:"guarantors",
    title: "Guarantors",
    icon : <ShieldIcon onClick={() => setSelectedPage("guarantors")} />,
    children: [
      {
        segment: "list",
        title: "Guarantor List",
        icon: <VisibilityIcon onClick={() => setSelectedPage("guarantors/list")} />,
      },
      {
        segment: "add",
        title: "Add Guarantor",
        icon: <AddIcon onClick={() => setSelectedPage("guarantors/add")} />,
      }
    ]
  },
  {
    segment:"collaterals",
    title: "Collaterals",
    icon : <AccountBalanceIcon onClick={() => setSelectedPage("collaterals")} />,
    children: [
      {
        segment: "list",
        title: "Collateral List",
        icon: <VisibilityIcon onClick={() => setSelectedPage("collaterals/list")} />,
      },
      {
        segment: "add",
        title: "Add Collateral",
        icon: <AddIcon onClick={() => setSelectedPage("collaterals/add")} />,
      }
    ]
  },

  { kind: "divider" },
  { kind: "header", title: "Administration" },
  
  {
    segment:"employees",
    title: "Employees",
    icon : <PeopleIcon onClick={() => setSelectedPage("employees")} />,
    children: [
      {
        segment: "list",
        title: "Employee List",
        icon: <VisibilityIcon onClick={() => setSelectedPage("employees/list")} />,
      },
      {
        segment: "add",
        title: "Add Employee",
        icon: <AddIcon onClick={() => setSelectedPage("employees/add")} />,
      }
    ]
  },
  {
    segment:"branches",
    title: "Branches",
    icon : <BusinessIcon onClick={() => setSelectedPage("branches")} />,
    children: [
      {
        segment: "list",
        title: "Branch List",
        icon: <VisibilityIcon onClick={() => setSelectedPage("branches/list")} />,
      },
      {
        segment: "add",
        title: "Add Branch",
        icon: <AddIcon onClick={() => setSelectedPage("branches/add")} />,
      }
    ]
  },

  { kind: "divider" },
  { kind: "header", title: "Financial Management" },
  
  {
    segment: "accounting",
    title: "Accounting",
    icon: <AccountBalanceWalletIcon onClick={() => setSelectedPage("accounting")} />,
    children: [
      {
        segment: "transactions",
        title: "Transactions",
        icon: <VisibilityIcon onClick={() => setSelectedPage("accounting/transactions")} />,
      }
    ]
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <AssessmentIcon onClick={() => setSelectedPage("reports")} />,
    children: [
      {
        segment: "overview",
        title: "Overview",
        icon: <BarChartIcon onClick={() => setSelectedPage("reports/overview")} />,
      }
    ]
  },
  // … rest of your admin navigation items
];
