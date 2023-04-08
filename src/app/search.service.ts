/**
 * Defines the SearchService, which handles API requests for movie searches.
 * 
 * This service uses the HttpClient module to send GET requests to an external API. 
 * It defines an interface for the expected shape of response data and a method for 
 * searching for movies based on user input.
 */

// import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Defines the structure of a movie object.
 */
export interface Movie {
  _id: string;
  Title: string;
  Director: {
    Name: string;
    Bio: string;
    YearOfBirth: string;
    YearOfDeath: string;
  };
  Genre: {
    Name: string;
    Description: string;
  };
  Description: string;
  Featured: boolean;
  imageUrl: string;
}

/**
 * Marks a class as available to be provided and injected as a dependency.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Service responsible for searching movies.
 */
export class SearchService {

  /** The base URL of the API. */
  private apiUrl = 'https://movieapi-dcj2.onrender.com/';

  /**
   * Creates a new instance of the search service.
   * @param http The HttpClient instance to use for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Searches for movies based on the provided query and search criteria.
   * @param query The search query to use.
   * @param searchBy The criteria to search by (e.g. "Title", "Genre.Name", etc.).
   * @returns An observable that emits an array of Movie objects.
   */
  search(query: string, searchBy: string): Observable<Movie[]> {
    const url = `${this.apiUrl}movies?${searchBy}=${query}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response && response.data) {
          return response.data as Movie[];
        }
        console.log(response.data as Movie[]);
        return [];
      })
    );
  }
}