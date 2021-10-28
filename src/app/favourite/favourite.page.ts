import { Component, OnInit } from '@angular/core';
import {Place} from "../Place";
import {PlacesService} from "../api/places.service";
import {AlertController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

favouritePlaces: Place[] = [];

  constructor(private placeService: PlacesService,private navController: NavController,private alertController: AlertController) { }

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

  async removeFromFavourite(place: Place)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: `Are you sure want to remove <b>${place.name}</b> from favourite?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

            place.isFavourite = false;
            this.placeService.toggleFavourite(place).subscribe( () =>
              this.favouritePlaces = this.favouritePlaces
                .filter((filter => filter.isFavourite))
            );
          }
        }
      ]});

    await alert.present();
  }

  async loadDetail(place: Place)
  {
    await this.navController.navigateForward(`detail/${place.id}`, { state: { place } })
    console.log(place);
  }


}
