import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { GlobalserviceService } from '../globalservice.service';
import { TicketService } from '../services/ticket.service';
import { Route, Router } from '../../../node_modules/@angular/router';
import { Ticket } from '../objects/ticket';
import { Userinfo } from '../objects/userinfo';
import { UserService } from '../services/user.service';
import { ClientCustomerService } from '../services/client-customer.service';
import { CustomerService } from '../services/customer.service';
import { CustomerClient } from '../objects/customer-client';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  isind = true;
  firstName = '';
  selectedOption = '';
  clientid = '';
  selectedOptions = '';
  usertype = '';
  selectOptions = [];
  usertypes = [];
  clients = [];
  customercreated: boolean;
  userexist: boolean;
  customerclient: CustomerClient[] = [];
  form: FormGroup;
  constructor(private globalservice: GlobalserviceService,
    private userservice: UserService, private router: Router, private clientCustomerService: ClientCustomerService) { }

  ngOnInit() {
    this.customercreated = false;
    this.userexist = false;
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      mobileno: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      usertype: new FormControl('', Validators.required),

      clientid: new FormControl(''),

      emailid: new FormControl('', [Validators.required, Validators.email])
    });

    this.clientCustomerService.getCustomers().subscribe(res => {


      if (res !== null) {
        console.log(res);
        this.customerclient = res;

        for (let index = 0; index < this.customerclient.length; index++) {
          const element = this.customerclient[index];
          this.clients.push({ value: element.customerId, name: element.customerName });
          console.log(this.clients);
        }

      } else {


      }

    },
      err => {

        console.log('Error Occured' + err);
      }
    );
    if (this.globalservice.user.role == 'admin') {
      this.usertypes = [{ value: 'ind', name: 'Individual' },
      { value: 'comp', name: 'Client' }
      ];
    }
    if (this.globalservice.user.role == 'cadmin') {
      this.selectOptions = [
        { value: 'cadmin', name: 'Client Administrator' },
        { value: 'ccust', name: 'Client Customer' }]
    }
  }
  get mobileno() { return this.form.get('mobileno'); }
  reset() {
    this.form.reset();
    this.clients = [];
    this.selectOptions = [];
    this.userexist = false;
  }

  selectusertype(usertype) {
    if (usertype == 'ind') {
      this.isind = true;
      this.selectOptions = [
        { value: 'cust', name: 'Customer' },
        { value: 'admin', name: 'Administrator' },
        { value: 'FR', name: 'Field Represantative' },

      ];

    } else {
      this.isind = false;
      this.selectOptions = [
        { value: 'cadmin', name: 'Client Administrator' },
        { value: 'ccust', name: 'Client Customer' }]
    }





  }
  onSubmit() {

    let user;
    if (this.form.value.usertype == 'ind') {
      user = new Userinfo(this.form.value.emailid,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.address,
        this.form.value.mobileno,
        this.form.value.type,
        'Y',
        this.globalservice.user.companyId);

    } else {
      user = new Userinfo(this.form.value.emailid,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.address,
        this.form.value.mobileno,
        this.form.value.type,
        'Y',
        this.form.value.clientid);

    }

    this.userservice.save(user).subscribe(res => {
      console.log('Response' + res);

      if (res !== null) {


        this.customercreated = true;
        const source = timer(5000);

        const subscribe = source.subscribe(val => {
          this.customercreated = false;

        });
        window.scrollTo(0, 0);
        this.reset();
      } else {


      }

    },
      err => {
        if (err.status == '302') {

          this.userexist = true;
          const source = timer(5000);

          const subscribe = source.subscribe(val => {
            this.userexist = false;
  
          });
        
        }

      }
    );
    window.scrollTo(0, 0);
  }

}
