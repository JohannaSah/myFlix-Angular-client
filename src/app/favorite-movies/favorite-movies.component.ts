// Importing required modules
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

// Component class definition
export class FavoriteMoviesComponent {

  // Initializing variables
  movies: any[] = [];
  favorites: any[] = [];

  // Component constructor with required service injections
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // Lifecycle hook that is called when the component is initialized
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  // Method to retrieve all movies from the database
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  // Method to retrieve the user's favorite movies from the database
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log(resp);
      this.favorites = resp.FavoriteMovies;
      console.log(resp.FavoriteMovies);
      return this.favorites;
    });
  }

  // Method to check if a movie is in the user's favorites list
  isFavorite(_id: string): boolean {
    return this.favorites.includes(_id);
  }

  // Method to add a movie to the user's favorites list
  addToFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  // Method to remove a movie from the user's favorites list
  removeFromFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  // Method to open a dialog box to display genre details
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

  // Method to open a dialog box to display director details
  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      width: '50%',
      minWidth: '300px'
    });
  }

  // Method to open a dialog box to display movie synopsis details
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
