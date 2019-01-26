import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProfileVo } from '../vo/profile-vo';
import { RequestVo } from '../vo/requestvo';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    , withCredentials: true
  };


  constructor(private http: HttpClient) {
  }

  getProfile(profileId) {
    return this.http.get<ProfileVo>('/api/profile/' + profileId, this.httpOptions);
  }

  getProfileRequestVO(requestvo) {
    return this.http.post<RequestVo>('/api/gethash', JSON.stringify(requestvo), this.httpOptions);
  }

  insertProfile(profileVo: ProfileVo) {
    return this.http.post('/api/profile', JSON.stringify(profileVo), this.httpOptions);
  }


  searchProfile(profileVo: ProfileVo) {
    return this.http.post<ProfileVo[]>('/api/search', JSON.stringify(profileVo), this.httpOptions);
  }

  insertSimpleProfile(profileVo: ProfileVo){
    return this.http.post('/api/simple/profile',JSON.stringify(profileVo),this.httpOptions);
  }
}
