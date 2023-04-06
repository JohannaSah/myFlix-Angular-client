/**
 * fetchDataService
 * Fetches data from the API.
 */

// Importing required modules and services
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Declares the API URL that will provide data for the client app.
 */
const apiUrl = 'https://movieapi-dcj2.onrender.com/';

/**
 * Marks a class as available to be provided and injected as a dependency.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Defines the class responsible for fetching data from the API.
 */
export class FetchApiDataService {
  
  /**
   * Constructs an instance of the class.
   * @param http - the HttpClient module
   */
  constructor(private http: HttpClient) {}

  /**
   * Makes an API call to register a new user.
   * @param userDetails - the user registration details
   * @returns the response data from the API
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to log in a user.
   * @param userDetails - the user login details
   * @returns the response data from the API
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to get all movies.
   * @returns the response data from the API
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Makes an API call to get a movie by ID.
   * @param _id - the ID of the movie
   * @returns the response data from the API
   */
  public getMovieById(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${_id}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Makes an API call to get a movie by title.
   * @param Title - the title of the movie
   * @returns the response data from the API
   */
  public getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    })})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to get a director by name.
   * @param directorName - the name of the director
   * @returns the response data from the API
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Makes an API call to retrieve the genre with the given name.
   * @param genreName - The name of the genre to retrieve.
   * @returns An Observable that emits the response from the API call.
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${genreName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Makes an API call to retrieve the details of the logged-in user.
   * @returns An Observable that emits the response from the API call.
   */
  public  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Makes an API call to retrieve the favorite movies of the user with the given username.
   * @param username - The username of the user to retrieve the favorite movies of.
   * @returns An Observable that emits the response from the API call.
   */
  public getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Makes an API call to add the movie with the given ID to the list of favorite movies for the logged-in user.
   * @param _id - The ID of the movie to add to the list of favorite movies.
   * @returns An Observable that emits the response from the API call.
   */
  public addFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${localStorage.getItem('user')}/movies/${_id}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to edit the details of the logged-in user.
   * @param userDetails - The details of the user to edit.
   * @returns An Observable that emits the response from the API call.
   */
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${localStorage.getItem('user')}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to delete the account of the logged-in user.
   * @returns An Observable that emits the response from the API call.
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${localStorage.getItem('user')}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to remove the movie with the given ID from the list of favorite movies for the logged-in user.
   * @param _id - The ID of the movie to remove from the list of favorite movies.
   * @returns An Observable that emits the response from the API call.
   */
  public removeFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${localStorage.getItem('user')}/movies/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Extracts response data from the HTTP response.
   * @param res The HTTP response or response body.
   * @returns The response body or an empty object if response body is undefined.
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles HTTP errors.
   * @param error The HTTP error response.
   * @returns An observable of the error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

}