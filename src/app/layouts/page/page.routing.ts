import { Routes, RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { PageListComponent } from "./page-list/page-list.component";
import { PageDetailComponent } from "./page-detail/page-detail.component";
import { RouteResolver } from "app/utilities/route.resolver";

export const PageRoutes: Routes = [
  {
    path: "",
    resolve: { response: RouteResolver },
    component: PageComponent,
    children: [
      {
        path: "",
        component: PageListComponent,
        resolve: { response: RouteResolver },
      },
      {
        path: "add",
        component: PageDetailComponent,
        resolve: { response: RouteResolver },
      },
      {
        path: "edit/:id",
        component: PageDetailComponent,
        resolve: { response: RouteResolver },
      },
    ],
  },
];

export const routing = RouterModule.forChild(PageRoutes);
