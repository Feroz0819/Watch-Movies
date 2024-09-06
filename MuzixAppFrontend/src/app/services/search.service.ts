import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

 
  constructor() { }
  private moviesSource = new BehaviorSubject<any[]>([]);
  movies$ = this.moviesSource.asObservable();
  updateMovies(movies: any[]): void {
    this.moviesSource.next(movies);
  }

}
