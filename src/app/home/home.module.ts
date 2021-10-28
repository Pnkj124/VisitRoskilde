import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import {SwiperModule} from 'swiper/angular';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {CardComponent} from "../components/card/card.component";
import {SmallCardComponent} from "../components/small-card/small-card.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    NgbRatingModule
  ],
  exports: [
    SmallCardComponent
  ],
  declarations: [HomePage, CardComponent, SmallCardComponent]
})
export class HomePageModule {}
