import { Injectable } from '@angular/core';
import {PlacesService} from "./places.service";
import * as L from 'leaflet';
import {Place} from "../Place";


@Injectable({
  providedIn: 'root'
})
export class MapMarkerService {

  constructor(private placeService: PlacesService) { }

  makeMarkers(map: L.map): void {
    this.placeService.getPlacesList().subscribe((res: Place[]) => {
      for (const c of (res)){
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
        console.log(marker._latlng)
      }
    });
  }
}
