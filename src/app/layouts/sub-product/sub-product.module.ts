import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubProductDetailComponent } from "./sub-product-detail/sub-product-detail.component";
import { SubProductListComponent } from "./sub-product-list/sub-product-list.component";
import { SubProductComponent } from "./sub-product.component";
import { routing } from "./sub-product.routing";
import { SharedComponentModule } from "app/shared/shared.module";

@NgModule({
  imports: [routing, SharedComponentModule, CommonModule],
  declarations: [
    SubProductDetailComponent,
    SubProductListComponent,
    SubProductComponent,
  ],
  exports: [],
  entryComponents: [],
})
export class SubProductModule {}
