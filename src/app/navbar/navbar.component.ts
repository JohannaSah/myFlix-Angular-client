/**
 * This component represents the navbar of the movie-app, which allows the user to navigate
 * to the movies page, the user's profile, and log out. The navbar is always present at the
 * top of the app's pages, except the welcome page.
 */

// Import necessary modules from Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Component decorator
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

// Component class
export class NavbarComponent implements OnInit {
  
  /**
   * Injects the Router service.
   * @param router - The router service.
   */
  constructor(public router: Router) {}
  
  // OnInit lifecycle hook
  ngOnInit(): void {}

  /**
   * Navigates to the movies page when the Movies button is clicked.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user profile when the Profile button is clicked.
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user by clearing the token and username from local storage.
   * Navigates to the welcome page after logout.
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}