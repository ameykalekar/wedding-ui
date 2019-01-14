import { Component, OnInit } from '@angular/core';
declare var bolt: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  RequestData = {
    key: 'rjQUPktU',
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

  constructor() { }

  ngOnInit() {
  }



  pay() {
    console.log('Paying');

    bolt.launch(this.RequestData, {
      responseHandler: function (BOLT) {
        console.log(BOLT.response.txnStatus);

      },
      catchException: function (BOLT) {

      }
    });
  }
}
