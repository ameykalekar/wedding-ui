import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CustomerService{
  
  constructor(private http: HttpClient){
  }
  
  getAllCustomers(){
  return this.http.get<any[]>('/api/getCustomers');
  }
}