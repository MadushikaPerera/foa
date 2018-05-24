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
import { Employee } from "../../model/employee";
import { EmployeeService } from "../../services/employee.service";
import { DataSource } from "@angular/cdk/collections";
import { AddemployeeComponent } from "./addemployee/addemployee.component";
import { EditemployeeComponent } from "./editemployee/editemployee.component";
import { DeleteemployeeComponent } from "./deleteemployee/deleteemployee.component";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  exampleDatabase: EmployeeService | null;
  dataSource: FoodDataSource | null;
  displayedColumns = [
    "eid",
    "fname",
    "lname",
    "nic",
    "address",
    "contact",
    "type",
    "license",
    "dob",
    "actions"
  ];
  index: number;
  id: number;

  constructor(
    public dialog: MatDialog,
    private employeeservice: EmployeeService,
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

  addNew(employee: Employee) {
    console.log("close");

    const dialogRef = this.dialog.open(AddemployeeComponent, {
      data: { employee: employee }
    });

    console.log("dialog data", dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(
          this.employeeservice.getEmployeeDialogData()
        );
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    eid: number,
    fname: string,
    lname: string,
    nic: number,
    address: string,
    contact: string,
    type: string,
    license: string,
    dob: string
  ) {
    this.id = eid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditemployeeComponent, {
      data: {
        eid: eid,
        fname: fname,
        lname: lname,
        nic: nic,
        address: address,
        contact: contact,
        type: type,
        license: license,
        dob: dob
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.eid === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.employeeservice.getEmployeeDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(
    i: number,
    eid: number,
    fname: number,
    lname: string,
    nic: string
  ) {
    this.index = i;
    this.id = eid;
    const dialogRef = this.dialog.open(DeleteemployeeComponent, {
      data: { eid: eid, fname: fname, lname: lname, nic: nic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          x => x.eid === this.id
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
    this.exampleDatabase = new EmployeeService(this.httpClient);
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

export class FoodDataSource extends DataSource<Employee> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Employee[] = [];
  renderedData: Employee[] = [];

  constructor(
    public _exampleDatabase: EmployeeService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Employee[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllEmployees();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      console.log("filter", this._exampleDatabase.employeeData);

      this.filteredData = this._exampleDatabase.employeeData
        .slice()
        .filter((employee: Employee) => {
          const searchStr = (
            employee.eid +
            employee.fname +
            employee.lname +
            employee.nic +
            employee.address +
            employee.contact +
            employee.type +
            employee.license +
            employee.dob
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
  sortData(data: Employee[]): Employee[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "eid":
          [propertyA, propertyB] = [a.eid, b.eid];
          break;
        case "fname":
          [propertyA, propertyB] = [a.fname, b.fname];
          break;
        case "lname":
          [propertyA, propertyB] = [a.lname, b.lname];
          break;
        case "nic":
          [propertyA, propertyB] = [a.nic, b.nic];
          break;
        case "address":
          [propertyA, propertyB] = [a.address, b.address];
          break;
        case "contact":
          [propertyA, propertyB] = [a.contact, b.contact];
          break;
        case "type":
          [propertyA, propertyB] = [a.type, b.type];
          break;
        case "license":
          [propertyA, propertyB] = [a.license, b.license];
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
