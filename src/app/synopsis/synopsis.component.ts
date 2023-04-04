import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//
@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})

//
export class SynopsisComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageUrl: string,
      Title: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
