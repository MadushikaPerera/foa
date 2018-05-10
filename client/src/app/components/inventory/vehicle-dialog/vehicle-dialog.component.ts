import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { InventoryService } from "../../../services/inventory.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-vehicle-dialog",
  templateUrl: "./vehicle-dialog.component.html",
  styleUrls: ["./vehicle-dialog.component.css"]
})
export class VehicleDialogComponent implements OnInit {
  error: string;
  loading: boolean;
  brand: string;
  model: string;
  licenseno: string;
  dob: string;
  quantity: number;

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventoryservice: InventoryService,
    public snackBar: MatSnackBar
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }

  public addVehicle() {
    this.loading = true;

    this.inventoryservice
      .addVehicleItem(this.brand, this.model, this.licenseno, this.dob)
      .subscribe(result => {
        if (result === true) {
          this.closeDialog();
          this.openSnackBar("Added Successfully", "Success");
        } else {
          this.error = "Error Adding Vehicle try again!";
          this.loading = false;
          this.openSnackBar(this.error, "Error");
        }
      });
  }

  ngOnInit() {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
