import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CheckList } from '../objects/checklist';
import { GlobalserviceService } from '../globalservice.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ChecklistserviceService {

  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) { }


  saveCheckList(checklist: CheckList) {


    console.log('JSON' + JSON.stringify(checklist));
    return this.httpclient.post('/api/createCheckList', JSON.stringify(checklist), httpOptions);
  }

  allCheckList() {
    return this.httpclient.get<CheckList[]>('/api/allCheckList');
  }


}
