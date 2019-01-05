import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalserviceService } from '../globalservice.service';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Task } from '../objects/task';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TaskserviceService {

  constructor( private globalservice: GlobalserviceService, private httpclient: HttpClient) { }


  saveTask(tasks: Task[]) {
    console.log('JSON' + JSON.stringify(tasks));
    return this.httpclient.post('/api/createTasks', JSON.stringify(tasks), httpOptions);
  }

}
