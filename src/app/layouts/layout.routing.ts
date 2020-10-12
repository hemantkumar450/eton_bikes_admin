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
    path: "key",
    canActivate: [AuthGuard],
    loadChildren: () => import("./key/key.module").then((mod) => mod.KeyModule),
  },
  {
    path: "product",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./product/product.module").then((mod) => mod.ProductModule),
  },
  {
    path: "sub-product",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./sub-product/sub-product.module").then(
        (mod) => mod.SubProductModule
      ),
  },
];
