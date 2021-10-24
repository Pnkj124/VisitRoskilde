import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import {Place} from '../Place';
import {Category} from '../Category';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private baseUrl = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {
  }

  getPlacesList(): Observable<Place[]> {
    return this.httpClient.get<Place[]>(this.baseUrl + '/places');
  }

  getTopPlacesList(): Observable<Place[]> {
  // need to modify  for the top places using the  place where rating has top rating
    return this.httpClient.get<Place[]>(this.baseUrl + '/places')
      .pipe(map((response: any) => response.filter((x: Place) => x.rating > 3)));

  }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + '/categories');
  }
}

