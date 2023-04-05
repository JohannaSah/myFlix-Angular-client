// Importing required modules and services
import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


// Component decorator
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

// Exporting class for user profile component
export class UserProfileComponent implements OnInit {

  // Initializing variables
  user: any = {};
  initialInput: any = {};
  favorites: any = [];

  // Initializing inputs with default values
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  // Constructor with dependency injection
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // Lifecycle hook that is called after data-bound properties are initialized
  ngOnInit(): void {
    this.getUserInfo();
  }

  // Fetch user data via API
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = new Date(this.user.Birthday).toISOString();
      this.favorites = this.user.FavoriteMovies;
      return this.user;
    });
  }

  // Update user data, such as username, password, email, or birthday
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      if (this.user.Username !== result.Username || this.user.Password !== result.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Credentials updated! Please login using your new credentials',
          'OK',
          {
            duration: 2000,
          }
        );
      }
      else {
        this.snackBar.open(
          'User information has been updated!',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }

  // Delete user data for the user that is logged in
  deleteAccount(): void {
    if (confirm('All your data will be lost - this cannnot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - we are sorry to see you go!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}