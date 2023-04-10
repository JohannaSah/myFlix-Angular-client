/**
 * SearchBarComponent is responsible for displaying the search bar and processing user search input.
 */

// import necessary modules and services
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../search.service';
import { FetchApiDataService } from '../fetch-api-data.service';

// component decorator
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  /**
   * The user's search query input.
   * @property {string} searchQuery
   * 
   * The query string used to search for movies.
   * @property {string} query
   * 
   * The category to search for movies by.
   * @property {string} searchBy
   * 
   * An array of movie objects that match the search query.
   * @property {any[]} movies
   * 
   * An array of search result objects
   * @property {any[]} searchResults
   */
  searchQuery: string;
  query: string;
  searchBy: string = 'title';
  movies: any[];
  searchResults: any[];

  /**
   * Event emitter that emits an array of search query results.
  */
  @Output() searchQueryEvent = new EventEmitter<any[]>();

  /**
   * SearchBarComponent constructor that injects the required services for searching movies.
   *
   * @constructor
   * @param {SearchService} searchService - The SearchService for searching movies.
   * @param {FetchApiDataService} fetchApiDataService - The FetchApiDataService for fetching movie data from the API.
   */
  constructor(
    private searchService: SearchService,
    private fetchApiDataService: FetchApiDataService
  ) { 
    this.searchQuery = '';
    this.query = '';
    this.movies = [];    
    this.searchResults = [];
  }

  // Lifecycle hook that is called when the component is initialized.
  ngOnInit() {
  }

  /**
   * Searches for movies that match the user's search query and category by calling the SearchService's search method.
   * Filters the movie array to only include movies that match the search query.
   * Then calls the FetchApiDataService's getOneMovie method, passing in the search query.
   *
   * @method
   * @returns {void}
   */
  search() {
    const encodedSearchQuery = encodeURIComponent(this.searchQuery);
    console.log('encodedSearchQuery:', encodedSearchQuery);

    this.searchService.search(encodedSearchQuery, this.searchBy).subscribe((movies) => {
      console.log('movies:', movies);
      // Filters the movie array to only include movies that match the search query.
      this.movies = movies.filter(movie => {
        const title = movie.Title.toLowerCase();
        const director = movie.Director.Name.toLowerCase();
        const genre = movie.Genre.Name.toLowerCase();
        const query = this.searchQuery.toLowerCase();

        return title.includes(query) || director.includes(query) || genre.includes(query);
      });

      console.log(`Filter successful. ${this.movies.length} movies found.`);
      console.log('found movie:', this.movies); // this is the result I want to send to the moviecardcomponent
      console.log('Emitting search query event with query:', this.searchQuery);
  
      this.searchQueryEvent.emit(this.movies);

      this.searchQuery = '';
    });
  }
}