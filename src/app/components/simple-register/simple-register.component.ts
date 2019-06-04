import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';
import { ProfileVo } from '../../vo/profile-vo';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-simple-register',
  templateUrl: './simple-register.component.html',
  styleUrls: ['./simple-register.component.css']
})
export class SimpleRegisterComponent implements OnInit {

  showProcessing: boolean = false;
  dateOfBirth: any;
  usercreated = false;

  constructor(private profileService: ProfileServiceService) { }

  ngOnInit() {
  }

  onDateChanged(event) {
    this.dateOfBirth = event.formatted;
  }

  onClickSubmit(profile: ProfileVo, form: NgForm) {

    console.log(profile);

    profile.dateOfBirth = this.dateOfBirth;
    this.showProcessing = true;
    this.profileService.insertSimpleProfile(profile).subscribe(res => {
      this.showProcessing = false;

      if (res ==null) {
      this.usercreated = false;
      } else {
      this.usercreated = true;
      form.resetForm();
      }


    });
  }

}
