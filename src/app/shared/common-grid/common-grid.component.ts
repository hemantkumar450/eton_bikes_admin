import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-common-grid",
  templateUrl: "./common-grid.component.html",
  styleUrls: ["./common-grid.component.scss"],
})
export class CommonGridComponent implements OnInit {
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() pageSize: number = 10;
  @Input() length: number = 10;
  @Input() displayedColumns: any[] = [];
  @Input() isEdit: boolean = false;
  @Input() isView: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() isToggle: boolean = false;
  @Input() isStatusChange: boolean = false;
  @Input() isBrandFilter: boolean = false;
  @Input() isModelFilter: boolean = false;
  @Input() isActiveFiter: boolean = false;
  @Input() searchDisabled: boolean = false;

  @Output() onPageChanged = new EventEmitter<any>();
  @Output() onSorting = new EventEmitter<any>();
  @Output() doFiltering = new EventEmitter<any>();
  @Output() onStatusChange = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();
  @Output() onToggle = new EventEmitter<any>();
  @Output() onFilterReset = new EventEmitter<boolean>();
  @Output() onActive = new EventEmitter<Boolean>();

  options: any[] = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];
  modelId: string;
  brandId: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {}

  pageChangeEvent(event: any) {
    this.onPageChanged.emit(event);
  }

  sortChangeEvent(event: any) {
    this.onSorting.emit(event);
  }

  onStatusChangeEvent(element) {
    this.onStatusChange.emit(element);
  }

  onEditEvent(element) {
    this.onEdit.emit(element);
  }

  onViewEvent(element) {
    this.onView.emit(element);
  }

  onToggleEvent(element) {
    this.onToggle.emit(element);
  }

  onActiveFilter(event) {
    this.onActive.emit(event);
  }

  doFilterEvent(event) {
    this.doFiltering.emit(event);
  }

  onDeleteEvent(element) {
    this.onDelete.emit(element);
  }

  isObject(item) {
    return typeof item === "object" && !Array.isArray(item) && item !== null;
  }

  onFilterChanged() {
    this.brandId = null;
    this.modelId = null;
    this.onFilterReset.emit(true);
  }

  titleCase(item): string {
    if (item) {
      return item.split("_").join(" ").trim().toUpperCase();
    }
  }
}
