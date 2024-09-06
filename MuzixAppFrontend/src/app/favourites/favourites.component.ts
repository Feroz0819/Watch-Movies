import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { FavoritesService } from '../favorites.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  imgPrefix :string = 'https://image.tmdb.org/t/p/w500/'; 
  // You can choose different sizes like 'w200', 'w300', etc.
  // When you get a poster_path from the TMDB API, it's a relative path like /pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg.
 // To use this in your application, you need to prepend to the poster_path to get the full URL of the image.
  favorites: any[] = [];

constructor(private favoriteService: FavoritesService, private tokenService: AuthService, private snackBar:MatSnackBar, private cdr: ChangeDetectorRef,private zone: NgZone ) {}

  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      // Handle unauthorized access, e.g., redirect to login
      console.log('No token found, redirecting to login...');
      return;
    }

    this.favoriteService.getFavorites().subscribe(data => {
          this.favorites = data;
        });
  }

  showDetails(movie: any): void {
    movie.showDetails = true;
  }
  hideDetails(movie: any): void {
    movie.showDetails = false;
  }
  removeFavorite(movie: any): void {
    this.favoriteService.removeFavorite(movie.id).subscribe({
      next: () => {
        window.location.reload();
      
          this.favorites = this.favorites.filter(fav => fav.id !== movie.id);
       

        this.snackBar.open('Movie removed from favorites!', 'success', {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
       
      },
      error: (error: any) => {
        this.snackBar.open('Failed to remove movie from favorites. Please try again later.', 'close', {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        console.error(error);
      }
    });
  }
}