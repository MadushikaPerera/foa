import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.css"]
})
export class OrderItemComponent implements OnInit {
  @Input() address: string;
  @Input() payment: string;
  @Input() items: any;

  constructor() {}

  ngOnInit() {}
}
