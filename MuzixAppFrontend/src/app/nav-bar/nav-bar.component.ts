import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';
import { SearchService } from '../services/search.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  movies: any[] = [];
 
    constructor(
      private movieService: MovieService,
      private searchService: SearchService,
      public authService: AuthService,
    private router: Router
    ) {}
    ngOnInit(): void {
      this.movieService.getRandomMovies().subscribe(
        (data: any) => {
          this.movies = data.map((movie: any) => ({
            ...movie,
            showDetails: false
          }));
          this.searchService.updateMovies(this.movies); // Initialize movies in the service
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
    }
  
  
    private normalizeText(text: string): string {
      return text.toLowerCase().replace(/\s+/g, ' ').trim();
    }  
   
    onLogout(): void {
      this.authService.logout();
      window.location.reload();
      this.router.navigate(['/']); // Redirect to home page after logout
    }
    
 
}
  



