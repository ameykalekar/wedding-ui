import {Injectable} from '@angular/core'
import {HttpHeaders, HttpClient} from '@angular/common/http';
@Injectable()
export class DashboardService {

   httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'} )
    , withCredentials: true
  };

  constructor(private http: HttpClient) {
  }

  getAppStatus() {
    return this.http.get<any>('http://localhost:4200/api/status', this.httpOptions);
  }
  
}