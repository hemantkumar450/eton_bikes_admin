import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { DownloadFile } from "app/models/user.model";

@Component({
  selector: "app-report-popup",
  templateUrl: "./report-popup.component.html",
  styleUrls: ["./report-popup.component.scss"],
})
export class ReportPopupComponent implements OnInit {
  downloadDetail: DownloadFile = new DownloadFile();

  constructor(
    public dialogRef: MatDialogRef<ReportPopupComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.downloadReport(this.data.html.report.inkredo.report, "inkredo");
    this.downloadReport(this.data.html.report.inkredo.report, "experion");
  }

  onCancel() {
    this.dialogRef.close();
  }

  checkAndSave() {
    this.dialogRef.close({ event: "close" });
  }

  downloadReport(reportJson, type) {
    var theJSON = JSON.stringify(reportJson);
    var uri = this.sanitizer.bypassSecurityTrustUrl(
      "data:text/json;charset=UTF-8," + JSON.parse(theJSON)
    );
    if (type == "inkredo") {
      this.downloadDetail.inkredo.report = uri;
      this.downloadDetail.inkredo.reportName = `${this.data.html.user.mobile}_inkredo_report.json`;
    } else {
      this.downloadDetail.experion.report = uri;
      this.downloadDetail.experion.reportName = `${this.data.html.user.mobile}_experian_report.json`;
    }
  }
}
