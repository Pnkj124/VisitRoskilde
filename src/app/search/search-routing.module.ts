import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';
import {DetailPage} from "../detail/detail.page";

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  },
  {
    path: ':any',
    component: SearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
