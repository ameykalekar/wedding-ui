import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';
import {DesiredProfile} from '../vo/desired-profile';
@Component({
  selector: 'app-desired-profile',
  templateUrl: './desired-profile.component.html',
  styleUrls: ['./desired-profile.component.css']
})
export class DesiredProfileComponent implements OnInit {


  desiredProfileVo:DesiredProfile = new DesiredProfile();  

  agerangeary = [
  { name: '18-25', value: '18-25' },
  { name: '26-30', value: '26-30' },
  { name: '31-35', value: '31-35' },
  { name: '35-40', value: '35-40' },
  { name: '40-60', value: '40-60' }
  ];

  heightrangeary = [
    { name: "4'0\" - 4'5\"", value: "4'0\" - 4'5\"" },
    { name: "4'6\" - 4'11\"", value: "4'6\" - 4'11\"" },
    { name: "5'0\" - 5'5\"", value: "5'0\" - 5'5\"" },
    { name: "5'6\" - 5'11\"", value: "5'6\" - 5'11\"" },
    { name: "6'0\" - 6'5\"", value: "6'0\" - 6'5\"" },
    { name: "6'6\" - 6'11\"", value: "6'6\" - 6'11\"" },
  ];


  religionary = [
    { name: 'Hindu', value: 'Hindu' },
    { name: 'Jain', value: 'Jain' },
    { name: 'Christian', value: 'Christian' },
    { name: 'Muslim', value: 'Muslim' },
    { name: 'Buddhist', value: 'Buddhist' },
    { name: 'Parsi', value: 'Parsi' },
    { name: 'Sikh', value: 'Sikh' },
    { name: 'Sindhi', value: 'Sindhi' },
  ];

  mariatalstatus = [{ name: 'Married', value: 'Married' },
  { name: 'Single', value: 'Single' },
  { name: 'Widow', value: 'Widow' },
  { name: 'Divorced', value: 'Divorced' },
  ];


  incomeary = [
    {name:'3-5 lac', value:'3-5 lac'},
    {name:'6-10 lac', value:'6-10 lac'},
    {name:'11-15 lac', value:'11-15 lac'},
    {name:'16-25 lac', value:'16-25 lac'},
    {name:'26-50 lac', value:'26-50 lac'},
  ];

  dietaryhabitary = [
    {name:'Vegetarian',value:'Vegetarian'},
    {name:'Non Vegetarian',value:'Non Vegetarian'},
    {name:'Jain', value:'Jain'},
    {name:'Eggetarian', value:'Eggetarian'},
  ];

  drinkingary = [
    {name:'Yes',value:'Yes'},
    {name:'No',value:'No'},
    {name:'Occaisionally', value:'Occaisionally'}
  ];

  smokingary = [
    {name:'Yes',value:'Yes'},
    {name:'No',value:'No'},
    {name:'Occaisionally', value:'Occaisionally'}
  ];

  challengedary = [
    {name:'Yes',value:'Yes'},
    {name:'No',value:'No'}
  ];

  qualificationary = [
    { name: 'B.Arch'},
    { name: 'B.Des' },
    { name: 'B.E/B.Tech' },
    { name: 'B.Pharma' },
    { name: 'M.Arch' },
    { name: 'M.Des' },
    { name: 'M.E/M.Tech' },
    { name: 'M.Pharma' },
    { name: 'M.S. (Engineering)' },
    { name: 'B.IT' },
    { name: 'BCA' },
    { name: 'MCA/PGDCA' },
    { name: 'B.Com' },
    { name: 'CA' },
    { name: 'CFA' },
    { name: 'CS' },
    { name: 'ICWA' },
    { name: 'M.Com' },
    { name: 'BBA' },
    { name: 'BHM' },
    { name: 'MBA/PGDM'},
    { name: 'BAMS' },
    { name: 'BDS' },
    { name: 'BHMS' },
    { name: 'BPT' },
    { name: 'BVSc.' },
    { name: 'DM' },
    { name: 'M.D.' },
    { name: 'M.S. (Medicine)'},
    { name: 'MBBS' },
    { name: 'MCh' },
    { name: 'MDS' },
    { name: 'MPT' },
    { name: 'MVSc.' },
    { name: 'BL/LLB' },
    { name: 'ML/LLM'},
    { name: 'B.A' },
    { name: 'B.Ed' },
    { name: 'B.Sc' },
    { name: 'BFA' },
    { name: 'BJMC' },
    { name: 'M.A' },
    { name: 'M.Ed' },
    { name: 'M.Sc' },
    { name: 'MFA' },
    { name: 'MJMC' },
    { name: 'MSW' },
    { name: 'M.Phil' },
    { name: 'Ph. D' },
    { name: 'High School' },
    { name: 'Trade School' },
    { name: 'Diploma' },
    { name: 'Other' }
  ]



  constructor(private profileService:ProfileServiceService) { }

  ngOnInit() {
    this.profileService.getDesiredProfile().subscribe(res=>console.log(this.desiredProfileVo = res));
  }

  onClickSubmit(desiredProfile){
    console.log(desiredProfile);
    this.profileService.insertDesiredProfile(desiredProfile).subscribe(res=> console.log(res));
  }

}
