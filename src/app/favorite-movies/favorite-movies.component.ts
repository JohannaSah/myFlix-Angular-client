import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreComponent } from '../genre-component/genre-component.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})

//
export class FavoriteMoviesComponent {

  //
  movies: any[] = [];
  favorites: any[] = [];

  // 
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  //
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  //
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  //
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log(resp);
      this.favorites = resp.FavoriteMovies;
      console.log(resp.FavoriteMovies);
      return this.favorites;
    });
  }

  //
  isFavorite(_id: string): boolean {
    return this.favorites.includes(_id);
  }

  //
  addToFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //
  removeFromFavorites(_id: string): void {
    console.log(_id);
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //
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

  //
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

  //
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
