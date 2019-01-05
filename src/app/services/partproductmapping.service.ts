import { Injectable } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartProductMapping } from '../objects/partproductmapping';
import { Part } from '../objects/part';
import { BarcodePartMapping } from '../objects/barcodePartMapping';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PartproductmappingService {


  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) { }

  save(product: PartProductMapping[]) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('Saving Part Product Mapping JSON' + JSON.stringify(product));
    return this.httpclient.post('/api/SavePartProductMapping', JSON.stringify(product), httpOptions);
  }

  getParts(productid: string) {
    return this.httpclient.get<Part[]>('/api/getAllPartsByProductId' + '?id=' + productid);
  }

  getPartsByBarcodeID(barcodeid: string) {
    return this.httpclient.get<Part[]>('/api/getAllPartsByBarcodeID' + '?id=' + barcodeid);
  }


  savePartsByBarcodeID(barcode: BarcodePartMapping[]) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('Saving Part Barcode Mapping JSON' + JSON.stringify(barcode));
    return this.httpclient.post('/api/SaveBarcodePart', JSON.stringify(barcode), httpOptions);
  }
  
}
