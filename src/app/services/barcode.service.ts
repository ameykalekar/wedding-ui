import { Injectable } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../objects/product';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) { }

  getProduct(barcodeid) {
    return this.httpclient.get<Product>('/api/getProductByBarcodeID?id=' + barcodeid);
  }

  saveBarcode(BarcodeProduct) {
    console.log('JSON' + JSON.stringify(BarcodeProduct));
    return this.httpclient.post('/api/SaveBarcodeProduct', JSON.stringify(BarcodeProduct), httpOptions);
  }
}
