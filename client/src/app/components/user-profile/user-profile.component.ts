import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  fname:string;
  lname:string;
  phone:string;
  address:string;
  loading:boolean;
  error:string;

  constructor(private userservice:UserService,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userservice.getuser().subscribe(res=>{
      this.fname=res[0].fname;
      this.lname=res[0].lname;
      this.phone=res[0].phone;
      this.address=res[0].address;
    });
  }

  loaduser(){
    this.userservice.getuser().subscribe(res=>{
      this.fname=res[0].fname;
      this.lname=res[0].lname;
      this.phone=res[0].phone;
      this.address=res[0].address;
    });
  }

  edit(){
    if (this.fname && this.lname && this.phone && this.address) {
      this.loading = true;
      let user ={
        uname:'kh123',
        fname:this.fname,
        lname:this.lname,
        phone:this.phone,
        address:this.address,
      };
      this.userservice
        .edituser(user)
        .subscribe(result => {
          if (result === true) {
            this.loading = false;
            this.openSnackBar('User Updated', 'Success');
            this.loaduser();
          } else {
            this.error = 'Error occured please try again!';
            this.loading = false;
            this.openSnackBar(this.error, 'Error');
          }
        });
    } else {
      this.error = 'Fields cannot be empty';
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
