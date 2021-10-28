import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Place} from "../../Place";

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss'],
})
export class SmallCardComponent implements OnInit {

  @Input() place: Place;
  @Output() onClick: EventEmitter<Place> = new EventEmitter()

  constructor() { }

  ngOnInit() {}


  loadDetail(place: Place): void{
    this.onClick.emit(place);
  }

}
