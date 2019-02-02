import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  
  };
  constructor(private http: HttpClient) { }


  validatelogin(user:any) {
    
    return this.http.post<any>("/api/login",JSON.stringify(user), this.httpOptions);

  }



  
  logout(){

    return this.http.get<any>("/api/logout", this.httpOptions);
  }
}
