import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {
 movieId: number | undefined;
 movieDetails:any;
 videoUrl: SafeResourceUrl | null = null;
 cast: any[] = [];
 imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
 recommendedMovies:any[]=[];
 favoriteMovieList: any[] = [];

 constructor(
   private movieService: MovieService,
   private snackBar: MatSnackBar,
   private sanitizer: DomSanitizer,
   private ac:ActivatedRoute,
  private favService:FavoritesService) {}

 ngOnInit(): void {

  this.ac.paramMap.subscribe(params => {
    const id = params.get('id');
    
    if (id) {
      this.movieId = +id;
      this.fetchMovieVideos(this.movieId);
      this.fetchMovieDetails();
      this.fetchRecommendedMovies();
    } else {
      console.error('Movie ID is null');
    }
  });

  this.favService.getFavorites().subscribe(favorites => {
    this.favoriteMovieList = favorites;
  });

 }


 fetchMovieVideos(movieId:number): void {
   this.movieService.getMovieVideos(movieId).subscribe(
     (response: any) => {
       const trailer = response.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
       const videoKey = trailer ? trailer.key : null;
       if (videoKey) {
         this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoKey}`);
       }
     },
     (error: any) => {
       console.error('Error fetching movie trailer:', error);
     }
   );
 }
 
 loadFavoriteMovies(): void {
  this.favService.getFavorites().subscribe({
    next: (data: any[]) => {
      this.favoriteMovieList = data;
    },
    error: (error: any) => {
      console.error('Error fetching favorite movies:', error);
    }
  });
}


 fetchMovieDetails(): void {
   if (!this.movieId) {
     console.error('Invalid movie ID');
     return;
   }
 
   this.movieService.getMovieDetails(this.movieId).subscribe({
     next: (response: any) => {
       this.movieDetails = response;
       console.log('fetchedMovieDetails', this.movieDetails);
     },
     error: (error: any) => {
       console.error('Error fetching movie details:', error);
     }
   });
 }

//  fetchMovieCast(): void {
//   if (this.movieId !== undefined) {
//     this.movieService.getMovieCast(this.movieId).subscribe(
//       (response: { crew: any[]; }) => {
//         this.cast = response.crew.filter((cast: any) => cast.profile_path != null);
//       },
//       (error: any) => {
//         console.error('Error fetching movie cast:', error);
//       }
//     );
//   } else {
//     console.error('Invalid movie ID');
//   }
// }
 

fetchRecommendedMovies(): void {
  if (this.movieId !== undefined) {
    this.movieService.getRecommendedMovies(this.movieId).subscribe(
      (response) => {
        // console.log("Fetched Recommended Movies ",response.results);
        this.recommendedMovies = response.results.filter((movie:any)=>(movie.poster_path!=null));
      },
      (error) => {
        console.error('Error fetching recommended movies:', error);
      }
    );
  } else {
    console.error('Invalid movie ID');
  }
}

showDetails(movie: any): void {
  movie.showDetails = true;
}

hideDetails(movie: any): void {
  movie.showDetails = false;
}

isFavorite(movieId: any): boolean {
  return this.favoriteMovieList.some((fav: any) => fav.id === movieId);
}

toggleFavorite(movie: any): void {
  const isFavorited = this.isFavorite(movie.id);

  if (isFavorited) {
    // window.location.reload();
    this.favService.removeFavorite(movie.id).subscribe({
      next: data => {
        this.favoriteMovieList = data;
        this.snackBar.open('Movie removed from favorites!', 'Success', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      },
      error: err => {
        this.snackBar.open('Failed to remove from favorites. Try again later.', 'Failure', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    });
  } else {
    
    this.favService.addFavorite(movie).subscribe({
      next: data => {
        this.favoriteMovieList = data;
        this.snackBar.open('Added to favorites', 'Success', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
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
