import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { CartService } from "../../../services/cart.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-addtocart",
  templateUrl: "./addtocart.component.html",
  styleUrls: ["./addtocart.component.css"]
})
export class AddtocartComponent implements OnInit {
  @Input() name: string;
  @Input() mid: number;
  @Input() quantity: number;
  req: number;
  error: string;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddtocartComponent>,
    private cartservice: CartService,
    public snackBar: MatSnackBar
  ) {}

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
    // this.cartservice.addItemToCart().subscribe(result => {
    //   if (result === true) {
    //     this.closeDialog();
    //     this.openSnackBar("Added To Cart Successfully", "Success");
    //   } else {
    //     this.error = "Not Added";
    //     this.loading = false;
    //     this.openSnackBar(this.error, "Error");
    //   }
    // });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
