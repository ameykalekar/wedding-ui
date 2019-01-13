import { Component, OnInit, Input } from '@angular/core';
import { ProfileVo } from '../../vo/profile-vo';

@Component({
  selector: 'app-display-profiles',
  templateUrl: './display-profiles.component.html',
  styleUrls: ['./display-profiles.component.css']
})
export class DisplayProfilesComponent implements OnInit {
  @Input()
  profiles: ProfileVo[];



  class = 'col s12 m4';
  constructor() {

    console.log('profileconstructor' + this.profiles);
  }

  ngOnInit() {
    console.log('init' + this.profiles);
   
  }

}
