import { Routes, RouterModule } from "@angular/router";
import { RouteResolver } from "app/utilities/route.resolver";
import { KeyComponent } from "./key.component";

export const KeyRoutes: Routes = [
  {
    path: "",
    resolve: { response: RouteResolver },
    component: KeyComponent,
  },
];

export const routing = RouterModule.forChild(KeyRoutes);
