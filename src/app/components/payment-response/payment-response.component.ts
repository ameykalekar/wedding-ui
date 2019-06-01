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
  color: string = 'green';


  @Input('responsevo')
  responsevo: ResponseVo;

  constructor() {
    console.log('Message' + this.message + 'responsevo' + this.responsevo);
  }

  ngOnInit() {
    console.log(this.message);
  }

}
