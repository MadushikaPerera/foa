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
    brand: string,
    model: string,
    licenseno: string,
    dob: string,
    quantity: number
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/makeorder", {
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      })
      .map((response: Order) => {
        if (response) {
          return true;
        }
        return false;
      });
  }

  deleteOrder(vid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/cancelorder", vid)
      .map((response: Order) => {
        if (response) {
          return true;
        }
        return false;
      });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(environment.host + "/getorders").map(response => {
      let vehiclelist = response as Order[];
      console.log(vehiclelist);
      return vehiclelist;
    });
  }
}
