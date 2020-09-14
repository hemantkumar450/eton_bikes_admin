import { Injectable, OnInit } from "@angular/core";
export enum PaginationEnum {
  PageSize = 10,
}

@Injectable({
  providedIn: "root",
})
export class PaginationService implements OnInit {
  sortBy = null;
  orderBy = null;
  filterValues = {};
  startPage = 1;
  query = null;
  model = null;
  brand = null;
  active = null;
  dropdown = null;
  pageSize = PaginationEnum.PageSize;

  constructor() {}

  ngOnInit() {}

  setDefaultPage() {
    this.startPage = 1;
    this.pageSize = PaginationEnum.PageSize;
    this.sortBy = null;
    this.orderBy = null;
    this.filterValues = [];
    this.query = null;
    this.model = null;
    this.brand = null;
    this.dropdown = null;
    this.active = null;
  }

  setDefaultForAllRow() {
    this.startPage = 1;
    this.pageSize = PaginationEnum.PageSize;
    this.sortBy = null;
    this.orderBy = null;
    this.filterValues = [];
    this.query = "all";
    this.model = null;
    this.brand = null;
  }

  resetPagination() {
    this.setDefaultPage();
  }

  setPageChange(event) {
    this.startPage = 1 + event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getParams() {
    let pagination = {
      limit: this.pageSize,
      page: this.startPage,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      query: this.query,
      modelId: this.model,
      brandId: this.brand,
      active: this.active,
      dropdown: this.dropdown,
    };
    Object.keys(pagination).forEach(
      (key) => pagination[key] == null && delete pagination[key]
    );
    if (typeof pagination.active == "boolean") {
      delete pagination["active"];
    }
    if (typeof pagination.dropdown == "boolean") {
      delete pagination["dropdown"];
    }
    return Object.assign(pagination, this.filterValues);
  }

  setSortExpression(event) {
    if (event) {
      this.sortBy = event.active;
      if (event.direction === "desc") {
        this.orderBy = "-1";
      } else {
        this.orderBy = "1";
      }
    }
  }
}
