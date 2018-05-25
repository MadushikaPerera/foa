import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { Employee } from "../../../model/employee";
import { EmployeeService } from "../../../services/employee.service";

@Component({
  selector: "app-editemployee",
  templateUrl: "./editemployee.component.html",
  styleUrls: ["./editemployee.component.css"]
})
export class EditemployeeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeservice: EmployeeService
  ) {}

  ngOnInit() {}

  formControl = new FormControl("", [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
        ? "Not a valid email"
        : "";
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Edit(): void {
    this.employeeservice.updateEmployees(this.data);
  }
}
