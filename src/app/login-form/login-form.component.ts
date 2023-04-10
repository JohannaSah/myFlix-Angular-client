/**
* This is the login form component
* it is displayed on the welcome page when the login button is clicked
* it allows users to log in and shows a spinner while processing the login request
*/

// Import necessary components and services
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Declare the component and its metadata
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

// Declare the component class
export class LoginFormComponent {
  // Declare variables
  public showSpinner = false;
  @Input() userDetails = { Username: '', Password: '' };

  /**
  * The constructor for the LoginFormComponent
  * @param fetchApiData - The service for fetching data from the API
  * @param dialogRef - A reference to the MatDialog that launched the component
  * @param snackBar - A service for displaying snackbars with feedback messages
  * @param router - The router service for navigating between routes
  */
  constructor(
    public fetchApiData:FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Implement the OnInit interface
  ngOnInit(): void {
  }

  /**
  * Logs the user in and performs necessary actions
  * Sends a login request to the API with the entered credentials
  * Shows a spinner while processing the request
  * Displays feedback messages on success or failure
  * if successful login it navigated user to the movies page
  */
  loginUser(): void {
    // Show spinner
    this.showSpinner = true;
    // Subscribe to the API login method
    this.fetchApiData.userLogin(this.userDetails).subscribe((response) => {
        // Store response data in localStorage
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        // Close the dialog
        this.dialogRef.close();
        // Display success message
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });
        // Navigate to movies page
        this.router.navigate(['movies']);
    }, (error) => {
        // Hide spinner
        this.showSpinner = false;
        // Display error message
        this.snackBar.open('Login unsuccessful', 'OK', { duration: 2000 });
    });
  }

}
