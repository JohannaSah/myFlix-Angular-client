/**
 * SearchBarComponent is responsible for displaying the search bar and processing user search input.
 */

// import necessary modules and services
import { Component, OnInit } from '@angular/core';
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
   */
  searchQuery: string;
  query: string;
  searchBy: string = 'title';
  movies: any[];

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
    this.searchService.search(this.searchQuery, this.searchBy).subscribe((movies) => {
      // Filters the movie array to only include movies that match the search query.
      this.movies = movies.filter(movie => {
        const title = movie.Title.toLowerCase();
        const director = movie.Director.Name.toLowerCase();
        const genre = movie.Genre.Name.toLowerCase();
        const query = this.searchQuery.toLowerCase();

        return title.includes(query) || director.includes(query) || genre.includes(query);
      });

      // Calls the fetchApiDataService's getOneMovie method, passing in the search query.
      this.fetchApiDataService.getOneMovie(this.searchQuery);
    });
  }
}