import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { RoutingModule, routingComponents } from "./routing/routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";
import { environment } from "../environments/environment";
import { NgxGalleryModule } from "ngx-gallery";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { RegisterComponent } from "./register/register.component";
import { RestaurantCardComponent } from "./restaurant-card/restaurant-card.component";
import { FoodCardComponent } from "./food-card/food-card.component";
import { RestaurantProfileComponent } from "./restaurant-profile/restaurant-profile.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { MapComponent } from "./map/map.component";
import { UserComponent } from "./user/user.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { RestaurantComponent } from "./restaurant/restaurant.component";
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    FooterComponent,
    NotfoundComponent,
    RegisterComponent,
    RestaurantCardComponent,
    FoodCardComponent,
    RestaurantProfileComponent,
    UserProfileComponent,
    OrdersListComponent,
    MapComponent,
    UserComponent,
    InventoryComponent,
    DeliveryComponent,
    RestaurantComponent,
    AdminComponent
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
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
