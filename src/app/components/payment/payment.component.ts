import { Component, OnInit, Input } from '@angular/core';
import { sequence } from '@angular/animations';
import * as cryptos from 'crypto-js';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestVo } from '../../vo/requestvo';
import { ProfileServiceService } from '../../services/profile-service.service';
declare var bolt: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  form: FormGroup;
  outmessage: string = '';
  color = '';
  hashSequence: string;
  showSuccess = false;
  showFailure = false;

  @Input('RequestDatas')
  RequestDatas: RequestVo = new RequestVo();

  RequestData = {
    key: 'DpGl9K',
    txnid: '123456789',
    hash: 'defdfaadgerhetiwerer',
    amount: '1',
    firstname: 'Jaysinh',
    email: 'dummyemail@dummy.com',
    phone: '6111111111',
    productinfo: 'Bag',
    surl: 'https://sucess-url.in',
    furl: 'https://fail-url.in',
    mode: 'dropout'// non-mandatory for Customized Response Handling
  };






  constructor(private router: Router, private profileservice: ProfileServiceService) {





    this.RequestDatas.amount = '1';
    this.RequestDatas.firstname = 'Jaysinh';
    this.RequestDatas.phone = '6111111111';
    this.RequestDatas.email = 'dummyemail@dummy.com';
    this.RequestDatas.productinfo = 'Bag';



  }

  ngOnInit() {

    this.form = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),

      caste: new FormControl('', [Validators.required, Validators.pattern('^[_A-z]*((-|\s)*[_A-z])*$')]),

    });
  }



  pay() {
    console.log('Paying');
    this.hashSequence = this.RequestData.key + '|' + this.RequestData.txnid + '|' + this.RequestData.amount + '|' + this.RequestData.productinfo + '|' + this.RequestData.firstname + '|' + this.RequestData.email + '|' + '||||||||||' + 'KFSwE2j1';
    console.log('hashSequence' + this.hashSequence);
    const enc = cryptos.SHA512(this.hashSequence).toString(cryptos.enc.Hex);
    console.log('Hash' + enc);
    // this.RequestData.hash = enc;

    this.profileservice.getProfileRequestVO(this.RequestDatas).subscribe(res => {


      if (res !== null) {
        this.RequestData = res;
        console.log('hashfrom java' + this.RequestData.hash);


        console.log('caling bolt' + JSON.stringify(this.RequestData));
        bolt.launch(this.RequestData, {
          responseHandler: (BOLT) => {
            console.log('Printing response' + BOLT.response.txnStatus);


            this.showSuccess = true;
            if (BOLT.response.txnStatus === 'CANCEL') {
              this.outmessage = 'Payment Cancelled By User';
              this.color = 'red darken-3';
            }
            console.log(this.showSuccess);



          },
          catchException: (BOLT) => {
            this.showFailure = true;
          }
        });
      }

    },
      err => {

        console.log('Error Occured' + err);
      }


    );

  }
}
