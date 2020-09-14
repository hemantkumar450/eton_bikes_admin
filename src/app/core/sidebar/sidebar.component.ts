import { Component, OnInit, Input } from "@angular/core";
import { MenuItem, MenuIcons, MasterMenuItems } from "app/models/common.model";
import { AuthService } from "app/auth/auth.service";
import { Router } from "@angular/router";
import { PopUpModalService } from "app/services/pop-up.service";
import { User } from "app/models/user.model";
import _ from "lodash";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
  providers: [PopUpModalService],
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[];
  @Input() user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private popUpModalService: PopUpModalService
  ) {}

  ngOnInit() {
    this.getMenuItems();
    this.authService.setMenuItems();
  }

  getMenuItems() {
    this.authService.getMenuItems.subscribe((res) => {
      this.menuItems = _.orderBy(res, ["groupName"]);
      const value = this.menuItems.find((x) => x.groupName == "main");
      this.menuItems = this.menuItems.filter(
        (item) => item.groupName !== "main"
      );
      this.menuItems.push(value);
    });
  }

  logout() {
    const html = `<h3 mat-dialog-title>Are you sure want to <b>Logout</b> ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.authService.logout();
          // this.router.navigate(["/auth/login"]);
        }
      });
  }
}
