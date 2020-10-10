import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddKeyComponent } from "./add-key/add-key.component";
import { KeyComponent } from "./key.component";
import { routing } from "./key.routing";
import { SharedComponentModule } from "app/shared/shared.module";

@NgModule({
  imports: [routing, SharedComponentModule, CommonModule],
  declarations: [KeyComponent, AddKeyComponent],
  exports: [],
  entryComponents: [AddKeyComponent]
})
export class KeyModule {}
