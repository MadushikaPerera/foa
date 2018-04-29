import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FoodDialogComponent} from './food-dialog/food-dialog.component';
import {VehicleDialogComponent} from './vehicle-dialog/vehicle-dialog.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    
  }

  openFoodDialog(): void {
    let dialogRef = this.dialog.open(FoodDialogComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openVehicleDialog(): void {
    let dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
