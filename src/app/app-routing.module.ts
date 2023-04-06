/**
 * The AppRoutingModule module defines the routes for the Angular application.
 * It imports the RouterModule and defines the routes array, which is empty in this case.
 * It exports the RouterModule for use in other modules.
 * @module
 */

// Importing required modules and services
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Defining routes for the application
const routes: Routes = [];

// NgModule decorator for defining module properties
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// Exporting AppRoutingModule module
export class AppRoutingModule { }
