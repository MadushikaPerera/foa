import { Component, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit() {}
}
