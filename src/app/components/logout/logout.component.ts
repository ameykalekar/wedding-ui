import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {LoginService} from  '../../services/login.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router
    ,private auth: AuthService
  ,private loginservice: LoginService) { }

  ngOnInit() {
    console.log("removing")
    this.auth.removeToken();
    this.loginservice.logout().subscribe(res=>{
      this.router.navigate(['/login']);
    }
    );
    
    
  }

}
