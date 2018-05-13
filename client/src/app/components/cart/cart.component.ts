import { Component, OnInit } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatSnackBar
} from "@angular/material";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  displayedColumns = ["item", "quantity", "unit", "subtotal"];
  dataSource = CART_DATA;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private cartservice: CartService
  ) {}

  ngOnInit() {
    let cart = this;
    this.cartservice.getCartItems().subscribe(res => {
      console.log(res);
    });
  }

  shop() {
    this.router.navigate(["/restaurant"]);
  }

  checkout() {}
}
export interface Cart {
  quantity: string;
  item: number;
  unit: number;
  subtotal: string;
}

const CART_DATA: Cart[] = [
  { item: 1, quantity: "Hydrogen", unit: 1.0079, subtotal: "H" },
  { item: 2, quantity: "Helium", unit: 4.0026, subtotal: "He" },
  { item: 3, quantity: "Lithium", unit: 6.941, subtotal: "Li" },
  { item: 4, quantity: "Beryllium", unit: 9.0122, subtotal: "Be" }
];
