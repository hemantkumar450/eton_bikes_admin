import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AlertService } from "./alert.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    private _snackBar: MatSnackBar,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((message) => {
      if (message && message.type) {
        this.openSnackBar(message.text, message.type);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openSnackBar(text, type) {
    this._snackBar.open(`${text}!!!`, `${type}`, {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
