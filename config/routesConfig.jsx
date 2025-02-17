import { lazy } from "react";

const routesConfig = [
  { path: "/dashboard", component: lazy(() => import("../pages/Dashboard")), allowedRoles: ["admin", "user"] },
  { path: "/admin", component: lazy(() => import("../pages/Admin")), allowedRoles: ["admin"] },
  { path: "/profile", component: lazy(() => import("../pages/Profile")), allowedRoles: ["user", "admin"] },
  { path: "/login", component: lazy(() => import("../pages/Login")), allowedRoles: ["guest"] },
];

export default routesConfig;
