import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-make-order",
  templateUrl: "./make-order.component.html",
  styleUrls: ["./make-order.component.css"]
})
export class MakeOrderComponent implements OnInit {
  address: string;
  contact: string;
  payment: string;

  payments = [
    { value: "Credit Card / Debit card" },
    { value: "Cash on Delivery" },
    { value: "Dialog Ezy Cash" },
    { value: "Fixmi" }
  ];
  constructor(
    private userservice: UserService,
    public dialogRef: MatDialogRef<MakeOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.userservice.getuser().subscribe(result => {
      if (result) {
        this.address = result[0].address;
        this.contact = result[0].phone;
      }
    });
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  checkout() {
    console.log(this.address, this.contact, this.payment);
    this.dialogRef.close();
  }
}
