import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProfileVo } from '../vo/profile-vo';
import { RequestVo } from '../vo/requestvo';
import { DesiredProfile } from '../vo/desired-profile';
import { City } from '../vo/city-vo';

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

  insertSimpleProfile(profileVo: ProfileVo) {
    return this.http.post('/api/simple/profile', JSON.stringify(profileVo), this.httpOptions);
  }

  insertDesiredProfile(desiredProfile: DesiredProfile) {
    console.log(desiredProfile);
    return this.http.post('/api/updateDesired', JSON.stringify(desiredProfile), this.httpOptions);
  }


  getDesiredProfile() {
    return this.http.get<DesiredProfile>('/api/profile', this.httpOptions);
  }

  getAllCities() {
    return this.http.get<String[]>('/api/city/cities', this.httpOptions);
  }

  getAllStates() {
    return this.http.get<String[]>('/api/states', this.httpOptions);
  }

  getCitiesByStates(state: String) {
    return this.http.get<City[]>('/api/states/' + state, this.httpOptions);
  }


  getAllCastes() {
    return this.http.get<String[]>('/api/caste/castes', this.httpOptions);
  }

  getAllRelligions() {
    return this.http.get<String[]>('/api/religions', this.httpOptions);
  }

  getCastesByReligion(religion: String) {
    return this.http.get<City[]>('/api/religions/' + religion, this.httpOptions);
  }

  updateVisibility(visibility) {
    return this.http.get('/api/visibility/update/' + visibility);
  }

  getCurrentVisibility() {
    return this.http.get<any>('/api/visibility/get');
  }
}
