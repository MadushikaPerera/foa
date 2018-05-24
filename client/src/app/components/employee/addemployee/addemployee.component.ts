import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { Employee } from "../../../model/employee";
import { EmployeeService } from "../../../services/employee.service";

@Component({
  selector: "app-addemployee",
  templateUrl: "./addemployee.component.html",
  styleUrls: ["./addemployee.component.css"]
})
export class AddemployeeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeservice: EmployeeService
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddEmployee() {
    delete this.data["employee"];
    this.employeeservice.addEmployees(this.data);
    this.dialogRef.close();
  }
}
