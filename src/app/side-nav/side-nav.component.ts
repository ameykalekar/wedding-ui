import {MaterializeDirective} from "angular2-materialize";
import {Component} from "@angular/core";
import {Location} from '@angular/common';
import { GlobalserviceService } from '../globalservice.service';
import { Router } from '@angular/router';
import {LoginserviceService } from '../services/loginservice.service';

@Component({
    selector: "sideNav",
    styles: [`
      nav {
          height: 0px;
      }
      .side-nav {
          width: 250px;
      }
      .side-nav-my-color {
          background-color:#455a64;
      }

      li.active {
        background-color: #4db6ac
      }
      
      a.active {
      background-color: #80deea
      }
	 
	 .btn-logout{
		line-height: 14px;
		padding:2px;
		font-size:8px;
		height:20px;
		width:40px;
		}
    `],
    templateUrl: './side-nav.component.html'
})
export class SideNavComponent {
  
   constructor(private globalservice: GlobalserviceService,private router:Router,private loginservice : LoginserviceService ) { }
  
  logout() {
    console.log('Logging Out');
    this.globalservice.setValidUser(false);
    this.globalservice.user = undefined;
    localStorage.removeItem ('currentUser');
    this.router.navigate(['login']);
    this.loginservice.logout().subscribe((res)=>{
    console.log(res);
    });
  }
  
  getUserNameAndRole(){
	  if(this.globalservice.getuser()!=undefined){
	  	return this.globalservice.getuser().username + ',' +  this.globalservice.getuser().role;
	  }
	  return '';
  }
  
}