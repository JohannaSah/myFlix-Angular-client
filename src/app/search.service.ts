import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  search(query: string, searchBy: string): Observable<Movie[]> { 
    const url = `${this.apiUrl}movies?${searchBy}=${query}`;
    console.log(url);
    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response);
        if (response && response.data) {
          const movies = response.data as Movie[];
          return movies.filter(movie => movie.Title.toLowerCase().includes(query.toLowerCase()));
        }
        console.log(response.data as Movie[]);
        console.log('no movie found');
        return [];
      })
    );
  }
}
