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

  categories = ["geometry", "component", "build_spec", "key_feature"];
  orders = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
  ];

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close();
  }
}
