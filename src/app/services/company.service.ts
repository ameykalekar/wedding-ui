import { Injectable } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Company } from '../objects/company';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) { }

  save(company: Company) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('JSON' + JSON.stringify(company));
    return this.httpclient.post('/api/SaveCompany', JSON.stringify(company), httpOptions);
  }
}
