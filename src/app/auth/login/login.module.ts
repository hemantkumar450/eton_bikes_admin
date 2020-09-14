import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, LoginRoutingModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
