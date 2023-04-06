/**
 * This is the synopsis component
 * it is used in movie cards both in the view of all movies as well as favorite movies
 * it is called when clicking the synopsis button on a movie card and displays information about the movie's synopsis
 * the synopsis information is passed to it from a parent component (movie card component)
 */

// Import necessary dependencies
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Define the component
@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})

// Component class
export class SynopsisComponent {
  
  /**
   * Constructor for the synopis component with injected dependencies
   * @param data - An object containing the movie's image URL, title, and description
   * @param router - Injecting Router to navigate to different routes
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageUrl: string,
      Title: string;
      Description: string;
    },
    public router: Router
  ) {}

  // OnInit lifecycle hook
  ngOnInit(): void {}
}
