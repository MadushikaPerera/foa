import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {InventoryService} from '../../../services/inventory.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.css']
})
export class FoodDialogComponent implements OnInit {
  error:string;
  loading:boolean;
  mealname:string;
  type:string;
  price:number;
  quantity:number;
  description:string;

  constructor(public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private inventoryservice:InventoryService,public snackBar: MatSnackBar) {

  }

  public closeDialog(){
    this.dialogRef.close();
  }

  public addFoodItem(){
    console.log(this.mealname,this.type,this.price,this.quantity,this.description);
    
    this.loading = true;

    this.inventoryservice.addFoodItem(this.mealname,this.type,this.price,this.quantity,this.description)
    .subscribe(result => {
      if (result === true) {
        this.closeDialog();
        this.openSnackBar('Added Successfully','Success');
        
      } else {
        this.error = 'Email or Password is incorrect';
        this.loading = false;
        this.openSnackBar(this.error,'Error');
        
      }
    });
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
