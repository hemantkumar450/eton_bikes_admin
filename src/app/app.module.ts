import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CoreModule } from "./core/core.module";
import { LoaderComponent } from "./core/loader/loader.component";
import { LoaderService } from "./core/loader/loader.service";
import { LayoutComponent } from "./layouts/layout.component";
import { SharedComponentModule } from "./shared/shared.module";
import { AuthGuard } from "./utilities/auth.gaurd";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule,
    AppRoutingModule,
    SharedComponentModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    AppComponent,
    LayoutComponent,
    LoaderComponent,
    NotFoundComponent
  ],
  providers: [LoaderService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
