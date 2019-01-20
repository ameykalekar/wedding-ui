import { Component, OnInit, Input } from '@angular/core';
import { ProfileVo } from '../../vo/profile-vo';
import { ScrollEvent } from 'ngx-scroll-event';
import { ProfileServiceService } from '../../services/profile-service.service';

@Component({
  selector: 'app-display-profiles',
  templateUrl: './display-profiles.component.html',
  styleUrls: ['./display-profiles.component.css']
})
export class DisplayProfilesComponent implements OnInit {
  selector: string = '.main-panel';
  @Input('profileVO')
  searchCriteria: ProfileVo;

  @Input('profiles')
  profiles: ProfileVo[];


  response: ProfileVo[] = [];

  showProcessing: boolean;

  class = 'col s12 m4';
  constructor(private profileservice: ProfileServiceService) {

    console.log('profileconstructor' + this.profiles);
    console.log('Search Criteria' + this.searchCriteria);
  }

  ngOnInit() {
    console.log('init' + this.profiles);
    this.showProcessing = false;
  }

  onScroll() {
    this.showProcessing = true;

      this.searchCriteria.start = this.searchCriteria.maxLimit;
      this.searchCriteria.maxLimit = this.searchCriteria.maxLimit + 5;
      console.log('Search Criteria' + this.searchCriteria.start + 'mAXlIMIT' + this.searchCriteria.maxLimit);
      this.profileservice.searchProfile(this.searchCriteria).subscribe(res => {


        if (res !== null && res.length > 0) {

          this.searchCriteria = this.searchCriteria;
          const temp: ProfileVo[] = res;
          const pr1: ProfileVo[] = [];
          temp.forEach((p) => {
            const pr = new ProfileVo();
            pr.firstName = p.firstName;
            pr.lastName = p.lastName;
            pr.dateOfBirth = p.dateOfBirth;
            pr.age = p.age;
            pr.occupation = p.occupation;
            pr.heightFeet = p.heightFeet;
            pr.heightInch = p.heightInch;
            pr.marritalStatus = p.marritalStatus;
            this.profiles.push(pr);
          });

          const r: ProfileVo[] = [];
          /*   res.forEach(function (p) {
               r.push(p);
               this.profiles.push(p);
             });*/
          console.log('output object' + r);

          this.showProcessing = false;
        } else {
          this.showProcessing = false;
        }

      },
        err => {

          console.log('Error Occured' + err);
        }


      );
      window.focus();
      window.scrollTo(0, 5000);
  }

  public handleScroll(event: ScrollEvent) {



    if (event.isReachingBottom) {
      


    }
    if (event.isReachingTop) {
      //   console.log(`the user is reaching the top`);
    }
    if (event.isWindowEvent) {
      //.log(`This event is fired on Window not on an element.`);
    }
  }



}


