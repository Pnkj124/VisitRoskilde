import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import {Place} from '../Place';
import {Category} from '../Category';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
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
    return this.httpClient.get<Place[]>(this.baseUrl + '/places')
      .pipe(map((response: any) => response.filter((x: Place) => x.rating > 3)));
  }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + '/categories');
  }

  toggleFavourite(place: Place): Observable<Place> {
    const url = `${this.baseUrl}/places/${place.id}`;
    return this.httpClient.put<Place>(url, place, httpOptions)
  }

  getTags(): Observable<string[]> {
    const url = `${this.baseUrl}/tags`;
    return this.httpClient.get<string[]>(url);
  }
}

