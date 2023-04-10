// Importing necessary modules from Angular
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Component decorator, which  marks a class as an Angular component and provides configuration metadata that determines how the component should be processed, instantiated, and used at runtime.
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})

// Component class
export class DirectorComponent implements OnInit {
  // Constructor function that injects data from the parent component
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}

  // OnInit lifecycle hook
  ngOnInit(): void {}
}