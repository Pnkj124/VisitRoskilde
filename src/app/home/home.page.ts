import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { PlacesService } from '../api/places.service';
import { Place } from '../Place';

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

  constructor(private menu: MenuController,private placeService: PlacesService) {
  }
  ngOnInit(): void {
    this.placeService.getPlacesList().subscribe((places) => this.places = places);
    this.placeService.getTopPlacesList().subscribe((places) => this.topPlaces = places);
  }
  ngAfterContentChecked(): void {
    if(this.swiper)
    {
      this.swiper.updateSwiper({});
    }
  }

}
