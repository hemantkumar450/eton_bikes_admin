import { Routes } from "@angular/router";
import { AuthGuard } from "app/utilities/auth.gaurd";

export const LayoutRoutes: Routes = [
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((mod) => mod.DashboardModule),
  },
  {
    path: "user",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./user/user.module").then((mod) => mod.UserModule),
  },
];
