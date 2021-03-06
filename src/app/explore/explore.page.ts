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
    this.loadData();
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({
        slidesPerView: 4,
        spaceBetween: 5,
      });
    }
  }

  doRefresh(event) : void {
    this.loadData();
    setTimeout(() => {
      console.log('Loading of the places list is finished.');
      event.target.complete();
    }, 2000);
  }

  loadData(){
    this.placeService.getCategoryList().subscribe((category) => this.categories = category);
    this.placeService.getRecommendedPlaces().subscribe((places) => this.recommendedPlaces = places);
  }

  async loadDetail(place: Place){
    await this.navController.navigateForward(`detail/${place.id}`, { state: { place } })
  }

  async searchByCategory(category: Category){
    await this.navController.navigateForward(`search/${category.code}`,{ state:{category}})
  }

}
