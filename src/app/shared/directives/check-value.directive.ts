import { Directive, HostListener, Input } from "@angular/core";
import { NgModel } from "@angular/forms";
import { AlertService } from "app/shared/alert/alert.service";

@Directive({
  selector: "[check-value]",
  providers: [NgModel]
})
export class CheckValueDirective {
  @Input('value') value:any;
  constructor(private ngModel: NgModel, private alertService: AlertService) {}

  @HostListener("keyup", ["$event"]) onKeyUp(event) {
    let value = this.ngModel.model;
    if (value >= this.value) {
      this.alertService.error(`Value can't be more than 50`);
      this.ngModel.update.emit(null);
    }
  }
}
