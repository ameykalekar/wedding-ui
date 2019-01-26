import { Component, OnInit, Input } from '@angular/core';
import { ProfileVo } from '../../vo/profile-vo';

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.css']
})
export class ProfileStatusComponent implements OnInit {

  constructor() { }

  profileVo: ProfileVo;

  percentComplete: number = 0;


  calculatePercentComplete() {
    let totalFields = 50;
    let updatedFields = 0;
    for (var key in this.profileVo) {
      if (this.profileVo.hasOwnProperty(key)) {
        
        if (this.profileVo[key] != "" && this.profileVo[key] != null) {
          updatedFields = updatedFields + 1;
        }
      }
    }
    this.percentComplete = (updatedFields /totalFields)*100
    return this.percentComplete + "%";
  }

  ngOnInit() {
    this.calculatePercentComplete();
  }


}
