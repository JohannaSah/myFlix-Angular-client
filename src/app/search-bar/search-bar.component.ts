import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../search.service';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  searchQuery: string;
  query: string;
  searchBy: string = 'title';
  movies: any[];
  searchResults: any[];
  
  @Output() searchQueryEvent = new EventEmitter<string>();

  constructor(
    private searchService: SearchService,
    private fetchApiDataService: FetchApiDataService
  ) { 
    this.searchQuery = '';
    this.query = '';
    this.movies = [];
    this.searchResults = [];
  }

  ngOnInit() {
  }

  search() {
    const encodedSearchQuery = encodeURIComponent(this.searchQuery);
    console.log('encodedSearchQuery:', encodedSearchQuery);

    this.searchService.search(encodedSearchQuery, this.searchBy).subscribe((movies) => {
      console.log('movies:', movies);

      this.movies = movies.filter(movie => {
        const title = movie.Title.toLowerCase();
        const director = movie.Director.Name.toLowerCase();
        const genre = movie.Genre.Name.toLowerCase();
        const query = this.searchQuery.toLowerCase();

        return title.includes(query) || director.includes(query) || genre.includes(query);
      });

      console.log(`Filter successful. ${this.movies.length} movies found.`);
      console.log('found movie:', this.movies);
      console.log('Emitting search query event with query:', this.searchQuery);

      this.searchQueryEvent.emit(this.searchQuery);
    });
  }
}
