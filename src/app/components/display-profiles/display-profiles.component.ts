import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-profiles',
  templateUrl: './display-profiles.component.html',
  styleUrls: ['./display-profiles.component.css']
})
export class DisplayProfilesComponent implements OnInit {
  profiles = [0, 1, 2, 3, 4, 5, 6];
  class = 'col s12 m12';
  constructor() { }

  ngOnInit() {
  }

}
