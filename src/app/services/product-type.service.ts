import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductType } from '../objects/product-type';


@Injectable()
export class ProductTypeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getProductTypes() {
    return this.http.get<ProductType[]>('/api/ProductTypes');
  }

  saveProductType(productType: ProductType) {
    return this.http.post<any>('/api/SaveProductType', JSON.stringify(productType), this.httpOptions);
  }

  removeProductType(productType: ProductType) {
    return this.http.post<any>('/api/RemoveProductType', JSON.stringify(productType), this.httpOptions);
  }

  editProductType(productType: ProductType) {
    return this.http.post<any>('/api/EditProductType', JSON.stringify(productType), this.httpOptions);
  }

}
