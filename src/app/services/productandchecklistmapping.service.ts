import { Injectable } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';

import { ProductAndCheckListMapping } from '../objects/productchecklistmapping';
import { CheckList } from '../objects/checklist';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductandchecklistmappingService {

  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) { }

  save(product: ProductAndCheckListMapping) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('JSON' + JSON.stringify(product));
    return this.httpclient.post('/api/SaveProductCheckListMapping', JSON.stringify(product), httpOptions);
  }

  getchecklist(productid: string) {
    return this.httpclient.get<CheckList>('/api/getAllProductChecklistByProductId' + '?id=' + productid);
  }
}
