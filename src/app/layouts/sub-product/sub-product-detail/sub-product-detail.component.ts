import { Component, OnInit, Input, ViewChild } from "@angular/core";
// import { KeyValueModel, Product } from "app/models/product.model";
import { forkJoin } from "rxjs";
import { AlertService } from "app/shared/alert/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SubProductService } from "app/services/sub-product.service";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { environment } from "environments/environment";
import { SubProduct } from "app/models/sub-product.model";
import { KeyValueModel, Product } from "app/models/product.model";
import { ProductService } from "app/services/product.service";

export class DisplayMedia {
  category: string;
  url: string;
}

@Component({
  selector: "app-sub-product-detail",
  templateUrl: "./sub-product-detail.component.html",
  styleUrls: ["./sub-product-detail.component.scss"],
})
export class SubProductDetailComponent implements OnInit {
  subProduct: SubProduct = new SubProduct();
  targetUrl: string = `${environment.baseUrl}admin/fileUploader`;
  products: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subProductService: SubProductService,
    private productService: ProductService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {
    this.subProduct._id = this.route.snapshot.params.id || undefined;
    if (this.subProduct._id) {
      this.getSubProductById();
    }
  }

  ngOnInit() {
    forkJoin([this.productService.getProducts({ dropdown: 1 })]).subscribe(
      ([products]) => {
        this.products = products.data;
      }
    );
  }

  getSubProductById() {
    this.subProductService
      .getSubProductById(this.subProduct._id)
      .subscribe((res) => {
        this.subProduct = res.data;
      });
  }

  onFileComplete(event, type) {
    if (type == "icon") {
      this.subProduct.detail.icon = event.data;
    } else if (type == "media") {
      this.subProduct.detail.media = event.data;
    }
  }

  deleteImage(type) {
    if (type == "icon") {
      this.subProduct.detail.icon = null;
    } else if (type == "media") {
      this.subProduct.detail.media = null;
    }
  }

  // addBuildSpec() {
  //   this.subProduct.build_specs.splice(
  //     this.subProduct.build_specs.length,
  //     0,
  //     new KeyValueModel()
  //   );
  // }

  // deleteSpec(index) {
  //   this.subProduct.build_specs.splice(index, 1);
  // }

  onSubmit() {
    const object = Object.assign(this.subProduct);
    object.detail.media =
      this.subProduct.detail.media && this.subProduct.detail.media._id;
    object.detail.icon =
      this.subProduct.detail.icon && this.subProduct.detail.icon._id;

    this.subProductService.saveSubProduct(object).subscribe((res) => {
      this.alertService.success("Record Saved");
      this.cancel();
    });
  }

  cancel() {
    this.router.navigate(["/sub-product"]);
  }
}
