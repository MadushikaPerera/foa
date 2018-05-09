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
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { DeleteComponent } from "./delete/delete.component";
import { Food } from "../../../model/food";
import { InventoryService } from "../../../services/inventory.service";
import { DataSource } from "@angular/cdk/collections";

@Component({
  selector: "app-food-table",
  templateUrl: "./food-table.component.html",
  styleUrls: ["./food-table.component.css"]
})
export class FoodTableComponent implements OnInit {
  exampleDatabase: InventoryService | null;
  dataSource: FoodDataSource | null;
  displayedColumns = [
    "mid",
    "name",
    "type",
    "price",
    "quantity",
    "description",
    "actions"
  ];
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

  addNew(food: Food) {
    console.log("close");

    const dialogRef = this.dialog.open(AddComponent, {
      data: { food: food }
    });

    console.log("dialog data", dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(
          this.inventoryservice.getFoodDialogData()
        );
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    mid: number,
    name: string,
    type: string,
    price: string,
    quantity: string,
    description: string
  ) {
    this.id = mid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        mid: mid,
        name: name,
        type: type,
        price: price,
        quantity: quantity,
        description: description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.mid === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.inventoryservice.getFoodDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(
    i: number,
    mid: number,
    name: string,
    type: string,
    quantity: string
  ) {
    this.index = i;
    this.id = mid;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { mid: mid, name: name, type: type, quantity: quantity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.mid === this.id
        );
        // // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
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
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new InventoryService(this.httpClient);
    this.dataSource = new FoodDataSource(
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

// export class FoodDataSource extends DataSource<any> {
//   constructor(private inventoryservice: InventoryService) {
//     super();
//   }

//   connect(): Observable<Food[]> {
//     console.log("food data source connect");

//     return this.inventoryservice.getFoodItems();
//   }

//   disconnect() {}
// }

export class FoodDataSource extends DataSource<Food> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Food[] = [];
  renderedData: Food[] = [];

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
  connect(): Observable<Food[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllFoods();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      console.log("filter", this._exampleDatabase.foodData);

      this.filteredData = this._exampleDatabase.foodData
        .slice()
        .filter((food: Food) => {
          const searchStr = (
            food.name +
            food.type +
            food.price +
            food.description +
            food.quantity
          ).toLowerCase();
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
  sortData(data: Food[]): Food[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.mid, b.mid];
          break;
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case "type":
          [propertyA, propertyB] = [a.type, b.type];
          break;
        case "price":
          [propertyA, propertyB] = [a.price, b.price];
          break;
        case "quantity":
          [propertyA, propertyB] = [a.quantity, b.quantity];
          break;
        case "description":
          [propertyA, propertyB] = [a.description, b.description];
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
