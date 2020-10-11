import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { RouteResolver } from "app/utilities/route.resolver";

export const ProductRoutes: Routes = [
  {
    path: "",
    resolve: { response: RouteResolver },
    component: ProductComponent,
    children: [
      {
        path: "",
        component: ProductListComponent,
        resolve: { response: RouteResolver },
      },
      {
        path: "add",
        component: ProductDetailComponent,
        resolve: { response: RouteResolver },
      },
      {
        path: "edit/:id",
        component: ProductDetailComponent,
        resolve: { response: RouteResolver },
      },
      {
        path: "view/:id",
        component: ProductDetailComponent,
        resolve: { response: RouteResolver },
      },
    ],
  },
];

export const routing = RouterModule.forChild(ProductRoutes);
