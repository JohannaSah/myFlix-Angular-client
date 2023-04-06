/**
 * This is the director component
 * it is used in movie cards both in the view of all movies as well as favorite movies
 * it is called when clicking the director button on a movie card and displays information about the movie's director
 * the director information is passed to it from a parent component (movie card component)
 */

//importing required modules from angular
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Angular component that displays information about a movie director.
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})

// class component 
export class DirectorComponent implements OnInit { 
  
  /**
  * Constructor function that injects data from the parent component.
  * @param {any} data The data object passed from the parent component.
  * @param {string} data.Name The name of the director.
  * @param {string} data.Bio The biography of the director.
  * @param {string} data.Birth The birth year of the director.
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}

  // OnInit lifecycle hook
  ngOnInit(): void {}
}