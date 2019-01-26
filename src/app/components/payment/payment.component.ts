import { Component, OnInit, Input } from '@angular/core';
import { sequence } from '@angular/animations';
import * as cryptos from 'crypto-js';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestVo } from '../../vo/requestvo';
import { ProfileServiceService } from '../../services/profile-service.service';
import { ResponseVo } from '../../vo/responsevo';
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

  responsevo: ResponseVo = new ResponseVo();

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
    surl: 'http://localhost:4200/payment',
    furl: 'http://localhost:4200/payment',
    mode: 'dropout'// non-mandatory for Customized Response Handling
  };


  constructor(private router: Router, private profileservice: ProfileServiceService) {

  }

  ngOnInit() {
    this.RequestDatas.amount = '1';
    this.RequestDatas.firstname = 'Jaysinh';
    this.RequestDatas.phone = '6111111111';
    this.RequestDatas.email = 'dummyemail@dummy.com';
    this.RequestDatas.productinfo = 'Bag';
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
            console.log('Printing response' + JSON.stringify(BOLT.response));


            this.showSuccess = true;
            if (BOLT.response.txnStatus === 'CANCEL') {
              this.outmessage = 'Payment Cancelled By User';
              this.color = 'red darken-3';
              this.responsevo.message = 'Payment Cancelled By User';
              this.responsevo.color = 'red lighten-1';
            } else {
              this.responsevo.message = 'Payment Successful';
              this.responsevo.color = 'teal darken-1';
            }

            this.responsevo.txnid = BOLT.response.txnid;
            this.responsevo.txnMessage = BOLT.response.txnMessage;
            this.responsevo.txnStatus = BOLT.response.txnStatus;
            this.responsevo.firstname = BOLT.response.firstname;
            this.responsevo.mode = BOLT.response.mode;
            this.responsevo.amount = BOLT.response.amount;
            this.responsevo.bank_ref_num = BOLT.response.bank_ref_num;
            this.responsevo.email = BOLT.response.email;
            this.responsevo.phone = BOLT.response.phone;
            this.responsevo.paymentId = BOLT.response.paymentId;
            this.responsevo.hash = BOLT.response.hash;
            this.responsevo.status = BOLT.response.status;


            console.log(JSON.stringify(this.responsevo));



          },
          catchException: (BOLT) => {
            this.responsevo.message = 'Payment Failed';
            this.responsevo.color = 'red accent-4 ';
            this.showFailure = true;
            this.responsevo.txnid = BOLT.response.txnid;
            this.responsevo.txnMessage = BOLT.response.txnMessage;
            this.responsevo.txnStatus = BOLT.response.txnStatus;
            this.responsevo.firstname = BOLT.response.firstname;
            this.responsevo.mode = BOLT.response.mode;
            this.responsevo.amount = BOLT.response.amount;
            this.responsevo.bank_ref_num = BOLT.response.bank_ref_num;
            this.responsevo.email = BOLT.response.email;
            this.responsevo.phone = BOLT.response.phone;
            this.responsevo.paymentId = BOLT.response.paymentId;
            this.responsevo.hash = BOLT.response.hash;
            this.responsevo.status = BOLT.response.status;
            this.responsevo.error = BOLT.response.txnMessage;
            this.responsevo.error_Message = BOLT.response.error_Message;


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
