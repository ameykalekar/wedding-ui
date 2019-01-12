import { Component, OnInit,ViewChild,EventEmitter } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';
import {ProfileVo} from '../../vo/profile-vo';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  @ViewChild('carousel') carouselElement; 

  actions = new EventEmitter<string>();

  profileVo:ProfileVo=new ProfileVo();
constructor(private profileService:ProfileServiceService) { }

imageURLs = [

  "https://image.shutterstock.com/display_pic_with_logo/1264645/364153082/stock-photo-asian-girl-in-sunflower-field-364153082.jpg",
  "https://image.shutterstock.com/display_pic_with_logo/1264645/298927574/stock-photo-a-young-traveler-girl-sit-on-the-wooden-bridge-in-halong-bay-and-enjoy-the-beauty-of-seascape-298927574.jpg",
  "https://image.shutterstock.com/display_pic_with_logo/1264645/298757792/stock-photo-a-young-traveler-girl-sit-on-the-top-of-mountain-in-halong-bay-and-enjoy-the-beauty-of-seascape-298757792.jpg",
  "https://image.shutterstock.com/display_pic_with_logo/2565601/411902890/stock-photo-ha-long-bay-scenic-view-hanoi-vietnam-411902890.jpg",
  "https://image.shutterstock.com/display_pic_with_logo/2565601/413207668/stock-photo-the-temple-of-literature-in-hanoi-vietnam-the-chinese-words-is-poem-of-thie-temple-and-templs-s-413207668.jpg"
];

  ngOnInit() {
    this.profileService.getProfile('1').subscribe(

      res => {
        this.profileVo =res;
        console.log(this.profileVo);
      }

    );
  }

}
