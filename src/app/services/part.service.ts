import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalserviceService } from '../globalservice.service';
import { Part } from '../objects/part';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) {}

  getAllPartsByCompany() {
    return this.httpclient.get<Part[]>('/api/allParts');
  }

  getAllPartsByProductid() {
    return this.httpclient.get<Part[]>('/api/allParts');
  }

  savePart(part: Part) {
    console.log('Saving Part JSON' + JSON.stringify(part));
    return this.httpclient.post('/api/createPart', JSON.stringify(part), httpOptions);
  }
}
