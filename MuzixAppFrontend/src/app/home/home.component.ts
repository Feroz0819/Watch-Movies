import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { MovieService } from '../services/movie.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText: string = '';
  filteredMovies: any[] = [];
  allMovies: any[] = []; // Keep a reference to all movies
  constructor(
    private searchService: SearchService,
    private movieService: MovieService
  ) {}
  ngOnInit(): void {
    this.movieService.getRandomMovies().subscribe(
      (data: any) => {
        this.allMovies = data.map((movie: any) => ({
          ...movie,
          showDetails: false
        }));
        this.filteredMovies = [...this.allMovies]; // Initialize filteredMovies with all movies
        this.searchService.updateMovies(this.filteredMovies); // Initialize movies in the service
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
    // Subscribe to updates from SearchService
    this.searchService.movies$.subscribe(movies => {
      this.filteredMovies = movies;
    });
  }
  onSearch(): void {
    if (this.searchText.trim() === '') {
      this.filteredMovies = [...this.allMovies]; // Reset to all movies if search text is cleared
    } else {
      this.filteredMovies = this.allMovies.filter(movie =>
        this.normalizeText(movie.title).includes(this.normalizeText(this.searchText))
      );
    }
    this.searchService.updateMovies(this.filteredMovies); // Update movies in the service
  }
  private normalizeText(text: string): string {
    return text.toLowerCase().replace(/\s+/g, ' ').trim();
  }
}