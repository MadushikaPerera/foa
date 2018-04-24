import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit {

  title:String;
  subtitle:String;
  image:String;
  description:String;


  constructor() { }

  ngOnInit() {
  }

}
