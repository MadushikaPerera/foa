import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { Employee } from "../../../model/employee";
import { EmployeeService } from "../../../services/employee.service";

@Component({
  selector: "app-deleteemployee",
  templateUrl: "./deleteemployee.component.html",
  styleUrls: ["./deleteemployee.component.css"]
})
export class DeleteemployeeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeservice: EmployeeService
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.employeeservice.deleteEmployee(this.data.eid);
  }
}
