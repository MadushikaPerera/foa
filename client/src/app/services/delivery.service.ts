import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Delivery } from "../model/delivery";

@Injectable()
export class DeliveryService {
  constructor(private http: HttpClient) {}

  addDelivery(
    brand: string,
    model: string,
    licenseno: string,
    dob: string,
    quantity: number
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/makedelivery", {
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      })
      .map((response: Delivery) => {
        // signup successful
        console.log("Ingredients added", response);
        if (response) {
          return true;
        }
        return false;
      });
  }

  deleteDelivery(vid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/deldelivery", vid)
      .map((response: Delivery) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get(environment.host + "/getdeliveries").map(response => {
      let vehiclelist = response as Delivery[];
      console.log(vehiclelist);
      return vehiclelist;
    });
  }
}
