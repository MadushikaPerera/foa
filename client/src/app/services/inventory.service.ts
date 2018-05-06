import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Food } from "../model/food";
import { Vehicle } from "../model/vehicle";
import { Ingredient } from "../model/ingredients";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class InventoryService {
  public foodlist: Food[];
  public vehiclelist: Vehicle[];

  dataChange: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);

  constructor(private http: HttpClient) {}

  addFoodItem(
    name: string,
    type: string,
    price: number,
    quantity: number,
    description: string
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/addfood", {
        name: name,
        type: type,
        price: price,
        quantity: quantity,
        description: description
      })
      .map((response: Food) => {
        // signup successful
        if (response) {
          console.log("food added", response);

          return true;
        }
        return false;
      });
  }

  getFoodItems(): Observable<Food[]> {
    console.log("calling food");
    return this.http.get(environment.host + "/getfooditems").map(response => {
      let foodlist = response as Food[];
      console.log(foodlist);
      return foodlist;
    });
  }

  deleteFoodItem(mid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/delfood", mid)
      .map((response: Food) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  addVehicleItem(
    brand: string,
    model: string,
    licenseno: string,
    dob: string,
    quantity: number
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/addvehicle", {
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      })
      .map((response: Vehicle) => {
        // signup successful
        console.log("Vehicle added", response);
        if (response) {
          return true;
        }
        return false;
      });
  }

  deleteVehicleItem(vid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/delvehicle", vid)
      .map((response: Food) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get(environment.host + "/getvehicles").map(response => {
      let vehiclelist = response as Vehicle[];
      console.log(vehiclelist);
      return vehiclelist;
    });
  }

  addIngredientItem(
    brand: string,
    model: string,
    licenseno: string,
    dob: string,
    quantity: number
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/addingredient", {
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      })
      .map((response: Ingredient) => {
        // signup successful
        console.log("Ingredients added", response);
        if (response) {
          return true;
        }
        return false;
      });
  }

  deleteIngredientItem(vid: string): Observable<boolean> {
    return this.http
      .put(environment.host + "/delingredient", vid)
      .map((response: Food) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  getIngredient(): Observable<Ingredient[]> {
    return this.http.get(environment.host + "/getingredients").map(response => {
      let vehiclelist = response as Ingredient[];
      console.log(vehiclelist);
      return vehiclelist;
    });
  }
}
