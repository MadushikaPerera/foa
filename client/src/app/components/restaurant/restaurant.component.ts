import { Component, OnInit } from "@angular/core";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.css"]
})
export class RestaurantComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  meals : any[];
  types : any[];
constructor() {
  this.meals =[{text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'}];
  this.types=[{title:'Fried Rice'},{title:'Rice & Curry'},{title:'Kottu'}];
}

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "100%",
        height: "100%",
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: true,
        imageSwipe: true,
        thumbnails: false,
        previewSwipe: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "100%",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant5.jpg",
        medium:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant5.jpg",
        big:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant5.jpg"
      },
      {
        small:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant14.jpg",
        medium:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant14.jpg",
        big:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant14.jpg"
      },
      {
        small:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant4.jpg",
        medium:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant4.jpg",
        big:
          "https://rajabojun.lk/wp-content/uploads/photo-gallery/resturant4.jpg"
      }
    ];
  }
}
