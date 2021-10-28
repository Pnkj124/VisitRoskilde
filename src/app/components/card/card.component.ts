import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Place} from "../../Place";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() place: Place;
  @Output() loadDetailPage: EventEmitter<Place> = new EventEmitter()

  constructor() { }

  ngOnInit() {}


  async loadDetail(place: Place){
    this.loadDetailPage.emit(place);
  }

}
