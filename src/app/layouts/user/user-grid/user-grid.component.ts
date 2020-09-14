import { Component, OnInit } from "@angular/core";
import {
  PaginationEnum,
  PaginationService,
} from "app/utilities/paginator.service";
import { User } from "../../../models/user.model";
import { MatTableDataSource } from "@angular/material/table";
import { Permission } from "app/models/common.model";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "app/services/user.service";
import { PopUpModalService } from "app/services/pop-up.service";

@Component({
  selector: "app-user-grid",
  templateUrl: "./user-grid.component.html",
  styleUrls: ["./user-grid.component.scss"],
  providers: [PopUpModalService],
})
export class UserGridComponent implements OnInit {
  pageSize: Number = PaginationEnum.PageSize;
  emailTemplates = new MatTableDataSource<User>();
  displayedColumns: string[] = ["name", "email", "mobile", "edit"];
  totalRecords: number = 10;

  constructor(
    private router: Router,
    protected paginationService: PaginationService,
    private route: ActivatedRoute,
    private userService: UserService,
    private popUpModalService: PopUpModalService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUser(this.paginationService.getParams())
      .subscribe((result) => {
        this.emailTemplates.data = result.data.users;
        this.totalRecords = result.data.totalRecords;
      });
  }

  onEditUser(user?: User) {
    const route = user ? `/user/edit/${user._id}` : `/user/add`;
    this.router.navigate([route]);
  }

  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getUsers();
  }

  onSorting(event) {
    if (!event.direction) {
      return;
    }
    this.paginationService.setSortExpression(event);
    this.getUsers();
  }

  doFilter = (value: string) => {
    this.paginationService.query = value.trim().toLocaleLowerCase();
    this.getUsers();
  };

  // ToggleConfirmation(user: User) {
  //   const html = `<h3 mat-dialog-title>Are you sure want to change status of <b>${user.name}</b> ?</h3>`;
  //   this.popUpModalService
  //     .openDialog({ html, component: null })
  //     .subscribe((res) => {
  //       if (res) {
  //         this.onToggleEvent(user);
  //       } else {
  //         user.active = user.active;
  //       }
  //     });
  // }

  onFilterReset() {
    this.paginationService.setDefaultPage();
    this.getUsers();
  }

  onActiveEvent(event) {
    this.paginationService.active = event.value;
    this.getUsers();
  }

  onToggleEvent(user: User) {
    this.userService.onToggleEvent(user._id).subscribe((res) => {
      this.getUsers();
    });
  }
}
