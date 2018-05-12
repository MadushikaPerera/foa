import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Deliver } from "../model/deliver";

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
      .map((response: Deliver) => {
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
      .put(environment.host + "/deldelivery", { vid: vid })
      .map((response: Deliver) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  getDeliveries(): Observable<Deliver[]> {
    return this.http.get(environment.host + "/getdeliveries").map(response => {
      let vehiclelist = response as Deliver[];
      console.log(vehiclelist);
      return vehiclelist;
    });
  }
}
