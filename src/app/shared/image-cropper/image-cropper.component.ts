// import { LyTheme2, Platform } from "@alyle/ui";
// import {
//   ImgCropperConfig,
//   ImgCropperEvent,
//   LyResizingCroppingImages,
// } from "@alyle/ui/resizing-cropping-images";
// import {
//   ChangeDetectionStrategy,
//   Component,
//   ViewChild,
//   ElementRef,
//   Input,
//   Output,
//   EventEmitter,
// } from "@angular/core";
// import { styles } from "./image-cropper.style";
// import { HttpClient, HttpRequest } from "@angular/common/http";
// import { Image } from "app/models/variant";
// import { AlertService } from "../alert/alert.service";

// @Component({
//   selector: "app-image-cropper",
//   templateUrl: "./image-cropper.component.html",
//   styleUrls: ["./image-cropper.component.scss"],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ImageCropperComponent {
//   classes = this.theme.addStyleSheet(styles);
//   data: any;
//   croppedImg: string;
//   @ViewChild(LyResizingCroppingImages, { static: true })
//   imgCropper: LyResizingCroppingImages;
//   scale: number;
//   myConfig: ImgCropperConfig = {
//     width: 130,
//     height: 150,
//     fill: "#ff2997",
//     extraZoomOut: true,
//     output: {
//       width: 800,
//       height: 500,
//     },
//   };
//   @Input() param: Image;
//   @Input() target = "https://file.io";
//   @Input() accept = "image/*";
//   @ViewChild("_fileInput", { static: false }) _fileInput: ElementRef;
//   @ViewChild("cropping", { static: false }) cropping: ElementRef;
//   @Output() complete = new EventEmitter<string>();

//   constructor(
//     private theme: LyTheme2,
//     private _http: HttpClient,
//     private alertService: AlertService
//   ) {}

//   /** on event */
//   onCrop(e: ImgCropperEvent) {
//     this.data = e;
//     this.croppedImg = e.dataURL;
//   }

//   /** manual crop */
//   getCroppedImg() {
//     const img = this.imgCropper.crop();
//     return img.dataURL;
//   }

//   uploadFile() {
//     if (!this.croppedImg) {
//       this.alertService.error("Crop the image first");
//     }
//     const fd = new FormData();
//     this.param.file = this.data;
//     var blob = this.dataURItoBlob(this.croppedImg);
//     fd.append("file", blob);
//     // fd.append("cateory", this.param.category);
//     fd.append("fileType", this.param.fileType);
//     fd.append("belongs_to", this.param.belongsTo);
//     // fd.append("id", this.param.id);

//     const req = new HttpRequest("POST", this.target, fd, {
//       reportProgress: true,
//     });
//     this._http.request(req).subscribe((event: any) => {
//       if (typeof event === "object") {
//         this._fileInput.nativeElement.value = "";
//         this.croppedImg = null;
//         this.cropping.nativeElement = null;
//         this.complete.emit(event.body);
//       }
//     });
//   }

//   dataURItoBlob(dataURI) {
//     // convert base64 to raw binary data held in a string
//     // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
//     var byteString = atob(dataURI.split(",")[1]);
//     // separate out the mime component
//     var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//     // write the bytes of the string to an ArrayBuffer
//     var ab = new ArrayBuffer(byteString.length);
//     var ia = new Uint8Array(ab);
//     for (var i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ia], { type: mimeString });
//   }
// }

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import {
  HttpClient,
  HttpResponse,
  HttpRequest,
  HttpEventType,
  HttpErrorResponse,
} from "@angular/common/http";
import { Subscription } from "rxjs/Subscription";
import { of } from "rxjs/observable/of";
import { catchError, last, map, tap } from "rxjs/operators";
// import { Image } from "../../models/variant";

@Component({
  selector: "app-image-cropper",
  templateUrl: "./image-cropper.component.html",
  styleUrls: ["./image-cropper.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 100 })),
      transition("* => void", [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class ImageCropperComponent implements OnInit {
  /** Link text */
  @Input() text = "Upload";
  @Input() multiple = true;
  /** Name used in form which will be sent in HTTP request. */
  @Input() param: any;
  /** Target URL for file uploading. */
  @Input() target = "https://file.io";
  /** File extension that accepted, same as 'accept' of <input type="file" />. 
      By the default, it's set to 'image/*'. */
  @Input() accept = "image/*";
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  constructor(private _http: HttpClient) {}

  ngOnInit() {}

  /** TODO
   * will change this function with onChange event
   */
  onFileUpload() {
    const fileUpload = document.getElementById(
      "fileUpload"
    ) as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file,
          state: "in",
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true,
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    this.param.file = file.data;
    fd.append("file", this.param.file);
    // fd.append("category", this.param.category);
    fd.append("fileType", this.param.fileType);
    fd.append("belongs_to", this.param.belongsTo);

    const req = new HttpRequest("POST", this.target, fd, {
      reportProgress: true,
    });

    file.inProgress = true;
    file.sub = this._http
      .request(req)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        tap((message) => {}),
        last(),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          file.canRetry = true;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === "object") {
          this.removeFileFromArray(file);
          this.complete.emit(event.body);
        }
      });
  }

  private uploadFiles() {
    const fileUpload = document.getElementById(
      "fileUpload"
    ) as HTMLInputElement;
    fileUpload.value = "";

    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
