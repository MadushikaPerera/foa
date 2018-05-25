import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Order } from "../model/order";

@Injectable()
export class OderService {
  private checkoutSource = new BehaviorSubject<any>({});
  currentcheckout = this.checkoutSource.asObservable();

  constructor(private http: HttpClient) {}

  changecheckout(checkout: any) {
    this.checkoutSource.next(checkout);
  }

  makeOrder(
    items: [any],
    totalprice: number,
    user: string,
    address: string,
    contact: string,
    payment: string,
    dob: string,
    status: string
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/makeorder", {
        items: items,
        totalprice: totalprice,
        user: user,
        address: address,
        contact: contact,
        payment: payment,
        dob: dob,
        status: status
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
    return this.http.get(environment.host + "/getorders", {
      params: new HttpParams().set('uname', localStorage.getItem('uname'))
  }).map(response => {
      let orderlist = response as Order[];
      console.log(orderlist);
      return orderlist;
    });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get(environment.host + "/getallorders").map(response => {
      let orderlist = response as Order[];
      console.log(orderlist);
      return orderlist;
    });
  }
}
