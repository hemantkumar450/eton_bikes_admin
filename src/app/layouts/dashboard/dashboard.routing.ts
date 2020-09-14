import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const DashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent
  }
];

export const routing = RouterModule.forChild(DashboardRoutes);
