import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Place} from '../Place';
import {Category} from '../Category';
import {catchError, tap} from "rxjs/operators";

const httpOptions = {
  header: new HttpHeaders({
    'content-type': 'application/json'
  })
};

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

  getPlaceById(placeId: number): Observable<Place>{
    return this.httpClient.get<Place>(this.baseUrl + '/places/'+placeId).pipe(
      tap(_ => console.log(`fetched hero id=${placeId}`)),
      catchError(this.handleError<Place>(`getPlace id=${placeId}`))
    );
  }


  getTopPlacesList(): Observable<Place[]> {
  // need to modify  for the top places using the  place where rating has top rating
    return this.httpClient.get<Place[]>(this.baseUrl + '/places');
  }


  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl + '/categories');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

