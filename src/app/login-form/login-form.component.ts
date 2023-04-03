// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  @Input() userDetails = { Username: '', Password: '' };

  //
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  loginUser(): void {
    //
    this.fetchApiData.userLogin(this.userDetails).subscribe((response) => {
      //
      console.log(response);
      //
      this.dialogRef.close();
      //
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
    });
  }

}
