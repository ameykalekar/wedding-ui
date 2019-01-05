import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {TicketService} from  '../services/ticket.service';
import {Globals} from '../Globals';

@Component({
  selector: 'app-grid-radio-button',
  templateUrl: './grid-radio-button.component.html',
  styleUrls: ['./grid-radio-button.component.css']
})
export class GridRadioButtonComponent implements ViewCell,OnInit {

  @Input() rowData : any;
  @Input() value : string | number;
  
  renderValue:string;
  @Output() save: EventEmitter<any> = new EventEmitter();
  
  constructor(private ticketService:TicketService, private globals:Globals) { }

  ngOnInit() {
  }
  
  onClick(){
  console.log("on click of assign");
    this.save.emit(this.rowData);
  
  }

}
