import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-common-button",
  templateUrl: "./common-button.component.html",
  styleUrls: ["./common-button.component.scss"]
})
export class CommonButtonComponent implements OnInit {
  @Input() text: string = "Add";
  @Input() icon: string = "note_add";
  @Input() shouldShow: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onClickEvent() {
    this.onClick.emit();
  }
}
