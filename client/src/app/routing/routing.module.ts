import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { NotfoundComponent } from "../notfound/notfound.component";
import { RegisterComponent } from "../register/register.component";
import { AppComponent } from "../app.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AppComponent
  },
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
