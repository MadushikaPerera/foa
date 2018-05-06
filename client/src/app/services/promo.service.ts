import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Promo } from "../model/promo";

@Injectable()
export class PromoService {
  constructor(private http: HttpClient) {}

  addPromo(
    brand: string,
    model: string,
    licenseno: string,
    dob: string,
    quantity: number
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/addpromo", {
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      })
      .map((response: Promo) => {
        if (response) {
          return true;
        }
        return false;
      });
  }

  deletePromo(vid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/delpromo", vid)
      .map((response: Promo) => {
        if (response) {
          return true;
        }
        return false;
      });
  }

  getPromos(): Observable<Promo[]> {
    return this.http.get(environment.host + "/getpromos").map(response => {
      let vehiclelist = response as Promo[];
      console.log(vehiclelist);
      return vehiclelist;
    });
  }
}
