import { Component, OnInit, Input } from '@angular/core';
import { ResponseVo } from '../../vo/responsevo';

@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.css']
})
export class PaymentResponseComponent implements OnInit {

  @Input('message')
  message: string;


  @Input('color')
  color: string;


  @Input('responsevo')
  responsevo: ResponseVo;

  constructor() {

    console.log(this.message);
  }

  ngOnInit() {
    console.log(this.message);
  }

}
