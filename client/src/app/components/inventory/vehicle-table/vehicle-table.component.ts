import { Component, OnInit } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {DeleteComponent} from './delete/delete.component';
import {Vehicle} from '../../../model/vehicle';
import {InventoryService} from '../../../services/inventory.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-vehicle-table',
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.css']
})
export class VehicleTableComponent implements OnInit {

  dataSource = new VehicleDataSource(this.inventoryservice);
  displayedColumns = ['vid', 'brand', 'model', 'licenseno', 'dob', 'quantity','actions'];
  index: number;
  id: number;

  constructor(public dialog: MatDialog,private inventoryservice:InventoryService) { }

  ngOnInit() {
  }

  addNew(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {vehicle: vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
       // this.exampleDatabase.dataChange.value.push(this.inventoryservice.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
       // this.exampleDatabase.dataChange.value[foundIndex] = this.inventoryservice.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id, title: title, state: state, url: url}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }


  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // // if there's a paginator active we're using it for refresh
    // if (this.dataSource._paginator.hasNextPage()) {
    //   this.dataSource._paginator.nextPage();
    //   this.dataSource._paginator.previousPage();
    //   // in case we're on last page this if will tick
    // } else if (this.dataSource._paginator.hasPreviousPage()) {
    //   this.dataSource._paginator.previousPage();
    //   this.dataSource._paginator.nextPage();
    //   // in all other cases including active filter we do it like this
    // } else {
    //   this.dataSource.filter = '';
    //  // this.dataSource.filter = this.filter.nativeElement.value;
    // }
  }

  public loadData() {
    // this.exampleDatabase = new DataService(this.httpClient);
    // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   });
  }

}


export class VehicleDataSource extends DataSource<any>{
  constructor(private inventoryservice:InventoryService){
     super();
  }

  connect():Observable<Vehicle[]>{
    console.log('vehicle data source connect');
    
    return this.inventoryservice.getVehicles();
  }

  disconnect(){}
}
