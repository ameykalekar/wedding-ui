import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Userinfo } from '../objects/userinfo';
import { GlobalserviceService } from '../globalservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) { }

  save(ticket: Userinfo) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('JSON' + JSON.stringify(ticket));
    return this.httpclient.post('/api/SaveUser', JSON.stringify(ticket), httpOptions);
  }

  getUser(usename: string) {
    return this.httpclient.get('/api/GetUser');
  }
}
