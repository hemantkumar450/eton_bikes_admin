import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/filter";
import { User } from "app/models/user.model";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  user: User
  constructor() {}

  ngOnInit() {
    this.user = new User()//JSON.parse(sessionStorage.getItem('user')).admin;
  }

  ngAfterViewInit() {}
}
