import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserGridComponent } from "./user-grid/user-grid.component";
import { routing } from "./user.routing";
import { SharedComponentModule } from "app/shared/shared.module";
import { ReportPopupComponent } from "./user-detail/report-popup/report-popup.component";

@NgModule({
  imports: [routing, SharedComponentModule, CommonModule],
  declarations: [
    UserDetailComponent,
    UserComponent,
    UserGridComponent,
    ReportPopupComponent,
  ],
  entryComponents: [ReportPopupComponent],
})
export class UserModule {}
