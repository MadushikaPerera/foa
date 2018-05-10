import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { InventoryService } from "../../../../services/inventory.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditVehicleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public inventoryService: InventoryService
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
    this.inventoryService.updateVehicle(this.data);
  }
}
