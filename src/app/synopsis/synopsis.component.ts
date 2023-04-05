// Import necessary dependencies
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Define the component
@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})

// Component class
export class SynopsisComponent {
  
  //Inject the dialog data
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageUrl: string,
      Title: string;
      Description: string;
    }
  ) {}

  // OnInit lifecycle hook
  ngOnInit(): void {}
}
