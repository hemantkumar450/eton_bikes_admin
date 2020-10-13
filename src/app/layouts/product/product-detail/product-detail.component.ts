import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { KeyValueModel, Product } from "app/models/product.model";
import { forkJoin } from "rxjs";
import { ConfirmationModalComponent } from "app/shared/confirmation-modal/confirmation-modal.component";
import { AlertService } from "app/shared/alert/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "app/services/product.service";

import { PopUpModalService } from "app/services/pop-up.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { environment } from "environments/environment";
import { FormControl } from "@angular/forms";
import { KeyService } from "app/services/key.service";

export class DisplayMedia {
  category: string;
  url: string;
}

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  features = [];
  feature: KeyValueModel = new KeyValueModel();
  displayMedia: DisplayMedia = new DisplayMedia();
  mediaCategories = ["youtube", "banner"];
  ckeConfig: any;
  shouldShowEditor: boolean;
  faqs: KeyValueModel = new KeyValueModel();
  component: KeyValueModel = new KeyValueModel();
  targetUrl: string = `${environment.baseUrl}admin/fileUploader`;
  mediaUrl: string = environment.mediaUrl;
  private dialogRef: MatDialogRef<ConfirmationModalComponent>;
  geometryKeyTabs = ["High", "Low", "Frame"];
  selectedGeoTab = new FormControl(0);
  selectedGeoKeyTab = new FormControl(0);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    public dialog: MatDialog,
    private keyService: KeyService,
    private alertService: AlertService
  ) {
    this.product._id = this.route.snapshot.params.id || undefined;
    if (this.product._id) {
      this.getProductById();
    }
  }

  ngOnInit() {
    forkJoin([this.keyService.getKeyByType("feature")]).subscribe(
      ([feature]) => {
        this.features = feature.data;
      }
    );
  }

  getProductById() {
    this.productService.getProductById(this.product._id).subscribe((res) => {
      this.product = res.data;
    });
  }

  /**
   * Add & Remove Features
   */

  addFeature() {
    if (!this.feature.key && !this.feature.value) {
      this.alertService.error("Both fields are mandatory");
      return;
    }
    this.product.features.splice(
      this.product.features.length,
      0,
      Object.assign(this.feature)
    );
    this.feature = new KeyValueModel();
  }

  deleteFeature(index) {
    this.product.features.splice(index, 1);
  }

  /**
   * Add & Remove Media Urls
   */

  addDisplayMedia() {
    if (!this.displayMedia.category && !this.displayMedia.url) {
      this.alertService.error("Both fields are mandatory");
      return;
    }
    this.product.media_urls.splice(
      this.product.media_urls.length,
      0,
      Object.assign(this.displayMedia)
    );
    this.displayMedia = new DisplayMedia();
  }

  deleteDisplayMedia(index) {
    this.product.media_urls.splice(index, 1);
  }

  /**
   * Add & Remove tech Support FAQS
   */
  addFaqs() {
    if (!this.faqs.key && !this.faqs.value) {
      this.alertService.error("Both fields are mandatory");
      return;
    }
    this.product.tech_support.faqs.splice(
      this.product.tech_support.faqs.length,
      0,
      Object.assign(this.faqs)
    );
    this.faqs = new KeyValueModel();
  }

  deleteFaqs(index) {
    this.product.tech_support.faqs.splice(index, 1);
  }

  /**
   * Add & Remove tech Support Components
   */
  addComponent() {
    if (!this.component.key && !this.component.value) {
      this.alertService.error("Both fields are mandatory");
      return;
    }
    this.product.tech_support.components.splice(
      this.product.tech_support.components.length,
      0,
      Object.assign(this.component)
    );
    this.component = new KeyValueModel();
  }

  deleteComponent(index) {
    this.product.tech_support.components.splice(index, 1);
  }

  selectedTabChange(event) {
    this.shouldShowEditor = false;
    if (event.index === 2) {
      this.shouldShowEditor = true;
    }
  }

  onFileComplete(event, type) {
    if (type == "close_up") {
      this.product.close_up_media.push(event.data);
    } else if (type == "long_shot") {
      this.product.long_shot_media.push(event.data);
    }
  }

  deleteImage(index, type) {
    if (type == "close_up") {
      this.product.close_up_media.splice(index, 1);
    } else if (type == "long_shot") {
      this.product.long_shot_media.splice(index, 1);
    }
  }

  onSubmit() {
    const productObject = this.product;
    productObject.long_shot_media = productObject.long_shot_media.map(
      (media) => media._id
    );
    productObject.close_up_media = productObject.close_up_media.map(
      (media) => media._id
    );
    this.productService.saveProduct(productObject).subscribe((res) => {
      this.alertService.success("Record Saved");
      this.cancel();
    });
  }

  cancel() {
    this.router.navigate(["/product"]);
  }

  // addTab(selectAfterAdding) {
  //   this.geometryKeyTabs.push(selectAfterAdding._control.value);

  //   if (selectAfterAdding) {
  //     this.selected.setValue(this.geometryKeyTabs.length - 1);
  //   }
  // }

  // removeTab(index: number) {
  //   this.geometryTabs.splice(index, 1);
  // }
}
