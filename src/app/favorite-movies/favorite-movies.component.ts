/**
 * A component that represents the favorite movie section on the user profile page of the application.
 * This component displays the movies added to the favorites list, allows for the removel from the favorites list 
 * and lets users view the details about the movies on the list
 */

// Importing required modules and servies
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Importing required components
import { GenreComponent } from '../genre-component/genre-component.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

// Component decorator with metadata
@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})

// Component class 
export class FavoriteMoviesComponent {

  /**
   * The list of all movies.
   * @property {any[]} movies
   * * The list of user's favorite movies.
   * @property {any[]} favorites
  */
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * Creates an instance of the FavoriteMoviesComponent.
   * @constructor
   * @param {FetchApiDataService} fetchApiData - The fetch API data service to get the movie data.
   * @param {MatDialog} dialog - The dialog service to display a dialog box.
   * @param {MatSnackBar} snackBar - The snackbar service to display a notification.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Calls getMovies() and getFavoriteMovies().
   * @method ngOnInit
   * @returns {void}
  */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

 /**
   * Method to retrieve all movies from the database.
   * @method getMovies
   * @returns {void}
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
   * Method to retrieve the user's favorite movies from the database.
   * @method getFavoriteMovies
   * @returns {void}
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log(resp);
      this.favorites = this.movies.filter(movie => this.movies.filter(movie => resp.FavoriteMovies.includes(movie._id)).includes(movie._id));
      console.log(this.favorites, 'favourites', 'favorites');
      return this.favorites; 
    });
  }

  /**
   * Method to check if a movie is in the user's favorites list.
   * @method isFavorite
   * @param {string} _id - The ID of the movie.
   * @returns {boolean} - True if the movie is in the user's favorites list, false otherwise.
   */
  isFavorite(_id: string): boolean {
    let isFavorite = this.favorites.some(movie => movie._id == _id)
    return isFavorite;
  }

  /**
   * Method to add a movie to the user's favorites list.
   * Calls the addFavoriteMovie() method from fetchApiData service.
   * Displays a snackbar notification.
   * @method addToFavorites
   * @param {string} _id - The ID of the movie.
   * @returns {void}
   */
  addToFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Method to remove a movie from the user's favorites list
   * @param _id - The ID of the movie to be removed from favorites
   * @returns void
   */
  removeFromFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

   /**
   * Opens a dialog box to display the details of a given genre.
   * @param name - The name of the genre to be displayed.
   * @param description - The description of the genre to be displayed.
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '50%',
      minWidth: '300px'
    });
  }

  /**
   * Opens a dialog box to display the details of a given director.
   * @param name - The name of the director to be displayed.
   * @param bio - The biography of the director to be displayed.
   * @param birthyear - The birthyear of the director to be displayed.
   */
  openDirectorDialog(name: string, bio: string, birthyear: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthyear,
      },
      width: '50%',
      minWidth: '300px'
    });
  }

  /**
   * Opens a dialog box to display the synopsis details of a given movie.
   * @param imageUrl - The URL of the image associated with the movie to be displayed.
   * @param title - The title of the movie to be displayed.
   * @param description - The description of the movie to be displayed.
   */
  openSynopsisDialog(imageUrl: string, title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        imageUrl: imageUrl,
        Title: title,
        Description: description,
      },
      width: '50%',
      minWidth: '300px'
    });
  }
}
