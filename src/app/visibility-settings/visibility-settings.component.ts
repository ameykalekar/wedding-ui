import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';
@Component({
  selector: 'app-visibility-settings',
  templateUrl: './visibility-settings.component.html',
  styleUrls: ['./visibility-settings.component.css']
})
export class VisibilitySettingsComponent implements OnInit {

  showProcessing:boolean=false;

  currentVisibility: String = "";
  constructor(private profileService:ProfileServiceService ) { }

  ngOnInit() {
    this.getCurrentVisibility();
  }

  update(visibility){

    console.log(visibility);
    this.showProcessing = true;
    this.profileService.updateVisibility(visibility).subscribe(res=> {this.showProcessing = false;this.getCurrentVisibility();console.log(res)});
    
  }

  getCurrentVisibility(){

    this.showProcessing = true;
    this.profileService.getCurrentVisibility().subscribe (res=> {this.showProcessing = false; 
    console.log(res);
      if(res.visibleTo == 'all'){
        this.currentVisibility = "Your Profile is  visible to everyone";
      }else if (res.visibleTo = 'registered'){
        this.currentVisibility = "Your Profile is visible to only registered users";
      }else if (res.visibleTo = 'invisible'){
        this.currentVisibility = "Your Profile is hidden from evenryone";
      }
    
    })
  }

}
