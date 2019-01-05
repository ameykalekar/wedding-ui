import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Comments } from '../objects/comment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor( private httpclient: HttpClient) { }
  save(comment: Comments) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('JSON' + JSON.stringify(comment));
    return this.httpclient.post('/api/SaveComment', JSON.stringify(comment), httpOptions);
  }
  getComments(ticketid: string) {
    return this.httpclient.get<Comments[]>('/api/GetAllComments' + '?id=' + ticketid);
  }
}
