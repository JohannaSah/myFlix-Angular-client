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

  // Inject services into the component
  constructor(
    public fetchApiData:FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Implement the OnInit interface
  ngOnInit(): void {
  }

  // Define the loginUser method
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
