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

  // Inject Router service
  constructor(public router: Router) {}
  
  // OnInit lifecycle hook
  ngOnInit(): void {}

  // Navigates to movies page, called when the Movies button is clicked
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  // Navigates to user profile, called when the Profile button is clicked
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  // logs out user, clears token and username from local storage, called when the Logout button is clicked
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}