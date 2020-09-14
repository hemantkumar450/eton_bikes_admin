import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layouts/layout.component";
import { AuthGuard } from "./utilities/auth.gaurd";
import { NotFoundComponent } from "./shared/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/layout.module").then(mod => mod.LayoutModule)
      }
    ]
  },
  {
    path: "auth",
    loadChildren: () =>
      import("app/auth/auth.module").then(mod => mod.AuthModule)
  },
  // otherwise redirect to home
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
