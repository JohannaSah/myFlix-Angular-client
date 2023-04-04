import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre-component.component.html',
  styleUrls: ['./genre-component.component.scss'],
})

//
export class GenreComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    },
    public router: Router
  ) {}

  ngOnInit(): void {}

}