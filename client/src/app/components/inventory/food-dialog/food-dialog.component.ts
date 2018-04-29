import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.css']
})
export class FoodDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  public closeDialog(){
    this.dialogRef.close();
  }

  public addFoodItem(){
    alert('saved');
  }

  ngOnInit() {
  }

}
