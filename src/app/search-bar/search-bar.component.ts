import { Component, OnInit } from '@angular/core';
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

  constructor(
    private searchService: SearchService,
    private fetchApiDataService: FetchApiDataService
  ) { 
    this.searchQuery = '';
    this.query = '';
    this.movies = [];
  }

  ngOnInit() {
  }

  search() {
    this.searchService.search(this.searchQuery, this.searchBy).subscribe((movies) => {
      this.movies = movies.filter(movie => {
        const title = movie.Title.toLowerCase();
        const director = movie.Director.Name.toLowerCase();
        const genre = movie.Genre.Name.toLowerCase();
        const query = this.searchQuery.toLowerCase();

        return title.includes(query) || director.includes(query) || genre.includes(query);
      });

      // Call your fetchApiService method here passing the `movies` array
      this.fetchApiDataService.getOneMovie();
    });
  }
}
