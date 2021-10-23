import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { PlacesService } from '../api/places.service';
import { Place } from '../Place';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterContentChecked, OnInit{

  @ViewChild('swiper') swiper: SwiperComponent;

  places: Place[] = [];
  topPlaces: Place[] = [];

  types: string[] = ['All','Popular','Nearby','Recommended'];

  constructor(private menu: MenuController,private placeService: PlacesService,private  alertController : AlertController,private router: Router,private navController: NavController) {
  }
  ngOnInit(): void {
    this.loadPlaces();
  }
  ngAfterContentChecked(): void {
    if(this.swiper)
    {
      this.swiper.updateSwiper({});
    }
  }

  doRefresh(event) : void {
    this.loadPlaces();
    setTimeout(() => {
      console.log('Loading of the places list is finished.');
      event.target.complete();
    }, 2000);
  }

  private loadPlaces() : void{
    this.placeService.getPlacesList().subscribe((places) => this.places = places);
    this.placeService.getTopPlacesList().subscribe((places) => this.topPlaces = places);
  }

  async loadDetail(place: Place){
    await this.navController.navigateForward(`detail/${place.id}`, { state: { place } })
    console.log(place);
      }
}
