import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatSnackBar
} from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { Cart } from "../../model/cart";
import { CartService } from "../../services/cart.service";
import { OderService } from "../../services/oder.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import { MakeOrderComponent } from "./make-order/make-order.component";
import * as momentNs from "moment";

const moment = momentNs;

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  exampleDatabase: CartService | null;
  dataSource: CartDataSource | null;
  displayedColumns = [
    "cid",
    "item",
    "quantity",
    "price",
    "subtotal",
    "actions"
  ];
  index: number;
  id: number;
  subtotal: number;
  total: number;
  promo: number;
  address: string;
  contact: string;
  payment: string;
  items: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
    private cartservice: CartService,
    private orderservice: OderService,
    public httpClient: HttpClient
  ) {
    this.subtotal = 0;
    this.total = 0;
    this.promo = 0;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter") filter: ElementRef;

  ngOnInit() {
    this.orderservice.currentcheckout.subscribe(items => (this.items = items));
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  getTotal() {
    return this.dataSource.filteredData.reduce(
      (summ, v) => (summ += v.price),
      0
    );
  }

  getItemsToCheckOut() {
    return this.dataSource.filteredData.map(item => ({
      cid: item.cid,
      item: item.item,
      quantity: item.quantity
    }));
  }

  startEdit(
    i: number,
    cid: number,
    item: string,
    quantity: number,
    price: number
  ) {
    this.id = cid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditItemComponent, {
      data: { cid: cid, item: item, quantity: quantity, price: price }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(dialogRef.componentInstance.data);

      if (result === 1) {
        console.log(this.id);
        delete this.exampleDatabase.dataChange.value[0];
        console.log(this.exampleDatabase.dataChange.value);

        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.cid === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.cartservice.getCartDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(
    i: number,
    cid: number,
    item: string,
    quantity: number,
    price: number
  ) {
    this.index = i;
    this.id = cid;
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: { cid: cid, item: item, quantity: quantity, price: price }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.cid === this.id
        );
        // // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = "";
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new CartService(this.httpClient);
    this.dataSource = new CartDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    Observable.fromEvent(this.filter.nativeElement, "keyup")
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  shop() {
    this.router.navigate(["/restaurant"]);
  }

  checkout() {
    this.orderservice.changecheckout({
      items: this.getItemsToCheckOut(),
      total: this.getTotal()
    });
    this.router.navigate(["/checkout"]);
  }

  checkoutDialog(address: string, contact: string, payment: string) {
    const dialogRef = this.dialog.open(MakeOrderComponent, {
      data: { address: address, contact: contact, payment: payment }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(address, contact, payment);
      if (result === 1) {
        console.log(this.dialog);
      }
    });
  }

  checkouts() {
    console.log(JSON.stringify(this.getItemsToCheckOut()).toString());
    this.orderservice
      .makeOrder(
        JSON.stringify(this.getItemsToCheckOut()),
        this.getTotal(),
        localStorage.getItem("uname"),
        this.address,
        this.contact,
        this.payment,
        moment().format("MMM Do YY")
      )
      .subscribe(result => {
        if (result === true) {
          console.log("added");

          // this.closeDialog();
          // this.openSnackBar('Added Successfully','Success');
        } else {
          console.log("error");

          // this.error = 'Email or Password is incorrect';
          // this.loading = false;
          // this.openSnackBar(this.error,'Error');
        }
      });
  }
}

export class CartDataSource extends DataSource<Cart> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Cart[] = [];
  renderedData: Cart[] = [];

  constructor(
    public _exampleDatabase: CartService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Cart[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllCartItems();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      console.log("filter", this._exampleDatabase.cartData);

      this.filteredData = this._exampleDatabase.cartData
        .slice()
        .filter((cart: Cart) => {
          console.log("filtering", cart.cid);

          const searchStr = (
            cart.cid +
            cart.item +
            cart.quantity +
            cart.price
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this._paginator.pageSize
      );
      return this.renderedData;
    });
  }
  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Cart[]): Cart[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.cid, b.cid];
          break;
        case "name":
          [propertyA, propertyB] = [a.item, b.item];
          break;
        case "quantity":
          [propertyA, propertyB] = [a.quantity, b.quantity];
          break;
        case "price":
          [propertyA, propertyB] = [a.price, b.price];
          break;
        case "subtotal":
          [propertyA, propertyB] = [a.price, b.price];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
