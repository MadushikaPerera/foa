import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { AddVehicleComponent } from "./add/add.component";
import { EditVehicleComponent } from "./edit/edit.component";
import { DeleteVehicleComponent } from "./delete/delete.component";
import { Vehicle } from "../../../model/vehicle";
import { InventoryService } from "../../../services/inventory.service";
import { DataSource } from "@angular/cdk/collections";

@Component({
  selector: "app-vehicle-table",
  templateUrl: "./vehicle-table.component.html",
  styleUrls: ["./vehicle-table.component.css"]
})
export class VehicleTableComponent implements OnInit {
  exampleDatabase: InventoryService | null;
  dataSource: VehicleDataSource | null;
  displayedColumns = ["vid", "brand", "model", "licenseno", "dob", "actions"];
  index: number;
  id: number;

  constructor(
    public dialog: MatDialog,
    private inventoryservice: InventoryService,
    public httpClient: HttpClient
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter") filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      data: { vehicle: vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        console.log("adding V", this.inventoryservice.getVehicleDialogData());

        this.exampleDatabase.dataChange1.value.push(
          this.inventoryservice.getVehicleDialogData()
        );
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    vid: number,
    brand: string,
    model: string,
    licenseno: string,
    dob: string
  ) {
    this.id = vid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditVehicleComponent, {
      data: {
        vid: vid,
        brand: brand,
        model: model,
        licenseno: licenseno,
        dob: dob
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange1.value.findIndex(
          x => x.vid === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange1.value[
          foundIndex
        ] = this.inventoryservice.getVehicleDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(
    i: number,
    vid: number,
    brand: string,
    model: string,
    licenseno: string
  ) {
    this.index = i;
    this.id = vid;
    const dialogRef = this.dialog.open(DeleteVehicleComponent, {
      data: { vid: vid, brand: brand, model: model, licenseno: licenseno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange1.value.findIndex(
          x => x.vid === this.id
        );
        // // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange1.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = "";
      // this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new InventoryService(this.httpClient);
    this.dataSource = new VehicleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    Observable.fromEvent(this.filter.nativeElement, "keyup")
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class VehicleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Vehicle[] = [];
  renderedData: Vehicle[] = [];

  constructor(
    public _exampleDatabase: InventoryService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Vehicle[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange1,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllVehicles();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      console.log("filter", this._exampleDatabase.vehicleData);

      this.filteredData = this._exampleDatabase.vehicleData
        .slice()
        .filter((vehicle: Vehicle) => {
          const searchStr = (
            vehicle.brand +
            vehicle.model +
            vehicle.licenseno +
            vehicle.dob
          )
            .toString()
            .toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this._paginator.pageSize
      );
      return this.renderedData;
    });
  }
  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Vehicle[]): Vehicle[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "vid":
          [propertyA, propertyB] = [a.vid, b.vid];
          break;
        case "brand":
          [propertyA, propertyB] = [a.brand, b.brand];
          break;
        case "model":
          [propertyA, propertyB] = [a.model, b.model];
          break;
        case "licenseno":
          [propertyA, propertyB] = [a.licenseno, b.licenseno];
          break;
        case "dob":
          [propertyA, propertyB] = [a.dob, b.dob];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
