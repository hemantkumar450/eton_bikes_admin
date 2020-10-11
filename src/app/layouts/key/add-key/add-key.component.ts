import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-key-brand",
  templateUrl: "./add-key.component.html",
  styleUrls: ["./add-key.component.scss"],
})
export class AddKeyComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  categories = ["geometry", "component", "build_spec", "feature"];

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close();
  }
}
