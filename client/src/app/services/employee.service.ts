import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Driver } from "../model/driver";

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployee(
    name: string,
    type: string,
    price: number,
    quantity: number,
    description: string
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/addemployee", {
        name: name,
        type: type,
        price: price,
        quantity: quantity,
        description: description
      })
      .map((response: Driver) => {
        // signup successful
        if (response) {
          console.log("food added", response);

          return true;
        }
        return false;
      });
  }

  getEmployees(): Observable<Driver[]> {
    console.log("calling food");
    return this.http.get(environment.host + "/getemployees").map(response => {
      let foodlist = response as Driver[];
      console.log(foodlist);
      return foodlist;
    });
  }

  deleteEmployee(mid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/delemployee", mid)
      .map((response: Driver) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }
}
