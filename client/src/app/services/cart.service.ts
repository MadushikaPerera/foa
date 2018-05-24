import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Cart } from "../model/cart";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as momentNs from "moment";

const moment = momentNs;

@Injectable()
export class CartService {
  constructor(public http: HttpClient) {}

  public cartlist: Cart[];
  dataChange: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);
  dialogData: any;

  get cartData(): Cart[] {
    return this.dataChange.value;
  }

  getCartDialogData() {
    return this.dialogData;
  }

  updateCartItem(cart: Cart): void {
    this.dialogData = cart;
    this.editUserCartItem(
      cart.cid,
      cart.quantity,
      localStorage.getItem("uname"),
      moment().format("MMM Do YY")
    ).subscribe(result => {
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

  deleteCartItem(id: number): void {
    this.deleteItemFromCart(id).subscribe(result => {
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

  getAllCartItems(): void {
    this.http
      .get<Cart[]>(environment.host + "/getcartitems", {
        params: new HttpParams().set("uname", localStorage.getItem("uname"))
      })
      .subscribe(
        data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }

  addItemToCart(
    item: string,
    quantity: number,
    price: number,
    user: string,
    status: string,
    dob: string
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/addtocart", {
        item: item,
        quantity: quantity,
        price: price,
        status: status,
        user: user,
        dob: dob
      })
      .map((response: Cart) => {
        if (response) {
          return true;
        }
        return false;
      });
  }

  getCartItems(): Observable<Cart[]> {
    return this.http
      .get(environment.host + "/getcartitems", {
        params: new HttpParams().set("uname", localStorage.getItem("uname"))
      })
      .map(response => {
        let cartlist = response as Cart[];
        console.log(cartlist);
        return cartlist;
      });
  }

  deleteItemFromCart(cid: number): Observable<boolean> {
    return this.http
      .put(environment.host + "/deletecartitem", {
        cid: cid,
        uname: localStorage.getItem("uname")
      })
      .map((response: Cart) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  editCartItem(
    item: string,
    quantity: number,
    price: number,
    user: string,
    status: string,
    dob: string
  ): Observable<boolean> {
    return this.http
      .put(environment.host + "/editcartitem", {
        item: item,
        quantity: quantity,
        price: price,
        user: user,
        dob: dob
      })
      .map((response: Cart) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  editUserCartItem(
    cid: number,
    quantity: number,
    user: string,
    dob: string
  ): Observable<boolean> {
    return this.http
      .put(environment.host + "/editcartitem", {
        cid: cid,
        quantity: quantity,
        user: user,
        dob: dob
      })
      .map((response: Cart) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  checkoutCartItem(cid: [any]): Observable<boolean> {
    console.log(cid);

    return this.http
      .put(environment.host + "/checkoutcartitem", {
        cids: cid
      })
      .map((response: Cart) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }
}
