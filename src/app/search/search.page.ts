import {Component, EventEmitter, OnInit} from '@angular/core';
import {Place} from "../Place";
import {PlacesService} from "../api/places.service";
import {Category} from "../Category";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage{

places: Place[] = [];

category: Category;

  constructor(private placeService: PlacesService,private route: ActivatedRoute, private router: Router,private navController: NavController) {

    this.route.queryParams.subscribe((_p) => {
      const navParams = this.router.getCurrentNavigation().extras.state
      if (navParams) this.category = navParams.category

      this.placeService.getPlacesByCategory(this.category.code).subscribe((places: Place[]) => this.places = places);
    })


   }

  async loadDetail(place: Place) {
    await this.navController.navigateForward(`detail/${place.id}`, {state: {place}});
  }
}
