import { Component, OnInit } from "@angular/core";
import { Product } from "app/models/product.model";
import { ProductService } from "app/services/product.service";
import {
  PaginationService,
  PaginationEnum,
} from "app/utilities/paginator.service";

import { Router, ActivatedRoute } from "@angular/router";
import { Permission } from "app/models/common.model";
import { PopUpModalService } from "app/services/pop-up.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  providers: [PopUpModalService],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "slug",
    "title",
    "edit",
    "delete",
  ];
  products = new MatTableDataSource<Product>();
  pageSize: Number = PaginationEnum.PageSize;
  totalRecords: number = 10;
  permission: Permission = new Permission();

  constructor(
    private productService: ProductService,
    private paginationService: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    public popUpModalService: PopUpModalService
  ) {
    this.permission = this.route.snapshot.data.response;
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts(this.paginationService.getParams())
      .subscribe((result) => {
        this.products.data = result.data.products;
        this.totalRecords = result.data.totalRecords;
      });
  }

  onEditProduct(product?: Product) {
    const route = product ? `/product/edit/${product._id}` : `/product/add`;
    this.router.navigate([route]);
  }

  onViewProduct(product?: Product) {
    const route = `/product/view/${product._id}`;
    this.router.navigate([route]);
  }

  deleteProduct(product: Product) {
    const html = `<h3 mat-dialog-title>Are you sure want to delete this product ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.productService.deleteProduct(product._id).subscribe((res) => {
            this.getProducts();
          });
        }
      });
  }

  statusChange(product: Product) {
    const html = `<h3 mat-dialog-title>Are you sure want to change status of <b>${product._id}</b> ?</h3>`;
    this.popUpModalService
      .openDialog({ html, component: null })
      .subscribe((res) => {
        if (res) {
          this.onStatusChanged(product);
        }
      });
  }

  onStatusChanged(product) {
    const should_list = product.should_list === "LISTED" ? false : true;
    // this.productService
    //   .changeStatusProduct(product._id, should_list)
    //   .subscribe(() => {
    //     this.getProducts();
    //   });
  }

  onBrandChanged(event) {
    this.paginationService.brand = event.value;
    this.getProducts();
  }

  onModelChanged(event) {
    this.paginationService.model = event.value;
    this.getProducts();
  }

  onFilterReset() {
    this.paginationService.resetPagination();
    this.getProducts();
  }

  /** to do
   * pagination, sorting & filtering will be implemented soon
   */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getProducts();
  }

  onSorting(event) {
    if (!event.direction) {
      return;
    }
    this.paginationService.setSortExpression(event);
    this.getProducts();
  }

  doFilter(value) {
    this.paginationService.query = value.trim().toLocaleLowerCase();
    this.getProducts();
  }
}
