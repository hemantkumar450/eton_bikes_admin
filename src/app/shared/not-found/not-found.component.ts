import { Component, OnInit } from "@angular/core";
import { PreviousRouteService } from "app/utilities/previous-route.service";
import { AuthService } from "app/auth/auth.service";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
})
export class NotFoundComponent implements OnInit {
  previousUrl: string;

  constructor(
    private previousRouteService: PreviousRouteService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
    if (this.previousUrl == "/404") {
      this.authService.logout();
    }
  }
}
