import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-make-order",
  templateUrl: "./make-order.component.html",
  styleUrls: ["./make-order.component.css"]
})
export class MakeOrderComponent implements OnInit {
  constructor(private userservice: UserService) {}

  ngOnInit() {}
}
