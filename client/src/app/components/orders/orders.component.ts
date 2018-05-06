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

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  displayedColumns = ["order"];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  shop() {
    this.router.navigate(["/restaurant"]);
  }
}

export interface Element {
  ordnumber: number;
  custno: number;
  custname: string;
  price: number;
  status: string;
}

const ELEMENT_DATA: Element[] = [
  {
    ordnumber: 1,
    custno: 100,
    custname: "Hydrogen",
    price: 1.0079,
    status: "H"
  },
  {
    ordnumber: 2,
    custno: 100,
    custname: "Helium",
    price: 4.0026,
    status: "He"
  },
  {
    ordnumber: 3,
    custno: 100,
    custname: "Lithium",
    price: 6.941,
    status: "Li"
  },
  {
    ordnumber: 4,
    custno: 100,
    custname: "Beryllium",
    price: 9.0122,
    status: "Be"
  },
  { ordnumber: 5, custno: 100, custname: "Boron", price: 10.811, status: "B" },
  {
    ordnumber: 6,
    custno: 100,
    custname: "Carbon",
    price: 12.0107,
    status: "C"
  },
  {
    ordnumber: 7,
    custno: 100,
    custname: "Nitrogen",
    price: 14.0067,
    status: "N"
  },
  {
    ordnumber: 8,
    custno: 100,
    custname: "Oxygen",
    price: 15.9994,
    status: "O"
  },
  {
    ordnumber: 9,
    custno: 100,
    custname: "Fluorine",
    price: 18.9984,
    status: "F"
  },
  {
    ordnumber: 10,
    custno: 100,
    custname: "Neon",
    price: 20.1797,
    status: "Ne"
  },
  {
    ordnumber: 11,
    custno: 100,
    custname: "Sodium",
    price: 22.9897,
    status: "Na"
  },
  {
    ordnumber: 12,
    custno: 100,
    custname: "Magnesium",
    price: 24.305,
    status: "Mg"
  },
  {
    ordnumber: 13,
    custno: 100,
    custname: "Aluminum",
    price: 26.9815,
    status: "Al"
  },
  {
    ordnumber: 14,
    custno: 100,
    custname: "Silicon",
    price: 28.0855,
    status: "Si"
  },
  {
    ordnumber: 15,
    custno: 100,
    custname: "Phosphorus",
    price: 30.9738,
    status: "P"
  },
  {
    ordnumber: 16,
    custno: 100,
    custname: "Sulfur",
    price: 32.065,
    status: "S"
  },
  {
    ordnumber: 17,
    custno: 100,
    custname: "Chlorine",
    price: 35.453,
    status: "Cl"
  },
  {
    ordnumber: 18,
    custno: 100,
    custname: "Argon",
    price: 39.948,
    status: "Ar"
  },
  {
    ordnumber: 19,
    custno: 100,
    custname: "Potassium",
    price: 39.0983,
    status: "K"
  },
  {
    ordnumber: 20,
    custno: 100,
    custname: "Calcium",
    price: 40.078,
    status: "Ca"
  }
];
