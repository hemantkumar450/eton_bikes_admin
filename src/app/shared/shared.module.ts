import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";

// import { TreeModule } from "primeng/tree";
// import { ToastModule } from "primeng/toast";
// import { TableModule } from "primeng/table";
// import { DropdownModule } from "primeng/dropdown";
// import { ButtonModule } from "primeng/button";
import { LoaderInterceptor } from "app/core/loader/loader.interceptor";
import { TokenErrorInterceptor } from "app/utilities/http-token.interceptor";
import { HttpErrorInterceptor } from "app/utilities/http-error.interceptor";
import { AlertComponent } from "./alert/alert.component";
import { DigitOnlyDirective } from "./directives/digit-only.directive";
import { ConfirmationModalComponent } from "./confirmation-modal/confirmation-modal.component";
import { CommonGridComponent } from "./common-grid/common-grid.component";
import { CommonButtonComponent } from "./common-button/common-button.component";

import { CheckValueDirective } from "./directives/check-value.directive";
import { CKEditorModule } from "ng2-ckeditor";
import { DatePipe } from "@angular/common";
import { FileUploaderComponent } from "./file-uploader/file-uploader.component";

const sharedModule = [
  CKEditorModule,
  MatProgressSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  HttpClientModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatInputModule,
  MatDialogModule,
  MatTooltipModule,
  MatExpansionModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule,
  MatTabsModule,
  MatProgressBarModule,
  MatCheckboxModule,
  // TableModule,
  // DropdownModule,
  // ButtonModule,
  // ToastModule,
  // TreeModule,
];

const sharedComponents = [
  AlertComponent,
  DigitOnlyDirective,
  CheckValueDirective,
  ConfirmationModalComponent,
  CommonGridComponent,
  CommonButtonComponent,
  FileUploaderComponent,
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [CommonModule, ...sharedModule],
  exports: [...sharedModule, ...sharedComponents],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  entryComponents: [ConfirmationModalComponent],
})
export class SharedComponentModule {}
