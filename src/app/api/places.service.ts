import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Place} from '../Place';
import { Category } from '../Category';

const httpOptions = {
  header : new HttpHeaders({
    'content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private baseUrl = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {
  }

    getPlacesList(): Observable<Place[]>{
      return this.httpClient.get<Place[]>(this.baseUrl+'/places');
    }

  getTopPlacesList(): Observable<Place[]> {
    return this.httpClient.get<Place[]>(this.baseUrl+'/top-places');
  }


  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + '/categories');
  }
}

