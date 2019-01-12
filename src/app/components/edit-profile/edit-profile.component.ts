import { Component, OnInit ,Input} from '@angular/core';
import { ProfileServiceService} from '../../services/profile-service.service';
import { ProfileVo } from '../../vo/profile-vo';
import {ActivatedRoute}  from "@angular/router";
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileId;

  profileVo:ProfileVo=new ProfileVo();

  constructor(private profileService: ProfileServiceService,private route:ActivatedRoute) {

    this.route.params.subscribe( params => {
      console.log(params);
      this.profileId = params['id'];
  } );

   }

   public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    disableSince:{year: 2018, month: 1, day: 1},
    showTodayBtn : false
};

dateOfBirthObj:any;

year:number=2019;
month:number=1;
day:number=1

// Initialized to specific date (09.10.2018).
public model: any = { date: { year: this.year, month: this.month, day: this.day } };

  private img1:string;
  ngOnInit() {
    console.log(this.profileId);
    this.profileService.getProfile(this.profileId).subscribe(res=>{
       this.profileVo = res;
       console.log(this.profileVo);
       
       if (this.profileVo.dateOfBirth.length > 0) {
        this.day = parseInt(this.profileVo.dateOfBirth.substring(0, 2));
        this.month = parseInt(this.profileVo.dateOfBirth.substring(3, 5));
        this.year = parseInt(this.profileVo.dateOfBirth.substring(6, 10));
        console.log(this.day +"/" + this.month+"/" + this.year);
        this.model = { date: { year: this.year, month: this.month, day: this.day } };
      }
    });
  }

  onClickSubmit(profile:ProfileVo){

    console.log(profile);
    profile.picture1=this.img1;
    profile.dateOfBirth = this.profileVo.dateOfBirth;
    this.profileService.insertProfile(profile).subscribe(res=>
    {
      console.log(res);

    });
  }

  log(dt1){
    console.log(dt1);
  }


  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(file.name);
        console.log(file.type);
        this.img1 =reader.result.toString().split(',')[1]; 
      };
    }
  }

  onDateChanged(event){
    console.log( event.formatted);
    this.profileVo.dateOfBirth = event.formatted;
    console.log(this.profileVo);
  }

  clearFile(){

  }

}
