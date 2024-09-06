import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
 
  private apiKey = '397f3e30e0968cb5d22397bcfc654fcb'; // Your TMDB API key
  private baseUrl = 'https://api.themoviedb.org/3'; // The base URL for TMDB API
 
 constructor(private http: HttpClient){}

 getPopularMovies(): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
}

getRecommendedMovies(movieId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`);
}


searchMovies(query: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
}
getRandomMovies(): Observable<any> {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Increase the number of pages as needed
  const requests = pages.map(page => 
    this.http.get<any>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&page=${page}`)
  );
  return forkJoin(requests).pipe(
    map((responses: any[]) => {
      const allMovies = responses.reduce((acc, response) => acc.concat(response.results), []);
      return allMovies.slice(0, 98); // Select the first 98 movies from the combined list
    })
  );
}

getMovieVideos(movieId: number) {
  return this.http.get(`${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`);
}

getMovieDetails(movieId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
}

getMovieCast(movieId: number): Observable<any> {
  return this.http.get(
    `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`
  );
}

}


