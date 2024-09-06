import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
// import { FavoriteService } from '../services/favorite.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']  // Fixed the typo here
})
export class RecommendedComponent implements OnInit {

  private favoriteSubject = new BehaviorSubject<boolean>(false);
  favorite$ = this.favoriteSubject.asObservable();

  @Input()
  movies: any[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500/';
  favoriteMovieList: any[] = [];
  isFavorited: boolean = false;
  searchText?:string;

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoritesService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadFavoriteMovies();

    this.favorite$.subscribe(isFavorited => {
      this.isFavorited = isFavorited;
      this.cdRef.detectChanges();
    });
  }

  search(searchText: any) {
    if (searchText === '' || !searchText) {
      this.movieService.getRandomMovies().subscribe(
        data=>{this.movies=data;}
      )
      
    } else {
      this.movieService.getRandomMovies().subscribe(
        data=>{this.movies=data;}
      )
      this.movieService.getRandomMovies().subscribe(
        data=>{this.movies=data;
          searchText = searchText.toLowerCase();
          this.movies = this.movies.filter(product => product.name?.toLowerCase().includes(searchText));
        }
      )
      
    }
  }

  loadMovies() {
    
    this.movieService.getRandomMovies().subscribe(
      (data: any) => {
        this.movies = data.map((movie: any) => ({
          ...movie,
          showDetails: false
        }));
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  loadFavoriteMovies() {
    // window.location.reload();
    this.favoriteService.getFavorites().subscribe(
      (data: any[]) => {
        
        this.favoriteMovieList = data;
        
      },
      (error) => {
        console.error('Error fetching favorite movies', error);
      }
    );
  }

  showDetails(movie: any): void {
    movie.showDetails = true;
  }

  hideDetails(movie: any): void {
    movie.showDetails = false;
  }

  isFavorite(movieId: any): boolean {
    if(this.favoriteMovieList==null){
      return false;
    }
    return this.favoriteMovieList.some((fav: any) => fav.id === movieId);
  }

  toggleFavorite(movie: any): void {
    const isFavorited = this.isFavorite(movie.id);

    if (isFavorited) {
      window.location.reload();
      this.favoriteService.removeFavorite(movie.id).subscribe({
        
        next: data => {
          window.location.reload();
          this.favoriteMovieList = data;
          this.snackBar.open('Movie removed from favorites!', 'Success', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
           window.location.reload();
          this.favoriteSubject.next(false);
        },
        error: err => {
          this.snackBar.open('Failed to remove from favorites. Try again later.', 'Failure', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      });
      
    } else {
      this.favoriteService.addFavorite(movie).subscribe({
        next: data => {
          this.favoriteMovieList = data;
          this.snackBar.open('Added to favorites', 'Success', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          window.location.reload();
          this.favoriteSubject.next(true);
        },
        error: err => {
          this.snackBar.open('Failed to add to favorites. Try again later.', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      });
    }
  }
}
