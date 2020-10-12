import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageDetailComponent } from "./page-detail/page-detail.component";
import { PageListComponent } from "./page-list/page-list.component";
import { PageComponent } from "./page.component";
import { routing } from "./page.routing";
import { SharedComponentModule } from "app/shared/shared.module";

@NgModule({
  imports: [routing, SharedComponentModule, CommonModule],
  declarations: [PageDetailComponent, PageListComponent, PageComponent],
  exports: [],
  entryComponents: [],
})
export class PageModule {}
