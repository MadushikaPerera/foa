import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { RoutingModule, routingComponents } from './routing/routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { RestaurantProfileComponent } from './components/restaurant-profile/restaurant-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { MapComponent } from './components/map/map.component';
import { UserComponent } from './components/user/user.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { EmployeeService } from './services/employee.service';
import { RestaurantService } from './services/restaurant.service';
import { MealService } from './services/meal.service';
import { DeliveryService } from './services/delivery.service';
import { DriverService } from './services/driver.service';

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
    NgxGalleryModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    EmployeeService,
    RestaurantService,
    MealService,
    DeliveryService,
    DriverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
