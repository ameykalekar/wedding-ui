import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Schedule} from '../objects/schedule'

@Injectable()
export class ResourceService {
  constructor(private http: HttpClient) { }
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
  getAllResources(){
    console.log("in get all resources");
  	return this.http.get<any[]>('/api/GetAllUsers');
  }

  getUsersByCompanyId(){
    console.log("getUsersByCompanyIdAndRole");
    return this.http.get<any[]>('/api/GetUsersByCompanyId');
  }
  
  getScheduleForRsource(username:string){
  	return this.http.get<Schedule[]>('/api/getSchedule?username='+username);
  }
  
  getSchedule(){

    return this.http.get<Schedule[]>('/api/getMySchedule');

  }
  scheduleTimeForResource(username:string,schedule:Schedule){
   return this.http.post<any>('/api/scheduleFR?username='+username,JSON.stringify(schedule),this.httpOptions)
  }
}