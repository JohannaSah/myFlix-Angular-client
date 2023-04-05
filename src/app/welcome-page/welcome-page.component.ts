// Importing required modules and services
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
  
  // Constructor to inject required services
  constructor(public dialog: MatDialog) { }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
  }

  // Open dialog for user registration form
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  // Open dialog for user login form
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '280px'
    });
  }
}