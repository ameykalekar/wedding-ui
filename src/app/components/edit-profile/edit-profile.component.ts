import { Component, OnInit ,ViewChild} from '@angular/core';
import { ProfileServiceService} from '../../services/profile-service.service';
import { ProfileVo } from '../../vo/profile-vo';
import {ActivatedRoute,Router}  from "@angular/router";
import { ProfileStatusComponent} from  '../profile-status/profile-status.component';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileId;

  profileVo:ProfileVo=new ProfileVo();

  showProcessing:boolean=false;


  citiesary :String[];
  
  religionary = [
    { name: 'Hindu', value: 'Hindu' },
    { name: 'Jain', value: 'Jain' },
    { name: 'Christian', value: 'Christian' },
    { name: 'Muslim', value: 'Muslim' },
    { name: 'Buddhist', value: 'Buddhist' },
    { name: 'Parsi', value: 'Parsi' },
    { name: 'Sikh', value: 'Sikh' },
    { name: 'Sindhi', value: 'Sindhi' },
  ];


  @ViewChild(ProfileStatusComponent)
  private profileStatusComponent: ProfileStatusComponent;


  constructor(private router:Router,private profileService: ProfileServiceService,private route:ActivatedRoute) {

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
  private img2:string;
  private img3:string;

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
    //  this.profileStatusComponent.profileVo = this.profileVo;
     // this.profileStatusComponent.calculatePercentComplete();
    });


    this.getPlaces();
  }

  onClickSubmit(profile:ProfileVo){

    console.log(profile);
    profile.picture1=this.img1;
    profile.picture2= this.img2;
    profile.picture3 = this.img3
    profile.dateOfBirth = this.profileVo.dateOfBirth;
    this.showProcessing = true;
    this.profileService.insertProfile(profile).subscribe(res=>
    {
      console.log(res);
      this.showProcessing = false;
      this.router.navigate['myprofile'];

    });
  }

  log(dt1){
    console.log(dt1);
  }


  onFileChange(event,pictureNo) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(file.name);
        console.log(file.type);
        if(pictureNo==1){
          this.img1 =reader.result.toString().split(',')[1]; 
        } 
        if(pictureNo ==2){
          this.img2 =reader.result.toString().split(',')[1]; 
        }
        if(pictureNo==3){
          this.img3 =reader.result.toString().split(',')[1]; 
        }
        
      };
    }
  }

  onDateChanged(event){
    console.log( event.formatted);
    this.profileVo.dateOfBirth = event.formatted;
    console.log(this.profileVo);
  }


  getPlaces(){

    this.profileService.getAllCities().subscribe(x=> this.citiesary = x);

  }

  clearFile(){

  }

}
