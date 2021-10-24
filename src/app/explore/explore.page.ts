import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { PlacesService } from '../api/places.service';
import { Category } from '../Category';
import {Place} from "../Place";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements AfterContentChecked, OnInit {

  @ViewChild('swiper') swiper: SwiperComponent;

  categories: Category[] = [];

  recommendedPlaces: Place[] = [];

  constructor(private placeService: PlacesService,private navController: NavController) { }

  ngOnInit() {
    this.placeService.getCategoryList().subscribe((category) => this.categories = category);
    this.placeService.getRecommendedPlaces().subscribe((places) => this.recommendedPlaces = places);
    console.log(this.recommendedPlaces);
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({
        slidesPerView: 3,
        spaceBetween: 5,
        navigation: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
      });
    }
  }

  async loadDetail(place: Place){
    await this.navController.navigateForward(`detail/${place.id}`, { state: { place } })
  }

}
