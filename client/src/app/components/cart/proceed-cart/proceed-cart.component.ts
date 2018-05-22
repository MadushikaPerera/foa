import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { OderService } from "../../../services/oder.service";

@Component({
  selector: "app-proceed-cart",
  templateUrl: "./proceed-cart.component.html",
  styleUrls: ["./proceed-cart.component.css"]
})
export class ProceedCartComponent implements OnInit {
  address: string;
  contact: string;
  payment: string;
  cardno: string;
  items: any;
  payments = [
    { value: "Credit Card / Debit card" },
    { value: "Cash on Delivery" },
    { value: "Dialog Ezy Cash" },
    { value: "Fixmi" }
  ];

  pay() {
    return this.payment == "Credit Card / Debit card";
  }

  constructor(
    private userservice: UserService,
    private oderservice: OderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.oderservice.currentcheckout.subscribe(items => (this.items = items));
    console.log(this.items);

    this.userservice.getuser().subscribe(result => {
      if (result) {
        this.address = result[0].address;
        this.contact = result[0].phone;
      }
    });
  }

  shop() {
    this.router.navigate(["/restaurant"]);
  }
}
