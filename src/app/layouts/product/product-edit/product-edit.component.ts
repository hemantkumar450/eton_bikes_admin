import { Component, OnInit, Input } from "@angular/core";
import { Options } from "ng5-slider";
import { Product } from "app/models/product.model";
import { PopUpModalService } from "app/services/pop-up.service";
import { ProductService } from "app/services/product.service";
import { Router } from "@angular/router";
import { AlertService } from "app/shared/alert/alert.service";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"],
})
export class ProductEditComponent implements OnInit {
  @Input() product: Product;
  @Input() shouldView: boolean = true;

  constructor(
    private popUpModalService: PopUpModalService,
    private router: Router,
    private alertService: AlertService,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  ngOnChanges() {}

  onEdit() {
    this.router.navigate([`/product/edit/${this.product._id}`]);
  }

  onView() {
    this.router.navigate([`/product/view/${this.product._id}`]);
  }

  onSubmit(object) {
    this.productService.saveProduct(object).subscribe((result) => {
      this.cancel();
    });
  }

  cancel() {
    this.router.navigate(["/product"]);
  }
}
