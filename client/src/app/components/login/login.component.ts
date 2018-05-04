import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  email: string;
  password: string;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //this.authenticationService.logout();
  }

  login(): void {
    if (this.email && this.password) {
      this.loading = true;
      this.authenticationService
        .login(this.email, this.password)
        .subscribe(result => {
          if (result === true) {
            this.router.navigate(['/orders']);
          } else {
            this.error = 'Email or Password is incorrect';
            this.loading = false;
            this.openSnackBar(this.error, 'Error');
          }
        });
    } else {
      this.error = 'Email or Password cannot be empty';
      this.loading = false;
      console.log(this.error);
      this.openSnackBar(this.error, 'Error');
    }
  }

  Register(){
    this.router.navigate(['/signup']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
