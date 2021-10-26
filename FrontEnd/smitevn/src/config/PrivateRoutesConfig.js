import AdminDashboard from "../components/admin/AdminDashboard";
import { HomePage } from "../components/common";
import { TranslateGodsDashboard } from "../components/mod";
import Roles from "./Roles";
//Components

export default [
  {
    component: AdminDashboard,
    path: "/admin",
    exact: true,
    permission: [Roles.ADMIN],
  },
  {
    component: TranslateGodsDashboard,
    path: "/translate",
    exact: true,
    permission: [Roles.ADMIN, Roles.MODERATOR],
  },
];
