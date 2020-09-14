import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "app/models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { PopUpModalService } from "app/services/pop-up.service";
import { ReportPopupComponent } from "./report-popup/report-popup.component";
import { AlertService } from "app/shared/alert/alert.service";
import { Permission } from "app/models/common.model";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
  providers: [PopUpModalService],
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  @ViewChild("f", { static: true }) f: any;
  verificationStatusList = [
    "kyc",
    "mobile",
    "experion",
    "email",
    "bank_statement",
    "token_amount",
    "security_amount",
  ];
  shouldShowDownload: boolean;
  permission: Permission = new Permission();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private popUpModalService: PopUpModalService
  ) {
    this.permission = this.route.snapshot.data.response;
  }

  ngOnInit() {
    this.user._id = this.route.snapshot.params.id || undefined;
    if (this.user._id) {
      this.getUserById();
    }
  }

  getUserById() {
    this.userService.getUserById(this.user._id).subscribe((result) => {
      this.user = result.data;
      this.f.form.disable();
      this.enableDownload();
    });
  }

  enableDownload() {
    const { bank_statement, experion, kyc, mobile } = this.user.is_verified;
    this.shouldShowDownload = bank_statement && experion && kyc && mobile;
  }

  onReportPopup(report, width = "500px") {
    this.popUpModalService
      .openDialog({
        html: { report, user: this.user },
        width: width,
        component: ReportPopupComponent,
      })
      .subscribe((res) => {
        // this._sanitizePopupResult(res);
      });
  }

  checkDigit(key) {
    var numbers = new RegExp(/^[0-9]+$/);
    if (!numbers.test(this.user[key])) {
      this.user[key] = null;
    }
  }

  onSubmit() {
    this.userService.saveUser(this.user).subscribe((result) => {
      this.cancel();
    });
  }

  cancel() {
    this.router.navigate(["/user"]);
  }

  downloadReport() {
    this.userService.downloadReport(this.user._id).subscribe((result) => {
      this.onReportPopup(result.data);
      console.log(result.data);
    });
  }

  onEmailVerification() {
    this.userService
      .onEmailVerification(this.user.email)
      .subscribe((result) => {
        this.alertService.success(result.message);
      });
  }
}
