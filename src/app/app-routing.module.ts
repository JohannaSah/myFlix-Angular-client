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
