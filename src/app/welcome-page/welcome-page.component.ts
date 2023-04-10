/**
 * The WelcomePageComponent displays a welcome page with buttons to open dialogs for user registration and login.
*/

// Importing required modules, components and services
import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

// Component decorator to define component's metadata
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

// Component class
export class WelcomePageComponent implements OnInit {
  
  /**
   * Constructor to inject the MatDialog service.
   * 
   * @param dialog - The MatDialog service to open dialogs.
   */
  constructor(public dialog: MatDialog) { }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
  }

  /**
   * Opens the dialog for the user registration form.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the dialog for the user login form.
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px'
    });
  }
}