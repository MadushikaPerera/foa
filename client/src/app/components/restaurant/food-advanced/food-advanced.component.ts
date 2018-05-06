import { Component, OnInit } from "@angular/core";
import { Food } from "../../../model/food";
import { Router } from "@angular/router";
import { InventoryService } from "../../../services/inventory.service";

@Component({
  selector: "app-food-advanced",
  templateUrl: "./food-advanced.component.html",
  styleUrls: ["./food-advanced.component.css"]
})
export class FoodAdvancedComponent implements OnInit {
  foods = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + "k";
    }

    return value;
  }

  meals: any[];
  types: any[];

  constructor(
    private inventoryservice: InventoryService,
    private router: Router
  ) {
    this.inventoryservice.getFoodItems().subscribe(res => {
      this.meals = res;
    });
  }

  ngOnInit() {}
}
