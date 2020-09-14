import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(mod => mod.LoginModule)
  }
];

export const routing = RouterModule.forChild(routes);
