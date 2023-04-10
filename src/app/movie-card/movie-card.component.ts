/**
 * This component displays a list of movie cards, each of which contains information about a specific movie.
 * Users can add or remove movies from their list of favorite movies by clicking on the corresponding buttons.
 * Users can also click on buttons to view additional information about the movie, such as its genre, director, and synopsis.
 * The component gets data from an API service and displays it using Angular Material components.
*/

// Importing necessary components and services
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// These imports are for the various dialog components that open on clicking a movie card's button
import { GenreComponent } from '../genre-component/genre-component.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

/**
 * Movie card component that displays all the movies
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

// Declare the component class
export class MovieCardComponent {

  /**
   * The list of all movies.
   * @property {any[]} movies
   *
   *  The list of user's favorite movies.
   * @property {any[]} favorites
   * 
   *  The searchQuery string
   * @property {''} searchQueryEvent
   * 
   * The searchResults list
   * @property {any[]} searchResults
   */
  movies: any[] = [];
  favorites: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];

  /**
   * Constructor function that sets up the component with necessary dependencies
   * @param {FetchApiDataService} fetchApiData - Service that fetches data from the API
   * @param {MatDialog} dialog - Service for displaying dialog components
   * @param {MatSnackBar} snackBar - Service for displaying snack bar notifications
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
   * Updates the list of movies with the filtered movies and logs the filtered movies to the console.
   * @param filteredMovies An array of movie objects that match the search query and search criteria.
   * @returns void
   */
  receiveFilteredMovies(filteredMovies: any[]): void {
    this.movies = filteredMovies;
    console.log('filteredMovies', filteredMovies);
    this.searchResults = filteredMovies;
  }

  /**
   * Function to get all the movies from the database and store them in the movies array
   * @returns {any[]} - Array of all the movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
   * Function to get the user's favorite movies from the database and store them in the favorites array
   * @returns {any[]} - Array of the user's favorite movies
  */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Function to check if a movie is in the user's favorites
   * @param {_id} - The movie ID to check
   * @returns {boolean} - Whether or not the movie is in the user's favorites
  */
  isFavorite(_id: string): boolean {
    return this.favorites.includes(_id);
  }

  /**
   * Function to add a movie to the user's favorites
   * @param {_id} - The movie ID to add to favorites
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
   * Function to remove a movie from the user's favorites
   * @param {_id} - The movie ID to remove from favorites
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
   * Opens the genre dialog component when a genre button is clicked
   * 
   * @param name The name of the genre
   * @param description The description of the genre
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
   * Opens the director dialog component when a director button is clicked
   * 
   * @param name The name of the director
   * @param bio The biography of the director
   * @param birthyear The birth year of the director
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
   * Opens the synopsis dialog component when a synopsis button is clicked
   * 
   * @param imageUrl The URL of the movie's image
   * @param title The title of the movie
   * @param description The description of the movie
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
