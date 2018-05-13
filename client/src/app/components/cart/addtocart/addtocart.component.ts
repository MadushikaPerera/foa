import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { CartService } from "../../../services/cart.service";
import { MatSnackBar } from "@angular/material";
import * as momentNs from "moment";

const moment = momentNs;

@Component({
  selector: "app-addtocart",
  templateUrl: "./addtocart.component.html",
  styleUrls: ["./addtocart.component.css"]
})
export class AddtocartComponent implements OnInit {
  name: string;
  mid: number;
  quantity: number;
  price: number;
  req: number;
  error: string;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddtocartComponent>,
    private cartservice: CartService,
    public snackBar: MatSnackBar
  ) {
    this.name = this.data.name;
    this.mid = this.data.mid;
    this.price = this.data.price;
    this.quantity = this.data.quantity;
  }

  foods = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 }
  ];
  ngOnInit() {}

  public closeDialog() {
    this.dialogRef.close();
  }

  addToCart() {
    this.cartservice
      .addItemToCart(
        this.name,
        this.req,
        this.price,
        localStorage.getItem("uname"),
        "pending",
        moment().format("MMM Do YY")
      )
      .subscribe(result => {
        if (result === true) {
          this.closeDialog();
          this.openSnackBar("Added To Cart Successfully", "Success");
        } else {
          this.error = "Not Added";
          this.loading = false;
          this.openSnackBar(this.error, "Error");
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
