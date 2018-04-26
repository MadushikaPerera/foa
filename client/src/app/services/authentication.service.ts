import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Auth } from '../model/auth';

@Injectable()
export class AuthenticationService {
  public token: string;
  constructor(private http: HttpClient) {
    // set token if saved in local storage
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(environment.host + '/signin', { email: email, password: password })
      .map((response: Auth) => {
        // login successful if there's a jwt token in the response
        if (response.token.length > 0) {
          // set token property
          // store uname and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('usertoken', response.token);
          localStorage.setItem('user', response.uname);
          // return true to indicate successful login
          return true;
        }
        // return false to indicate failed login
        // return false;
        return false;
      });
  }

  logout() {
    // remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('usertoken');
    localStorage.removeItem('user');
  }
}
