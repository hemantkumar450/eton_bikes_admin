import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductComponent } from "./product.component";
import { routing } from "./product.routing";
import { SharedComponentModule } from "app/shared/shared.module";
import { ProductAddComponent } from "./product-add/product-add.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

@NgModule({
  imports: [routing, SharedComponentModule, CommonModule],
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  exports: [],
  entryComponents: [],
})
export class ProductModule {}
