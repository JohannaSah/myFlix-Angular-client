/**
 * This is the user registration component
 * This component handles user registration 
 * by sending the form inputs to the backend and displaying success or error messages.
 * it is displayed on the welcome page, when the register button is clicked
*/

// import necessary modules and services
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Declare the component and its metadata
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

// Declare the component class
export class UserRegistrationFormComponent {
  
  /**
   * Flag that determines whether or not to display the spinner.
   */
  public showSpinner = false;

  /**
   * User data object that contains the input values from the registration form.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData - The API service responsible for handling HTTP requests.
   * @param dialogRef - The reference to the dialog opened by the component.
   * @param snackBar - The Angular Material component responsible for displaying snack bar messages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // Implement the OnInit interface
  ngOnInit(): void {
  }

  /**
   * registerUser()
   * Sends the user registration form inputs to the backend for user registration.
   * Displays a success message and closes the dialog if the registration is successful,
   * otherwise displays an error message.
   */
  registerUser(): void {
    // Show spinner
    this.showSpinner = true;
    // Subscribe to the API registration method
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      console.log(response);
      // Close the dialog
      this.dialogRef.close();
      // Display success message
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (error) => {
      // Hide spinner
      this.showSpinner = false;
      // Display error message
      this.snackBar.open('Registration unsuccessful', 'OK', { duration: 2000 });
  });
}

}
