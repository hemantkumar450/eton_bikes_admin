import { Component, OnInit } from "@angular/core";
import { PageModel } from "app/models/page.model";
import { PageService } from "app/services/page.service";
import {
  PaginationService,
  PaginationEnum,
} from "app/utilities/paginator.service";

import { Router, ActivatedRoute } from "@angular/router";
import { Permission } from "app/models/common.model";
import { PopUpModalService } from "app/services/pop-up.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-page-list",
  templateUrl: "./page-list.component.html",
  styleUrls: ["./page-list.component.scss"],
  providers: [PopUpModalService],
})
export class PageListComponent implements OnInit {
  displayedColumns: string[] = ["name", "description", "edit", "changeStatus"];
  pages = new MatTableDataSource<PageModel>();
  pageSize: Number = PaginationEnum.PageSize;
  totalRecords: number = 10;
  permission: Permission = new Permission();

  constructor(
    private pageService: PageService,
    private paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    public popUpModalService: PopUpModalService
  ) {
    this.permission = this.route.snapshot.data.response;
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getPages();
  }

  getPages() {
    this.pageService
      .getPages(this.paginationService.getParams())
      .subscribe((result) => {
        this.pages.data = result.data.pages;
        this.totalRecords = result.data.totalRecords;
      });
  }

  onEditPage(page?: PageModel) {
    const route = page ? `/page/edit/${page._id}` : `/page/add`;
    this.router.navigate([route]);
  }

  onViewPage(page?: PageModel) {
    const route = `/page/view/${page._id}`;
    this.router.navigate([route]);
  }

  deletePage(pageId: string) {
    const html = `<h3 mat-dialog-title>Are you sure want to delete this page ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.pageService.deletePage(pageId).subscribe((res) => {
            this.getPages();
          });
        }
      });
  }

  statusChange(page: PageModel) {
    const html = `<h3 mat-dialog-title>Are you sure want to change status of <b>${page._id}</b> ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.onStatusChanged(page);
        }
      });
  }

  onStatusChanged(page) {
    const should_list = page.should_list === "LISTED" ? false : true;
  }

  /** to do
   * pagination, sorting & filtering will be implemented soon
   */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPages();
  }

  onSorting(event) {
    if (!event.direction) {
      return;
    }
    this.paginationService.setSortExpression(event);
    this.getPages();
  }

  doFilter(value) {
    this.paginationService.query = value.trim().toLocaleLowerCase();
    this.getPages();
  }
}
