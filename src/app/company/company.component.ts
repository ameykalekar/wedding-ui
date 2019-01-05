import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { GlobalserviceService } from '../globalservice.service';
import { UserService } from '../services/user.service';
import { Router } from '../../../node_modules/@angular/router';
import { Company } from '../objects/company';
import { CompanyService } from '../services/company.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  created: boolean;
  selectOptions = [];
  companyexist =false;
  form: FormGroup;
  constructor(private globalservice: GlobalserviceService, private companyservice: CompanyService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      companyname: new FormControl('', Validators.required),
      ownername: new FormControl('', Validators.required),
      mobilenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      emailid: new FormControl('', [Validators.required, Validators.email])
    });
    this.selectOptions = [
      { value: 'cust', name: 'Mechanical' },
      { value: 'admin', name: 'Fire Fighting' },
      { value: 'FR', name: 'IT' },
      { value: 'FR', name: 'Retail' },
      { value: 'FR', name: 'Sales' }
    ];

    this.companyexist = false;

  }
  get mobileno() { return this.form.get('mobileno'); }
  reset() {
    this.form.reset();
    this.companyexist= false;
  }
  onSubmit() {
    const user = new Company(this.form.value.companyname,
      this.form.value.ownername,
      this.form.value.address,
      this.form.value.mobilenumber,
      this.form.value.type,

      this.form.value.emailid);





    this.companyservice.save(user).subscribe(res => {
      console.log('Response' + res);

      if (res !== null) {

        this.created = true;

        const source = timer(5000);

        const subscribe = source.subscribe(val => {
          this.created = false;

        });
        window.scrollTo(0, 0);
        this.reset();
      } else {


      }

    },
      err => { 

        if (err.status == '302') {
        this.companyexist = true;
        const source = timer(5000);

        const subscribe = source.subscribe(val => {
          this.companyexist = false;
          window.scrollTo(0, 0);

        });
      }


        console.log('Error Occured' + err);
      }
    );

  }

}
