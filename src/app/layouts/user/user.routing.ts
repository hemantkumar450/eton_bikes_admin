import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserGridComponent } from "./user-grid/user-grid.component";

export const UserRoutes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      {
        path: "",
        component: UserGridComponent,
      },
      {
        path: "add",
        component: UserDetailComponent,
      },
      {
        path: "edit/:id",
        component: UserDetailComponent,
      },
    ],
  },
];

export const routing = RouterModule.forChild(UserRoutes);
