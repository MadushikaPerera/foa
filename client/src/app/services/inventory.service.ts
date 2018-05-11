import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Food } from "../model/food";
import { Vehicle } from "../model/vehicle";
import { Ingredient } from "../model/ingredient";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class InventoryService {
  public foodlist: Food[];
  public vehiclelist: Vehicle[];

  dataChange: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);
  dataChange1: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  dataChange2: BehaviorSubject<Ingredient[]> = new BehaviorSubject<
    Ingredient[]
  >([]);

  dialogData: any;
  dialogData1: any;
  dialogData2: any;

  constructor(public http: HttpClient) {}

  get foodData(): Food[] {
    return this.dataChange.value;
  }

  getFoodDialogData() {
    return this.dialogData;
  }

  addFood(food: Food): void {
    this.dialogData = food;
    this.addFoodItem(
      food.name,
      food.type,
      food.price,
      food.quantity,
      food.description
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

  updateFood(food: Food): void {
    this.dialogData = food;
    this.editFoodItem(
      food.mid,
      food.name,
      food.type,
      food.price,
      food.quantity,
      food.description
    ).subscribe(result => {
      if (result === true) {
        console.log("edited");

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

  deleteFood(id: number): void {
    console.log(id);
    this.deleteFoodItem(id).subscribe(result => {
      if (result === true) {
        console.log("deleted");

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

  get vehicleData(): Vehicle[] {
    return this.dataChange1.value;
  }

  getVehicleDialogData() {
    return this.dialogData1;
  }

  addVehicle(vehicle: Vehicle): void {
    this.dialogData1 = vehicle;
    this.addVehicleItem(
      vehicle.brand,
      vehicle.model,
      vehicle.licenseno,
      vehicle.dob
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

  updateVehicle(vehicle: Vehicle): void {
    this.dialogData1 = vehicle;
    this.editVehicleItem(
      vehicle.vid,
      vehicle.brand,
      vehicle.model,
      vehicle.licenseno,
      vehicle.dob
    ).subscribe(result => {
      if (result === true) {
        console.log("edited");

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

  deleteVehicle(id: number): void {
    console.log(id);
    this.deleteVehicleItem(id).subscribe(result => {
      if (result === true) {
        console.log("deleted");

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

  get IngredientData(): Ingredient[] {
    return this.dataChange2.value;
  }

  getIngredientDialogData() {
    return this.dialogData2;
  }

  addIngredient(food: Food): void {
    this.dialogData2 = food;
    // this.addIngredient(
    //   food.name,
    //   food.type,
    //   food.price,
    //   food.quantity,
    //   food.description
    // ).subscribe(result => {
    //   if (result === true) {
    //     console.log("added");

    //     // this.closeDialog();
    //     // this.openSnackBar('Added Successfully','Success');
    //   } else {
    //     console.log("error");

    //     // this.error = 'Email or Password is incorrect';
    //     // this.loading = false;
    //     // this.openSnackBar(this.error,'Error');
    //   }
    // });
  }

  updateIngredient(food: Food): void {
    this.dialogData2 = food;
    // this.editIngredient(
    //   food.mid,
    //   food.name,
    //   food.type,
    //   food.price,
    //   food.quantity,
    //   food.description
    // ).subscribe(result => {
    //   if (result === true) {
    //     console.log("edited");

    //     // this.closeDialog();
    //     // this.openSnackBar('Added Successfully','Success');
    //   } else {
    //     console.log("error");

    //     // this.error = 'Email or Password is incorrect';
    //     // this.loading = false;
    //     // this.openSnackBar(this.error,'Error');
    //   }
    // });
  }

  deleteIngredient(iid: number): void {
    // this.deleteIngredient(iid).subscribe(result => {
    //   if (result === true) {
    //     console.log("deleted");
    //     // this.closeDialog();
    //     // this.openSnackBar('Added Successfully','Success');
    //   } else {
    //     console.log("error");
    //     // this.error = 'Email or Password is incorrect';
    //     // this.loading = false;
    //     // this.openSnackBar(this.error,'Error');
    //   }
    // });
  }

  getAllFoods(): void {
    this.http.get<Food[]>(environment.host + "/getfooditems").subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  getAllVehicles(): void {
    this.http.get<Vehicle[]>(environment.host + "/getvehicles").subscribe(
      data => {
        this.dataChange1.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  getAllIngredients(): void {
    this.http.get<Ingredient[]>(environment.host + "/getingredients").subscribe(
      data => {
        this.dataChange2.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

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
          return true;
        }
        return false;
      });
  }

  editFoodItem(
    mid: number,
    name: string,
    type: string,
    price: number,
    quantity: number,
    description: string
  ): Observable<boolean> {
    return this.http
      .put(environment.host + "/editfood", {
        mid: mid,
        name: name,
        type: type,
        price: price,
        quantity: quantity,
        description: description
      })
      .map((response: Food) => {
        // signup successful
        if (response) {
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

  deleteFoodItem(mid: number): Observable<boolean> {
    return this.http
      .put(environment.host + "/delfood", { mid: mid })
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
    dob: string
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

  editVehicleItem(
    vid: number,
    brand: string,
    model: string,
    licenseno: string,
    dob: string
  ): Observable<boolean> {
    return this.http
      .put(environment.host + "/editvehicle", {
        vid: vid,
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      })
      .map((response: Vehicle) => {
        // signup successful
        console.log("Vehicle Edited");
        if (response) {
          return true;
        }
        return false;
      });
  }

  deleteVehicleItem(vid: number): Observable<boolean> {
    return this.http
      .put(environment.host + "/delvehicle", { vid: vid })
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

  editIngredientItem(
    vid: number,
    brand: string,
    model: string,
    licenseno: string,
    dob: string
  ): Observable<boolean> {
    return this.http
      .put(environment.host + "/editingredient", {
        vid: vid,
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      })
      .map((response: Vehicle) => {
        // signup successful
        console.log("Vehicle Edited");
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
