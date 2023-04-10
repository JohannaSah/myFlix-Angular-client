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
  // Declare variables
  public showSpinner = false;
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Inject services into the component
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // Implement the OnInit interface
  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
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
