import { Component, OnInit } from '@angular/core';
import { ProfileServiceService} from '../../services/profile-service.service';
import { ProfileVo } from '../../vo/profile-vo';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  constructor(private profileService: ProfileServiceService) { }

  private img1:string;
  showProcessing:boolean=false;

  ngOnInit() {
  }

  onClickSubmit(profile:ProfileVo){

    console.log(profile);
    profile.picture1=this.img1;
    profile.dateOfBirth = this.dateOfBirth;
    this.showProcessing = true;
    this.profileService.insertProfile(profile).subscribe(res=>
    {
      this.showProcessing= false;
      console.log(res);

    });
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

  dateOfBirth:any;
  onDateChanged(event){
  
    this.dateOfBirth = event.formatted;
    
  }

  clearFile(){

  }

}
