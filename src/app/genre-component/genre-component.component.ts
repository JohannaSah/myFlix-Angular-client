/**
 * This is the genre component
 * it is used in movie cards both in the view of all movies as well as favorite movies
 * it is called when clicking the genre button on a movie card and displays information about the movie's genre
 * the genre information is passed to it from a parent component (movie card component)
 */

// Importing necessary components from Angular
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Component decorator with selector, template and styles
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre-component.component.html',
  styleUrls: ['./genre-component.component.scss'],
})

// Exporting the class for the genre component
export class GenreComponent implements OnInit {

   /**
   * Constructor for the genre component with injected dependencies
   * 
   * @param data - Injecting MAT_DIALOG_DATA to get the data passed to the dialog
   * @param router - Injecting Router to navigate to different routes
   */
  constructor(
    // Injecting MAT_DIALOG_DATA to get the data passed to the dialog
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    },
    // Injecting Router to navigate to different routes
    public router: Router
  ) {}

  // Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive
  ngOnInit(): void {}

}