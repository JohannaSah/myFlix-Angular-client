/**
 * This is the user profile component
 * it displays the user's information and allows them to change it
 * as well as to delete the profile.
*/

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

  /**
   * User object containing user information.
   * @property {any{}} user
   * Object containing initial user input values.
   * @property {any{}} initialInput
   * The list of user's favorite movies.
   * @property {any[]} favorites
   */
  user: any = {};
  initialInput: any = {};
  favorites: any = [];

  /**
   * The updated user information, initialized with default values.
   * @property {Object} updatedUser
   * @property {string} updatedUser.Username - The updated user's username.
   * @property {string} updatedUser.Password - The updated user's password.
   * @property {string} updatedUser.Email - The updated user's email.
   * @property {string} updatedUser.Birthday - The updated user's birthday.
   */
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Creates an instance of UserProfileComponent
   * @param fetchApiData - instance of FetchApiDataService
   * @param snackBar - instance of MatSnackBar
   * @param router - instance of Router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Calls getUserInfo()
   * @method ngOnInit
   * @returns {void}
  */
  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Fetches the user's data via the API and sets it to the component's `user` property.
   * Also sets the `updatedUser` input values to the corresponding user properties
   * and sets the `favorites` property to the user's favorite movies.
   * @returns The user's data.
   */
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

  /**
   * Update user information.
   *
   * Sends a request to the API to update the user's information based on the updatedUser object.
   * If the username or password is updated, the user is logged out and redirected to the welcome page.
   *
   * @returns void
   */
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

  /**
   * Deletes the user's account.
   * Displays a confirmation dialog to warn the user of the consequences.
   * If the user confirms, the account is deleted and the user is redirected to the welcome page.
   * If the deletion is successful, the user's information is cleared from local storage.
   * @returns void
   */
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
