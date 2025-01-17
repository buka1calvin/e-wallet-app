import { LuLayoutDashboard,LuWallet,LuDollarSign,LuSettings } from "react-icons/lu";
import { VscGroupByRefType } from "react-icons/vsc";
import { TbPigMoney,TbCashRegister  } from "react-icons/tb";
export const sideNavLinks=[
    {
        Icon:LuLayoutDashboard,        
        title: "OverView",
        path: "/dashboard",
      },
      {
        Icon:LuWallet,     
        title: "Balances",
        path: "/dashboard/balances",
      },
      {
        Icon:LuDollarSign,     
        title: "Transactions",
        path: "/dashboard/transactions",
      },
      {
        Icon:VscGroupByRefType,     
        title: "Categories",
        path: "/dashboard/categories",
      },
      {
        Icon:TbPigMoney,     
        title: "Budgets",
        path: "/dashboard/budgets",
      },
      {
        Icon:TbCashRegister,     
        title: "Bills",
        path: "/dashboard/bills",
      },
      {
        Icon:LuSettings,     
        title: "Settings",
        path: "/dashboard/settings",
      },
]