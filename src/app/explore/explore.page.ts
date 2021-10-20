import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { PlacesService } from '../api/places.service';
import { Category } from '../Category';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements AfterContentChecked, OnInit {

  @ViewChild('swiper') swiper: SwiperComponent;

  categories: Category[] = [];

  constructor(private placeService: PlacesService) { }

  ngOnInit() {
    this.placeService.getCategoryList().subscribe((category) => this.categories = category);
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

}
