import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ResponseVo } from '../vo/responsevo';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    , withCredentials: true
  };


  insertPayment(pay: ResponseVo) {
    return this.http.post('/api/paymentresponse', JSON.stringify(pay), this.httpOptions);
  }
}
