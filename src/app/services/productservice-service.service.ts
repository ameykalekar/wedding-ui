import { Injectable } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../objects/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductserviceService {


  constructor(private globalservice: GlobalserviceService, private httpclient: HttpClient) { }


  saveProduct(product: Product) {
    console.log('JSON' + JSON.stringify(product));
    return this.httpclient.post('/api/createproduct', JSON.stringify(product), httpOptions);
  }

  getProducts() {
    return this.httpclient.get<Product[]>('/api/allproducts')
  }

  getSubCategoryByCategory(category: string) {

    return this.httpclient.get<string[]>('/api/getSubcategoryBycategory' + '?category=' + category);
  }

  getBrandBySubCategoryByCategory(category: string, subcategory: string) {

    return this.httpclient.get<string[]>('/api/getBrandBycategoryAndSubCategory' +
      '?category=' + category + '&subcategory=' + subcategory);
  }


  getByProductTypeAndCategoryAndSubCategoryAndProductBrand(productype: string, category: string, subcategory: string, brand: string) {

    return this.httpclient.get<Product[]>('/api/getByProductTypeAndCategoryAndSubCategoryAndProductBrand' +
      '?category=' + category + '&subcategory=' + subcategory + '&productype=' + productype + '&brand=' + brand);
  }


  getCategoryByProductType(producttype: string) {

    return this.httpclient.get<string[]>('/api/getCategoryProductsByType' + '?p=' + producttype);
  }


}
