import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductComponent } from "./product.component";
import { routing } from "./product.routing";
import { SharedComponentModule } from "app/shared/shared.module";

@NgModule({
  imports: [routing, SharedComponentModule, CommonModule],
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ProductComponent,
  ],
  exports: [],
  entryComponents: [],
})
export class ProductModule {}
