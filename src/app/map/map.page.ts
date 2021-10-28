import { Component, AfterViewInit } from '@angular/core';
import * as L from 'Leaflet';
import {MapMarkerService} from "../api/map-marker.service";


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {

  private map;
  private roskildeCoordinate: number[] = [55.641911, 12.087845];
  private accessToken: string = "pk.eyJ1Ijoic2FuZGlwMTI0IiwiYSI6ImNrbzA3YzNlMDBiMTIyeHF3cnA0Z3EwcGoifQ.EtPkUcqj8Rc5M5Sekyl8Gw"


  private initMap(): void {
    this.map = L.map('map').setView(this.roskildeCoordinate,13);

    const mapTiles = L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.accessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: this.accessToken
    })

    mapTiles.addTo(this.map);

    L.marker(this.roskildeCoordinate)
      .addTo(this.map)
      .bindPopup("Roskilde");

  }


  constructor(private markerService: MapMarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMarkers(this.map);
  }

}
