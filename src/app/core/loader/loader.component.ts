import { Component, OnInit, TemplateRef } from "@angular/core";
import { LoaderService } from "./loader.service";
import { ngxLoadingAnimationTypes } from "ngx-loading";

const PrimaryRed = "#dd0031";
const SecondaryBlue = "#006ddd";

@Component({
  selector: "app-loading",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  loading: boolean;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  public loadingTemplate: TemplateRef<any>;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit() {}
}
