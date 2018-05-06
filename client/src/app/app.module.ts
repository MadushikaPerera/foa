import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { RoutingModule, routingComponents } from "./routing/routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from "../environments/environment";
import { NgxGalleryModule } from "ngx-gallery";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { RegisterComponent } from "./components/register/register.component";
import { RestaurantCardComponent } from "./components/restaurant/restaurant-card/restaurant-card.component";
import { FoodCardComponent } from "./components/restaurant/food-card/food-card.component";
import { RestaurantProfileComponent } from "./components/restaurant/restaurant-profile/restaurant-profile.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { MapComponent } from "./components/map/map.component";
import { UserComponent } from "./components/user/user.component";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { DeliveryComponent } from "./components/delivery/delivery.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { EmployeeService } from "./services/employee.service";
import { DeliveryService } from "./services/delivery.service";
import { InventoryService } from "./services/inventory.service";
import { OderService } from "./services/oder.service";
import { PromoService } from "./services/promo.service";
import { AuthguardGuard } from "./authguard.guard";
import { TokenInterceptor } from "./services/token.interceptor";
import { CartComponent } from "./components/cart/cart.component";
import { VehicleDialogComponent } from "./components/inventory/vehicle-dialog/vehicle-dialog.component";
import { FoodDialogComponent } from "./components/inventory/food-dialog/food-dialog.component";
import { FoodTableComponent } from "./components/inventory/food-table/food-table.component";
import { VehicleTableComponent } from "./components/inventory/vehicle-table/vehicle-table.component";
import { AddComponent } from "./components/inventory/food-table/add/add.component";
import { DeleteComponent } from "./components/inventory/food-table/delete/delete.component";
import { EditComponent } from "./components/inventory/food-table/edit/edit.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { OrderItemComponent } from "./components/orders/order-item/order-item.component";
import { FoodAdvancedComponent } from "./components/restaurant/food-advanced/food-advanced.component";
import { FoodOrderComponent } from "./components/restaurant/food-order/food-order.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    RegisterComponent,
    RestaurantCardComponent,
    FoodCardComponent,
    RestaurantProfileComponent,
    UserProfileComponent,
    MapComponent,
    UserComponent,
    InventoryComponent,
    DeliveryComponent,
    RestaurantComponent,
    AdminComponent,
    CartComponent,
    VehicleDialogComponent,
    FoodDialogComponent,
    FoodTableComponent,
    VehicleTableComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    OrdersComponent,
    OrderItemComponent,
    FoodAdvancedComponent,
    FoodOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: environment.apiKey
    }),
    NgxGalleryModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    UserService,
    EmployeeService,
    DeliveryService,
    AuthguardGuard,
    InventoryService,
    OderService,
    PromoService
  ],
  entryComponents: [
    FoodDialogComponent,
    VehicleDialogComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    FoodOrderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
