import { Component, OnInit,ViewChild,EventEmitter } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';
import {ProfileVo} from '../../vo/profile-vo';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  @ViewChild('carousel') carouselElement; 


  actions = new EventEmitter<string>();

  imageURLs = [
    "/api/profile/getProfileImage/13",
    "/api/profile/getProfileImage/13",
    "/api/profile/getProfileImage/13"
  ];

  showInitialized = false;
  profileVo:ProfileVo=new ProfileVo();
constructor(private authService:AuthService,private profileService:ProfileServiceService) {

  window.setTimeout(() => {
    this.imageURLs = [this.imageURLs[0], ...this.imageURLs]; // duplicate the first iamge
    this.carouselElement.nativeElement.classList.toggle("initialized")
    this.actions.emit("carousel");
  },3000);
 }


  ngOnInit() {
    this.profileService.getProfile(this.authService.getUserId()).subscribe(

      res => {
        this.profileVo =res;
        console.log(this.profileVo);
       
      }

    );
  }

  getImageSrc(){
    return "/api/profile/getProfileImage/"+ this.authService.getUserId();
  }

}
