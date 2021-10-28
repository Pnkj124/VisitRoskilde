import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs'
import { map } from 'rxjs/operators';
import {Place} from '../Place';
import {Category} from '../Category';
import {createClient, SupabaseClient, User} from '@supabase/supabase-js'
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

const CategoryTable = 'category';
const PlaceTable = 'place';
const TagsTable = 'tags';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {



  private baseUrl = 'http://localhost:5000';

  private supabase: SupabaseClient;

  private _places: BehaviorSubject<Place[]> = new BehaviorSubject([]);
  private _categories: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  private _tags: BehaviorSubject<string[]> = new BehaviorSubject([]);

  private _currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient,private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
  });

   // this.loadUser();

    this.loadCategories();
    this.loadPlaces();
    this.loadTags();

    // this.supabase.auth.onAuthStateChange((event, session) => {
    //   if (event == 'SIGNED_IN') {
    //     this._currentUser.next(session.user);
    //     this.loadCategories();
    //     this.loadPlaces();
    //     this.loadTags();
    //     //this.handleTodosChanged();
    //   } else {
    //     this._currentUser.next(false);
    //   }
    // });
  }

  // async signUp(credentials: { email, password }) {
  //   return new Promise(async (resolve, reject) => {
  //     const { error, data } = await this.supabase.auth.signUp(credentials)
  //     if (error) {
  //       reject(error);
  //     } else {
  //       resolve(data);
  //     }
  //   });
  // }

  // signIn(credentials: { email, password }) {
  //   return new Promise(async (resolve, reject) => {
  //     const { error, data } = await this.supabase.auth.signIn(credentials)
  //     if (error) {
  //       reject(error);
  //     } else {
  //       resolve(data);
  //     }
  //   });
  // }

  // signOut() {
  //   this.supabase.auth.signOut().then(_ => {
  //     // Clear up and end all active subscriptions!
  //     this.supabase.getSubscriptions().map(sub => {
  //       this.supabase.removeSubscription(sub);
  //     });
  //
  //     this.router.navigateByUrl('/');
  //   });
  // }

  // get currentUser(): Observable<User> {
  //   return this._currentUser.asObservable();
  // }

  // async loadUser() {
  //   const user = await this.supabase.auth.user();
  //   console.log(user);
  //   if (user) {
  //     this._currentUser.next(user);
  //   } else {
  //     this._currentUser.next(false);
  //   }
  // }

  get places(): Observable <Place[]> {
    return this._places.asObservable();
  }

  get categories(): Observable <Category[]> {
    return this._categories.asObservable();
  }

  get tags(): Observable <string[]> {
    return this._tags.asObservable();
  }

  private async loadCategories() {
    const query = await this.supabase.from(CategoryTable).select('*');
    this._categories.next(query.data);
  }

  private async loadPlaces() {
    const query = await this.supabase.from(PlaceTable).select('*');
    this._places.next(query.data);
  }

  private async loadTags() {
    const query = await this.supabase.from(TagsTable).select('*');
    this._tags.next(query.data);
  }

  getPlacesList(): Observable<Place[]> {
    return this.places;
  }

  getTopPlacesList(): Observable<Place[]> {
    return this.places.pipe(map((response: any) => response.filter((x: Place) => x.rating > 3)));
  }

  getFavouritePlacesList(): Observable<Place[]> {
    return this.places.pipe(map((response: any) => response.filter((x: Place) => x.isFavourite)));
  }

  getRecommendedPlaces(): Observable<Place[]> {
    return this.places.pipe(map((response: any) => response.filter((x: Place) => x.tags.includes("Recommended"))));
  }

  getPlacesByCategory(category: string): Observable<Place[]> {
    return this.places.pipe(map((response: any) => response.filter((x: Place) => x.category.includes(category))));
  }

  getCategoryList(): Observable<Category[]> {
    return this.categories;
  }

  async toggleFavourite(id, isFavourite: boolean) {
    await this.supabase
      .from(PlaceTable)
      .update({ isFavourite })
      .match({ id })
  }

  getTags(): Observable<string[]> {
    return this.tags;
  }
}

