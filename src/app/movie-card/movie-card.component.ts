// Importing necessary components and services
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// These imports are for the various dialog components that open on clicking a movie card's button
import { GenreComponent } from '../genre-component/genre-component.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

// Import other necessary components and services
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchService } from '../search.service';

// Declare the component and its metadata
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

// Declare the component class
export class MovieCardComponent {

  searchQuery: string = '';
  searchResults: any[] = [];

  // Thesse arrays will hold all of the movies and the favorite movies
  movies: any[] = [];
  favorites: any[] = [];

  // The constructor function sets up the component with necessary dependencies
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // The ngOnInit function is called when the component is first initialized
  ngOnInit(): void {
    // Call the getMovies function when the component is first initialized
    this.getMovies();
    // Call the getFavoriteMovies function when the component is first initialized
    this.getFavoriteMovies();
  }

  receiveFilteredMovies(filteredMovies: any[]): void {
    this.movies = filteredMovies;
    console.log('filteredMovies', filteredMovies);
    this.searchResults = filteredMovies;
  }

  // Function to get all the movies from the database and store them in the movies array
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('this.movies from getMovies():', this.movies);
      
      return this.movies;
    })
  }

  // Function to get the user's favorite movies from the database and store them in the favorites array
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  // Function to check if a movie is in the user's favorites
  isFavorite(_id: string): boolean {
    return this.favorites.includes(_id);
  }

  // Function to add a movie to the user's favorites
  addToFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  // Function to remove a movie from the user's favorites
  removeFromFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  // Function to open the genre dialog component when a genre button is clicked
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

  // Function to open the director dialog component when a director button is clicked
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

  // Function to open the synopsis dialog component when a synopsis button is clicked
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
