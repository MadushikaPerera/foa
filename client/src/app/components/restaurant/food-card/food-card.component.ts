import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AddtocartComponent } from "../../cart/addtocart/addtocart.component";

@Component({
  selector: "app-food-card",
  templateUrl: "./food-card.component.html",
  styleUrls: ["./food-card.component.css"]
})
export class FoodCardComponent implements OnInit {
  @Input() title: string;
  @Input() price: number;
  @Input() mid: number;
  @Input() quantity: number;

  constructor(public dialog: MatDialog) {
    this.title = "";
  }

  ngOnInit() {}

  addtocart(): void {
    let dialogRef = this.dialog.open(AddtocartComponent, {
      data: {
        name: this.title,
        mid: this.mid,
        price: this.price,
        quantity: this.quantity
      },
      width: "750px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
