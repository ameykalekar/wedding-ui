import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Router } from '@angular/router';
import { ProfileVo } from '../../vo/profile-vo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  searchResult: ProfileVo[] = [];


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
      maritalstatus: new FormControl('')
      //education: new FormControl('', Validators.required),
      // district: new FormControl('', Validators.required),
      //caste: new FormControl('', [Validators.required, Validators.pattern('^[_A-z]*((-|\s)*[_A-z])*$')]),
      // religion: new FormControl('', [Validators.required]),
      // state: new FormControl(''),
      // age: new FormControl('')
    });
    const profile = new ProfileVo();
    profile.gender = 'maile';
    profile.firstName = 'Sagar';
    profile.lastName = 'Takare';
    profile.occupation = 'Doctor';


  }

  reset() {
    this.form.reset();

  }
  onSubmit() {
    console.log(this.form.value.gender);
    const profile = new ProfileVo();
    console.log(profile);
    profile.gender = this.form.value.gender;
    this.profileservice.searchProfile(profile).subscribe(res => {


      if (res !== null) {
        console.log(res);
        this.searchResult = res;

        this.reset();

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
