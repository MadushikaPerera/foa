import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {UserService} from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    fname:string;
    lname : string;
    uname : string;
    email : string;
    address : string;
    phone : string;
    accesslevel : string;
    password : string;
    error = '';
    loading = false;
    

  constructor(private router: Router,
    private userService: UserService,
    private authenticationService:AuthenticationService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  setAccess(type:string):void{
    if(type === 'admin'){
      this.accesslevel = '1';
    }
    else{
      this.accesslevel = '2';
    }
  }


  Signup():void{
    if (this.fname && this.lname && this.uname && this.email && this.address && this.phone  && this.password) {
      this.loading = true;
      this.accesslevel = '1';
      this.userService.signup(this.fname,
        this.lname ,
        this.uname ,
        this.email,
        this.address,
        this.phone,
        this.accesslevel,
        this.password)
        .subscribe(result => {
          if (result === true) {
            this.openSnackBar('User Signup Successfull', 'Success');
            this.router.navigate(['/login']);
          } else {
            this.error = 'Error Plese try again';
            this.loading = false;
            this.openSnackBar(this.error, 'Error');
          }
        });
    } else {
      this.error = 'All fields are required to be filled';
      this.loading = false;
      this.openSnackBar(this.error, 'Error');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
