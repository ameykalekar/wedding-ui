import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    
  }


  getLoggedInUserRoute(){
    return "editprofile/"+ this._authService.getUserId();
  }

  getEditDesiredProfileRoute(){
    return "updateDesiredProfile"
  }


}
