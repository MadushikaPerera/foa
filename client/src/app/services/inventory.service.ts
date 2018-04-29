import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import {Food} from '../model/food';
import {Vehicle} from '../model/vehicle';

@Injectable()
export class InventoryService {

  constructor(private http: HttpClient) { }

  addFoodItem( 
    name:string,
    type:string,
    price:number,
    quantity:number,
    description:string): Observable<boolean> {
    return this.http
    .post(environment.host + '/addfood', {
      type : type,
      price : price,
      quantity : quantity,
      description : description})
    .map((response: Food) => {
      // signup successful
      if (response) {
        return true;
      }
      return false;
    });
  }

  // getFoodItems(): Observable<Food[]> {
  //   // return this.http.get(environment.host + '/getfooditems').map((response: Response)=>{
  //   //   return <Food>response.json();
  //   // }).catch(this.handleError);
  // }

  deleteFoodItem(mid:string): Observable<boolean> {
    return this.http
    .put(environment.host + '/delfood', mid)
    .map((response: Food) => {
      // signup successful
      if (response) {
        return true;
      }
      return false;
    });
  }

  addVehicleItem(
    brand:string,
    model:string,
    licenseno:string,
    dob:string): Observable<boolean> {
    return this.http
    .post(environment.host + '/addvehicle', {
      brand : brand,
      model : model,
      licenseno : licenseno,
      dob : dob})
    .map((response: Vehicle) => {
      // signup successful
      if (response) {
        return true;
      }
      return false;
    });
  }

  deleteVehicleItem(vid:string): Observable<boolean> {
    return this.http
    .put(environment.host + '/delvehicle', vid)
    .map((response: Food) => {
      // signup successful
      if (response) {
        return true;
      }
      return false;
    });
  }

}
