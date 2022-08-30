import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/data.model';

@Component({
  selector: 'app-addcard-dialog',
  templateUrl: './addcard-dialog.component.html',
  styleUrls: ['./addcard-dialog.component.scss'],
})
export class AddcardDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddcardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
