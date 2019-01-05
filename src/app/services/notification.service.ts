import { Injectable } from '@angular/core';
import {NotificationVO} from '../objects/notificationvo';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable()
export class NotificationService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private http:HttpClient) { }
  
  update(notificationVo:NotificationVO){
    return this.http.post<any>('/api/updatenotification', JSON.stringify(notificationVo), this.httpOptions);
  }
  
  view(){
  return this.http.post<NotificationVO>('/api/viewnotification',this.httpOptions);
  }
}
