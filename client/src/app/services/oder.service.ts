import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Order } from "../model/order";

@Injectable()
export class OderService {
  constructor(private http: HttpClient) {}

  makeOrder(
    items: string,
    totalprice: number,
    user: string,
    address: string,
    contact: string,
    payment: string,
    dob: string
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/makeorder", {
        items: items,
        totalprice: totalprice,
        user: user,
        address: address,
        contact: contact,
        payment: payment,
        dob: dob
      })
      .map((response: Order) => {
        if (response) {
          return true;
        }
        return false;
      });
  }

  deleteOrder(oid: number): Observable<boolean> {
    return this.http
      .put(environment.host + "/cancelorder", { oid: oid })
      .map((response: Order) => {
        if (response) {
          return true;
        }
        return false;
      });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(environment.host + "/getorders").map(response => {
      let orderlist = response as Order[];
      console.log(orderlist);
      return orderlist;
    });
  }
}
