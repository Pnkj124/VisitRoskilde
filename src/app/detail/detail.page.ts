import { Component} from '@angular/core';
import {Place} from "../Place";
import {PlacesService} from "../api/places.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {

  placeId: number;
  place: Place;

  constructor(private placeService: PlacesService,private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation().extras.state
      if (navParams) this.place = navParams.place;
    })

  }

  toggleFavourite(place: Place){
    place.isFavourite = !place.isFavourite
    this.placeService.toggleFavourite(place).subscribe();
  }


}
