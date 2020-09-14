import { Injectable } from "@angular/core";
import { ConfirmationModalComponent } from "app/shared/confirmation-modal/confirmation-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { PopupModal } from "app/models/pop-up.model";

@Injectable({
  providedIn: "root"
})
export class PopUpModalService {
  constructor(public dialog: MatDialog) {}

  openDialog({
    html,
    noButtonText = "Cancel",
    yesButtonText = "Yes",
    width = "600px",
    component,
    response = null
  }): Observable<any> {
    if (!component) {
      component = ConfirmationModalComponent;
    }
    const dialogRef = this.dialog.open(component, {
      width: width,
      data: { html, yesButtonText, noButtonText, response },
    });

    return dialogRef.afterClosed();
  }
}
