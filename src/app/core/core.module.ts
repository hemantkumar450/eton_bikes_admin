import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SharedComponentModule } from "app/shared/shared.module";

@NgModule({
  imports: [CommonModule, RouterModule, SharedComponentModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class CoreModule {}
