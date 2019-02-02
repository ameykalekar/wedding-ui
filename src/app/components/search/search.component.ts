import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Router } from '@angular/router';
import { ProfileVo } from '../../vo/profile-vo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [`
      nav {
          height: 0px;
      }
      .side-nav {
          width: 200px;
      }
      li.active {
        background-color: #ee6e73
      }
    `]
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  searchResult: ProfileVo[] = [];
  searchCriteria: ProfileVo;
  routeNames = ["Buttons", "Carousel", "Chips", "Collapsible", "Dialogs", "Dropdown", "Forms", "Tabs", "DatePicker", "Parallax", "ModelBindings"];



  genders = ['male', 'female'];
  mariatalstatus = [{ name: 'Married', value: 'Married' },
  { name: 'Single', value: 'Single' },
  { name: 'Widow', value: 'Widow' },
  { name: 'Divorced', value: 'Divorced' },
  ];



  Education = [{ name: 'ALL', value: 'ALL' },
  { name: 'BE', value: 'BE' },
  { name: 'ME', value: 'ME' },
  { name: 'BA', value: 'BAs' },
  ];

  district = [{ name: 'ALL', value: 'ALL' },
  { name: 'NASHIK', value: 'NASHIK' },
  { name: 'SOLAPUR', value: 'SOLAPUR' }

  ];

  state = [{ name: 'ALL', value: 'ALL' },
  { name: 'MAHARASTRA', value: 'MAHARASTRA' },
  { name: 'SOLAPUR', value: 'SOLAPUR' }

  ];


  religion = [{ name: 'ALL', value: 'ALL' },
  { name: 'HINDU', value: 'MAHARASTRA' },
  { name: 'JAIN', value: 'SOLAPUR' }

  ];
  agerange = [{ name: '18-25', value: '18-25' },
  { name: '26-30', value: '26-30' },
  { name: '31-35', value: '31-35' },
  { name: '35-40', value: '35-40' },
  { name: '40-60', value: '40-60' }

  ];
  selectOptions = [{ name: 'Married', value: 'Married' },
  { name: 'Single', value: 'Single' },
  { name: 'Widow', value: 'Widow' },
  { name: 'Divorced', value: 'Divorced' },
  ];
  constructor(private profileservice: ProfileServiceService, private router: Router) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      gender: new FormControl(this.genders[0], Validators.required),
      maritalstatus: new FormControl(''),
      education: new FormControl(''),
      district: new FormControl(''),
      caste: new FormControl(''),
      religion: new FormControl(''),
      state: new FormControl(''),
      age: new FormControl('')
    });
    this.profile = new ProfileVo();
    this.profile.gender = 'maile';
    this.profile.firstName = 'Sagar';
    this.profile.lastName = 'Takare';
    this.profile.occupation = 'Doctor';


  }

  profiles: any;

  profile: ProfileVo;

  reset() {
    this.form.reset();
    this.form.controls.gender.setValue(this.genders[0]);

  }
  onSubmit() {
    console.log(this.form.value.gender);
    const profile = new ProfileVo();
    console.log(profile);
    profile.gender = this.form.value.gender;
    profile.marritalStatus = this.form.value.mariatalstatus;
    profile.caste = this.form.value.caste;
    profile.religion = this.form.value.religion;
    profile.highestDegree = this.form.value.education;
    profile.agerange = this.form.value.age;
    this.profileservice.searchProfile(profile).subscribe(res => {


      if (res !== null) {
        console.log(res);
        this.searchResult = res;
        this.searchCriteria = profile;
        // this.reset();

      }

    },
      err => {

        console.log('Error Occured' + err);
      }


    );
    window.focus();
    window.scrollTo(0, 5000);


  }

}
