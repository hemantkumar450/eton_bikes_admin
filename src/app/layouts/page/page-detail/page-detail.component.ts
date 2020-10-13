import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { forkJoin } from "rxjs";
import { AlertService } from "app/shared/alert/alert.service";
import { ActivatedRoute, Router } from "@angular/router";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { environment } from "environments/environment";
import { PageModel, RedirectDetail, Section } from "app/models/page.model";
import { PageService } from "app/services/page.service";

export class DisplayMedia {
  category: string;
  url: string;
}

@Component({
  selector: "app-page-detail",
  templateUrl: "./page-detail.component.html",
  styleUrls: ["./page-detail.component.scss"],
})
export class PageDetailComponent implements OnInit {
  page: PageModel = new PageModel();
  targetUrl: string = `${environment.baseUrl}admin/fileUploader`;
  ckeConfig: any;
  pageTypes = ["home", "enquiry"];
  mediaSides = ["left", "right", "center"];
  mediaUrl: string = environment.mediaUrl;
  sectionTypes = [
    "banner",
    "social_media",
    "api_call",
    "slider",
    "media_panel",
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {
    this.page._id = this.route.snapshot.params.id || undefined;
    if (this.page._id) {
      this.getPageById();
    }
  }

  ngOnInit() {
    // forkJoin([this.productService.getProducts({ dropdown: 1 })]).subscribe(
    //   ([products]) => {
    //     this.products = products.data;
    //   }
    // );
  }

  getPageById() {
    this.pageService.getPageById(this.page._id).subscribe((res) => {
      this.page = res.data;
    });
  }

  onFileComplete(event, type) {}

  deleteSectionImage(index, medias) {
    medias.splice(index, 1);
  }

  addSection() {
    this.page.sections.push(new Section());
  }

  deleteSection(index) {
    this.page.sections.splice(index, 1);
  }

  addMedia(event, section: Section) {
    section.medias.push(Object.assign(event.data));
  }

  addRedirectDetail(redirect_detail) {
    redirect_detail.push(new RedirectDetail());
  }

  deleteRedirectDetail(index, redirect_detail) {
    redirect_detail.splice(index, 1);
  }

  onSubmit() {
    this.pageService.savePage(this.page).subscribe((res) => {
      this.alertService.success("Record Saved");
      this.cancel();
    });
  }

  cancel() {
    this.router.navigate(["/page"]);
  }
}
