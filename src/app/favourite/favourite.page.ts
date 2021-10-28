import { Component, OnInit } from '@angular/core';
import {Place} from "../Place";
import {PlacesService} from "../api/places.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

favouritePlaces: Place[] = [];

  constructor(private placeService: PlacesService,private navController: NavController) { }

  ngOnInit() {
    this.loadFavouritePlaces();
  }

  private loadFavouritePlaces()
  {
    this.placeService.getFavouritePlacesList().subscribe((favouritePlaces: Place[])=> this.favouritePlaces =  favouritePlaces);
  }

  doRefresh(event) : void {
    this.loadFavouritePlaces();
    setTimeout(() => {
      console.log('Loading of the favourite places list is finished.');
      console.log(this.favouritePlaces);
      event.target.complete();
    }, 1000);
  }

  removeFromFavourite(place: Place)
  {
    this.placeService.toggleFavourite(place.id,false);
  }

  async loadDetail(place: Place)
  {
    await this.navController.navigateForward(`detail/${place.id}`, { state: { place } })
    console.log(place);
  }


}
