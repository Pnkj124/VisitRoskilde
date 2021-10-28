import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Place} from "../../Place";

@Component({
  selector: 'app-favourite-status',
  templateUrl: './favourite-status.component.html',
  styleUrls: ['./favourite-status.component.scss'],
})
export class FavouriteStatusComponent implements OnInit {

  @Input() place: Place;
  @Output() toggleFavouriteStatus: EventEmitter<Place> = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  toggleFavourite(place: Place){
    this.toggleFavouriteStatus.emit();
  }

}
