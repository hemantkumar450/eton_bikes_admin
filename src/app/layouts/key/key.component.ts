import { Component, OnInit, ViewChild } from "@angular/core";
import { KeyService } from "../../services/key.service";

import { AddKeyComponent } from "./add-key/add-key.component";
import { KeyModel } from "../../models/key.model";
import {
  PaginationService,
  PaginationEnum,
} from "app/utilities/paginator.service";
import { ActivatedRoute } from "@angular/router";
import { Permission } from "app/models/common.model";
import { PopUpModalService } from "app/services/pop-up.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-key",
  templateUrl: "./key.component.html",
  styleUrls: ["./key.component.scss"],
  providers: [PopUpModalService],
})
export class KeyComponent implements OnInit {
  keys = new MatTableDataSource<KeyModel>();
  key: any = {};
  displayedColumns: string[] = ["name", "category", "edit", "delete", "toggle"];
  pageSize: Number = PaginationEnum.PageSize;
  totalRecords: number = 0;
  permission: Permission = new Permission();

  constructor(
    private keyService: KeyService,
    private route: ActivatedRoute,
    protected paginationService: PaginationService,
    private popUpModalService: PopUpModalService
  ) {
    this.permission = this.route.snapshot.data.response;
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getKeys();
  }

  getKeys() {
    this.keyService
      .getKeys(this.paginationService.getParams())
      .subscribe((result) => {
        this.keys.data = result.data.keys;
        this.totalRecords = result.data.totalRecords;
      });
  }

  openDialog(key?: KeyModel) {
    const keyData = key ? key : this.key;
    const html = `<h3 mat-dialog-title>${keyData._id ? "Edit" : "Add"} ${
      keyData.name || "New Key"
    }</h3>`;
    const yesButtonText = keyData._id ? "Edit" : "Add";
    const component = AddKeyComponent;
    this.popUpModalService
      .openDialog({ html, yesButtonText, component, response: keyData })
      .subscribe((result) => {
        if (result) {
          this.keyService.saveKey(result.response).subscribe((res) => {
            this.key = {};
            this.getKeys();
          });
        }
      });
  }

  onToggleEvent(key: KeyModel) {
    this.keyService.toggleKey(key._id).subscribe((res) => {
      this.getKeys();
    });
  }

  onActiveEvent(event) {
    this.paginationService.active = event.value;
    this.getKeys();
  }

  deleteKey(key: KeyModel) {
    const html = `<h3 mat-dialog-title>Are you sure want to delete <b>${key.name}</b> ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.keyService.deleteKey(key._id).subscribe((res) => {
            this.getKeys();
          });
        }
      });
  }

  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getKeys();
  }

  onSorting(event) {
    if (!event.direction) {
      return;
    }
    this.paginationService.setSortExpression(event);
    this.getKeys();
  }

  doFilter = (value: string) => {
    this.paginationService.query = value.trim().toLocaleLowerCase();
    this.getKeys();
  };

  onFilterReset() {
    this.paginationService.setDefaultPage();
    this.getKeys();
  }
}
