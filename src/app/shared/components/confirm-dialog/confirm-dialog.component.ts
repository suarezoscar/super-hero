import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/core/models/confirm-dialog.interface';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  title: string = '';
  content: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialog
  ) {
    this.title = data.title;
    this.content = data.content;
  }

  closeDialog(perfomAction: boolean) {
    this.dialogRef.close(perfomAction);
  }
}
