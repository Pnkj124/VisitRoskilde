import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {FavouriteStatusComponent} from "../components/favourite-status/favourite-status.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    NgbRatingModule
  ],
  exports: [
    FavouriteStatusComponent
  ],
  declarations: [DetailPage, FavouriteStatusComponent]
})
export class DetailPageModule {}
