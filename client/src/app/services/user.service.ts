import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import {User} from '../model/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  
  signup(fname : string,
    lname : string,
    uname : string,
    email : string,
    address : string,
    phone : string,
    accesslevel : string,
    password : string): Observable<boolean> {
    return this.http
      .post(environment.host + '/signup', {fname : fname,
        lname : lname,
        uname : uname,
        email : email,
        address : address,
        phone : phone,
        accesslevel : accesslevel,
        password : password })
      .map((response: User) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  // getuser(uname : string): Observable<User[]> {
  //           // add authorization header with jwt token
  //           let headers = new Headers({ 'Authorization': localStorage.getItem('usertoken') });
  //           let options = new RequestOptions({ headers: headers });
  //  // return User;
  // }

}
