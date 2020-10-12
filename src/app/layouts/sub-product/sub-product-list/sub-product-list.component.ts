import { Component, OnInit } from "@angular/core";
import { SubProduct } from "app/models/sub-product.model";
import { SubProductService } from "app/services/sub-product.service";
import {
  PaginationService,
  PaginationEnum,
} from "app/utilities/paginator.service";

import { Router, ActivatedRoute } from "@angular/router";
import { Permission } from "app/models/common.model";
import { PopUpModalService } from "app/services/pop-up.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-sub-product-list",
  templateUrl: "./sub-product-list.component.html",
  styleUrls: ["./sub-product-list.component.scss"],
  providers: [PopUpModalService],
})
export class SubProductListComponent implements OnInit {
  displayedColumns: string[] = ["name", "description", "edit", "changeStatus"];
  subProducts = new MatTableDataSource<SubProduct>();
  pageSize: Number = PaginationEnum.PageSize;
  totalRecords: number = 10;
  permission: Permission = new Permission();

  constructor(
    private subProductService: SubProductService,
    private paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    public popUpModalService: PopUpModalService
  ) {
    this.permission = this.route.snapshot.data.response;
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getSubProducts();
  }

  getSubProducts() {
    this.subProductService
      .getSubProducts(this.paginationService.getParams())
      .subscribe((result) => {
        this.subProducts.data = result.data.subProducts;
        this.totalRecords = result.data.totalRecords;
      });
  }

  onEditProduct(subProduct?: SubProduct) {
    const route = subProduct
      ? `/sub-product/edit/${subProduct._id}`
      : `/sub-product/add`;
    this.router.navigate([route]);
  }

  onViewProduct(subProduct?: SubProduct) {
    const route = `/sub-product/view/${subProduct._id}`;
    this.router.navigate([route]);
  }

  deleteSubProduct(subProductId: string) {
    const html = `<h3 mat-dialog-title>Are you sure want to delete this sub product ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.subProductService
            .deleteSubProduct(subProductId)
            .subscribe((res) => {
              this.getSubProducts();
            });
        }
      });
  }

  statusChange(subProduct: SubProduct) {
    const html = `<h3 mat-dialog-title>Are you sure want to change status of <b>${subProduct._id}</b> ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.onStatusChanged(subProduct);
        }
      });
  }

  onStatusChanged(subProduct) {
    const should_list = subProduct.should_list === "LISTED" ? false : true;
    // this.productService
    //   .changeStatusProduct(product._id, should_list)
    //   .subscribe(() => {
    //     this.getSubProducts();
    //   });
  }

  /** to do
   * pagination, sorting & filtering will be implemented soon
   */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getSubProducts();
  }

  onSorting(event) {
    if (!event.direction) {
      return;
    }
    this.paginationService.setSortExpression(event);
    this.getSubProducts();
  }

  doFilter(value) {
    this.paginationService.query = value.trim().toLocaleLowerCase();
    this.getSubProducts();
  }
}
