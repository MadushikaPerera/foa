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

@Injectable()
export class CartService {
  constructor(public http: HttpClient) {}

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

  deleteItemFromCart(cid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/deletecartitem", { cid: cid })
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
}
