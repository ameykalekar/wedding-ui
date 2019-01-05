import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '../../../node_modules/@angular/common/http';
import {User} from '../objects/user';
import { ChangePasswordVo } from '../objects/ChangePasswordVo';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})

};
@Injectable()
export class LoginserviceService  {
  loginurl = '/api/validelogin?';
  changePasswordUrl = '/api/changePassword';
  finalurl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}


  validatelogin(user: User) {
    this.finalurl = this.loginurl + 'username=' + user.username + '&' + 'password=' + user.password;
    console.log(this.finalurl);
    return this.http.get<User>(this.finalurl);

  }
  
  logout(){
  return this.http.get<any>('/api/logout');

  }

  changePassword(user: ChangePasswordVo) {
    return this.http.post<any>('/api/ChangePassword', JSON.stringify(user), this.httpOptions);
  }
}
