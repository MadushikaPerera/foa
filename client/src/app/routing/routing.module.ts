import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { RegisterComponent } from '../components/register/register.component';
import { AppComponent } from '../app.component';
import { OrdersListComponent } from '../components/orders-list/orders-list.component';
import { MapComponent } from '../components/map/map.component';
import { RestaurantComponent } from '../components/restaurant/restaurant.component';
import { FoodCardComponent } from '../components/food-card/food-card.component';
import {InventoryComponent} from '../components/inventory/inventory.component';
import {FoodTableComponent} from '../components/inventory/food-table/food-table.component';
import { AuthguardGuard } from '../authguard.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'orders',
    pathMatch: 'full',
    canActivate: [AuthguardGuard],
    component: OrdersListComponent
  },
  {
    path: 'restaurant',
    pathMatch: 'full',
    canActivate: [AuthguardGuard],
    component: RestaurantComponent
  },
  {
    path: 'food',
    pathMatch: 'full',
    canActivate: [AuthguardGuard],
    component: FoodCardComponent
  },
  {
    path: 'map',
    pathMatch: 'full',
    canActivate: [AuthguardGuard],
    component: MapComponent
  },
  {
    path: 'inventory',
    pathMatch: 'full',
    canActivate: [AuthguardGuard],
    component: InventoryComponent
  },
  {
    path: 'foods',
    pathMatch: 'full',
    canActivate: [AuthguardGuard],
    component: FoodTableComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule {}

export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  NotfoundComponent
];
