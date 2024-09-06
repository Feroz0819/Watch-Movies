import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private backendBaseUrl = 'http://localhost:8082/api/v2/user/'; 
  constructor(private http: HttpClient,private authService:AuthService) {}

  // Favorite management methods with JWT token
  addFavorite(movie: any): Observable<any> {
    console.log("inside addfav method",movie);
    window.location.reload();
    const url=`${this.backendBaseUrl}saveFavouriteMovie`
    return this.http.post(url,movie);
  }

  getFavorites(): Observable<any> {
    const url=`${this.backendBaseUrl}getAllFavouriteMovies`
    return this.http.get(url)
  }

  removeFavorite(id: number): Observable<any> {
    window.location.reload();
    return this.http.delete(`${this.backendBaseUrl}movies/${id}`); 
    
  }

}
