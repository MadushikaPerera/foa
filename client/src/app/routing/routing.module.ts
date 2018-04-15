import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { NotfoundComponent } from "../notfound/notfound.component";
import { RegisterComponent } from "../register/register.component";
import { AppComponent } from "../app.component";
import { OrdersListComponent } from "../orders-list/orders-list.component";
import { MapComponent } from "../map/map.component";
import { RestaurantComponent } from "../restaurant/restaurant.component";
import { FoodCardComponent } from "../food-card/food-card.component";

const routes: Routes = [
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "signup",
    pathMatch: "full",
    component: RegisterComponent
  },
  {
    path: "orders",
    pathMatch: "full",
    component: OrdersListComponent
  },
  {
    path: "restaurant",
    pathMatch: "full",
    component: RestaurantComponent
  },
  {
    path: "food",
    pathMatch: "full",
    component: FoodCardComponent
  },
  {
    path: "map",
    pathMatch: "full",
    component: MapComponent
  },
  {
    path: "**",
    pathMatch: "full",
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
