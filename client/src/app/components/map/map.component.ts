import { Component, OnInit } from "@angular/core";
import { MouseEvent } from "@agm/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  // google maps zoom level
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  constructor() {}

  ngOnInit() {
    
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  markers: marker[] = [
    {
      lat: 79.861244,
      lng: 6.927079,
      label: "Company",
      draggable: false
    }
  ];
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
