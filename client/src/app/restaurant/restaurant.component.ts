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
  constructor() {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: "600px",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrows: true,
        imageSwipe: true,
        thumbnailsArrows: false,
        thumbnailsSwipe: true,
        previewSwipe: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
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
