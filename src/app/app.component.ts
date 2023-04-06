/**
 * The root component of the Angular application.
 * It defines the app title, and serves as the root node of the component tree.
 * @class
 */

// Importing required modules and services
import { Component } from '@angular/core';

// Component decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// Exporting AppComponent
export class AppComponent {

  /**
   * The title of the Angular application.
   * @property {string} title
   */
  title = 'myFlix-Angular-client';
}