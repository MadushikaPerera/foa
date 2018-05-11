import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { NotfoundComponent } from "../components/notfound/notfound.component";
import { RegisterComponent } from "../components/register/register.component";
import { AppComponent } from "../app.component";
import { MapComponent } from "../components/map/map.component";
import { RestaurantComponent } from "../components/restaurant/restaurant.component";
import { FoodCardComponent } from "../components/restaurant/food-card/food-card.component";
import { FoodAdvancedComponent } from "../components/restaurant/food-advanced/food-advanced.component";
import { InventoryComponent } from "../components/inventory/inventory.component";
import { UserProfileComponent } from "../components/user-profile/user-profile.component";
import { FoodTableComponent } from "../components/inventory/food-table/food-table.component";
import { VehicleTableComponent } from "../components/inventory/vehicle-table/vehicle-table.component";
import { CartComponent } from "../components/cart/cart.component";
import { OrdersComponent } from "../components/orders/orders.component";
import { OrderItemComponent } from "../components/orders/order-item/order-item.component";
import { DeliveryComponent } from "../components/delivery/delivery.component";
import { AdminComponent } from "../components/admin/admin.component";
import { AuthguardGuard } from "../authguard.guard";

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
    path: "restaurant",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: RestaurantComponent
  },
  {
    path: "map",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: MapComponent
  },
  {
    path: "inventory",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: InventoryComponent
  },
  {
    path: "userProfile",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: UserProfileComponent
  },
  {
    path: "delivery",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: DeliveryComponent
  },
  {
    path: "meals",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: FoodAdvancedComponent
  },
  {
    path: "cart",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: CartComponent
  },
  {
    path: "order",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: OrdersComponent
  },
  {
    path: "admin",
    pathMatch: "full",
    canActivate: [AuthguardGuard],
    component: AdminComponent
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
