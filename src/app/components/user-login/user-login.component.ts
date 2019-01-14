import { Component, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {LoginService} from  '../../services/login.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  validLogin: boolean;
  uid: string;
  pword: string;
  showProcessing:boolean=false;


  constructor(private loginservice: LoginService
    ,private router: Router
  ,private auth: AuthService) { }

  ngOnInit() {
  }

  onClickOfSubmit(value){
    console.log(value);
    this.showProcessing = true;
    this.loginservice.validatelogin(value).subscribe(
      res =>{
        this.showProcessing = false;
        console.log("logged in successfully");  
        console.log(res);
        this.auth.sendToken(value.userid);
        this.router.navigate(['/myprofile']);
      }
    )
  }
}
