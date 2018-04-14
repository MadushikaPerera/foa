import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { RoutingModule, routingComponents } from "./routing/routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { RegisterComponent } from "./register/register.component";
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { FoodCardComponent } from './food-card/food-card.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

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
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
