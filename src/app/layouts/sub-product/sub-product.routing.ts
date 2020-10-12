import { Routes, RouterModule } from "@angular/router";
import { SubProductComponent } from "./sub-product.component";
import { SubProductListComponent } from "./sub-product-list/sub-product-list.component";
import { SubProductDetailComponent } from "./sub-product-detail/sub-product-detail.component";
import { RouteResolver } from "app/utilities/route.resolver";

export const SubProductRoutes: Routes = [
  {
    path: "",
    resolve: { response: RouteResolver },
    component: SubProductComponent,
    children: [
      {
        path: "",
        component: SubProductListComponent,
        resolve: { response: RouteResolver },
      },
      {
        path: "add",
        component: SubProductDetailComponent,
        resolve: { response: RouteResolver },
      },
      {
        path: "edit/:id",
        component: SubProductDetailComponent,
        resolve: { response: RouteResolver },
      },
    ],
  },
];

export const routing = RouterModule.forChild(SubProductRoutes);
