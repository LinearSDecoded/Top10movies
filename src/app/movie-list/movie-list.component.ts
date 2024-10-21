import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchText: string = '';
  isAscending: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getTop10Movies().subscribe((response: any) => {
      console.log(response.data);
      this.movies = response.data;
      this.filteredMovies = [...this.movies];
      this.sortMovies();
    });
  }

  sortMovies(): void {
    this.filteredMovies.sort((a, b) => {
      const titleA = a.titleText.text.toLowerCase() || '';
      const titleB = b.titleText.text.toLowerCase() || '';
      if (titleA < titleB) return this.isAscending ? -1 : 1;
      if (titleA > titleB) return this.isAscending ? 1 : -1;
      return 0;
    });
  }

  toggleSortOrder(): void {
    this.isAscending = !this.isAscending;
    this.sortMovies();
  }

  filterMovies(): void {
    const searchTextLower = this.searchText.toLowerCase();

    if (!searchTextLower) {
      this.filteredMovies = [...this.movies];
    } else {
      this.filteredMovies = this.movies.filter(movie => {
        const titleMatches = movie.titleText?.text?.toLowerCase().includes(searchTextLower) || false;
        const plotMatches = movie.plot?.plotText?.text?.toLowerCase().includes(searchTextLower) || false;
        return titleMatches || plotMatches;
      });
    }

    this.sortMovies();
  }

}