import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) { }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }

  removeToken(){
    localStorage.removeItem("LoggedInUser");
  }


  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  getUserId(){
    
     return localStorage.getItem("LoggedInUser"); 
  }
}
