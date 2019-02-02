import { Component, OnInit,Input } from '@angular/core';
import {ProfileVo} from '../../vo/profile-vo';
import {ActivatedRoute}  from "@angular/router";
import { ProfileServiceService} from '../../services/profile-service.service';

@Component({
  selector: 'app-readonly-profile',
  templateUrl: './readonly-profile.component.html',
  styleUrls: ['./readonly-profile.component.css']
})
export class ReadonlyProfileComponent implements OnInit {


  profileId:string;
  profileVo:ProfileVo;
  imageURLs = [
    "/api/profile/getProfileImage/13",
    "/api/profile/getProfileImage/13",
    "/api/profile/getProfileImage/13"
  ];

  constructor(private profileService: ProfileServiceService,private route:ActivatedRoute) {

    this.route.params.subscribe( params => {
      console.log(params);
      this.profileId = params['id'];
  } );

   }

  ngOnInit() {
    this.profileService.getProfile(this.profileId).subscribe(

      res => {
        this.profileVo =res;
        console.log(this.profileVo);
       
      }

    );
  }
}
