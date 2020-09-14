import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { routing } from "./dashboard.routing";
import { SharedComponentModule } from "app/shared/shared.module";

@NgModule({
  imports: [routing, SharedComponentModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
