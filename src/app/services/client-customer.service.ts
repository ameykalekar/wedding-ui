import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerClient } from '../objects/customer-client';


@Injectable({
  providedIn: 'root'
})
export class ClientCustomerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }
  
  
   getCustomers() {
    return this.http.post<CustomerClient[]>('/api/getCustomerClients',null,this.httpOptions );
  }
  
  saveCustomerClient(customerClient: CustomerClient) {
    return this.http.post<any>('/api/SaveCustomerClient', JSON.stringify(customerClient), this.httpOptions);
  }

  removeCustomerClient(customerClient: CustomerClient) {
    return this.http.post<any>('/api/RemoveCustomerClient', JSON.stringify(customerClient), this.httpOptions);
  }

  editCustomerClient(customerClient: CustomerClient) {
    return this.http.post<any>('/api/EditCustomerClient', JSON.stringify(customerClient), this.httpOptions);
  }
}

