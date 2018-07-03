import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-flight-dialog',
  templateUrl: './add-flight-dialog.component.html',
  styleUrls: ['./add-flight-dialog.component.scss']
})
export class AddFlightDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddFlightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
