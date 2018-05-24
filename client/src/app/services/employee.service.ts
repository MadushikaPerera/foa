import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Driver } from "../model/driver";
import { Employee } from '../model/employee';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class EmployeeService {
  public employeelist: Employee[];
  dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  dialogData: any;
  constructor(private http: HttpClient) {}

  get employeeData(): Employee[] {
    return this.dataChange.value;
  }

  getEmployeeDialogData() {
    return this.dialogData;
  }

  addEmployees(employee: Employee): void {
    this.dialogData = employee;
    this.addEmployee(
      employee.fname,
      employee.lname,
      employee.nic,
      employee.address,
      employee.contact,
      employee.license,
      employee.dob
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

  updateEmployees(employee: Employee): void {
    this.dialogData = employee;
    this.editEmployee(
      employee.fname,
      employee.lname,
      employee.nic,
      employee.address,
      employee.contact,
      employee.license,
      employee.dob
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

  deleteEmployees(eid: number): void {
    console.log(eid);
    this.deleteEmployee(eid).subscribe(result => {
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

  addEmployee(
    fname: string,
    lname: string,
    nic: number,
    address: string,
    contact: string,
    license: string,
    dob: string,
  ): Observable<boolean> {
    return this.http
      .post(environment.host + "/addemployee", {
        fname: fname,
        lname: lname,
        nic: nic,
        address: address,
        contact: contact,
        license:license,
        dob:dob
      })
      .map((response: Employee) => {
        // signup successful
        if (response) {
          console.log("food added", response);

          return true;
        }
        return false;
      });
  }

  editEmployee(
    fname: string,
    lname: string,
    nic: number,
    address: string,
    contact: string,
    license: string,
    dob: string,
  ): Observable<boolean> {
    return this.http
      .put(environment.host + "/editemployee", {
        fname: fname,
        lname: lname,
        nic: nic,
        address: address,
        contact: contact,
        license:license,
        dob:dob
      })
      .map((response: Employee) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }

  getEmployees(): Observable<Employee[]> {
    console.log("calling employee");
    return this.http.get(environment.host + "/getemployees").map(response => {
      let employeelist = response as Employee[];
      console.log(employeelist);
      return employeelist;
    });
  }

  getAllEmployees(): void {
    this.http.get<Employee[]>(environment.host + "/getemployees").subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  deleteEmployee(eid: number): Observable<boolean> {
    return this.http
      .put(environment.host + "/delemployee",{eid:eid})
      .map((response: Employee) => {
        // signup successful
        if (response) {
          return true;
        }
        return false;
      });
  }
}
