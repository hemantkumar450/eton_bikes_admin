import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirmation-modal",
  templateUrl: "./confirmation-modal.component.html",
  styleUrls: ["./confirmation-modal.component.scss"]
})
export class ConfirmationModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close();
  }

  onFileComplete(event) {
    this.dialogRef.close({ event: "close", data: event.data });
  }
}
