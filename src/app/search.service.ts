import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private apiUrl = 'https://movieapi-dcj2.onrender.com/';
  public searchQuery = new BehaviorSubject<string>('');
  public searchResults = new EventEmitter<any[]>();

  constructor(private http: HttpClient) { }

  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }

  getSearchQuery(): BehaviorSubject<string> {
    return this.searchQuery;
  }

  getSearchResults(): EventEmitter<Movie[]> {
    return this.searchResults;
  }

  search(query: string, searchBy: string): Observable<Movie[]> {
    const url = `${this.apiUrl}movies?${searchBy}=${query}`;
    console.log('api url:', url);
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log('reponse:', response);
        if (response && response) {
          const movies = response as Movie[];
          console.log('response as movie[]', movies);
          this.searchResults.emit(movies); 
          console.log('searchresult',movies);
          return movies;
        }
        return [];
      })
    );
  }
}
