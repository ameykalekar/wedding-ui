import { Injectable } from '@angular/core';
import { User } from './objects/user';
import { LoginserviceService} from './services/loginservice.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {
  user: User;
  host: 'http://localhost:8080/';
  loggedOut:boolean = false;
   validuser: boolean;
  serverworking: boolean;

  constructor(private loginservice:LoginserviceService,private router:Router) {
   
    console.log("in constructor");
    this.validuser = false;
    this.serverworking = true;
    this.loggedOut = false;
  }

  getRole()
  {
    return this.user.role;
  }

  getValidUser()
  {
    return this.validuser;
  }


  setValidUser(validuser:boolean){
    console.log("set valid user" +  validuser);
    this.validuser = validuser;
  }
  getuser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }
  
  isAuthorizedFunction(functionName:string){
//    console.log(functionName + " - " +  this.validuser);    
 
  	if(this.validuser===false && !this.loggedOut){

  		this.loggedOut=true;
	  	this.loginservice.logout().subscribe((response)=>{
	  	console.log("logged out sucessfully");
	  	this.loggedOut = true;
      debugger;
      
      localStorage.removeItem ('currentUser');
	  	this.router.navigate(['/login']);
  	},
      (err: HttpErrorResponse) => {
       console.log("error response");
       this.router.navigate(['/login']);
      }
  	);
  	return false;
  	}
    if(this.user==undefined || this.user.functions==undefined){
    return false;
    }
    var i:number; 
    for( i = 0;i<=this.user.functions.length;i++) {
      if(this.user.functions[i]==functionName){
  //      console.log(functionName + "-- true");
        return true;
      }      
    }
    //console.log(functionName + "-- false");
    return false;
  }
}
