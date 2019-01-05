import { Component, OnInit, EventEmitter, Input, Output,ViewChild } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';
import {MaterializeAction} from 'angular2-materialize';
import {Router} from "@angular/router";

import {ViewTicketComponent} from '../view-ticket/view-ticket.component';


@Component({
  selector: 'app-view-ticket-button',
  templateUrl: './view-ticket-button.component.html',
  styleUrls: ['./view-ticket-button.component.css']
})


export class ViewTicketButtonComponent implements ViewCell, OnInit {
  renderValue: string;
  testValue : string= "test";
  model1Params = [
  {
    ready : function() {console.log("ready");console.log(this);}
    }
  ];
  
  
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() value: string | number;
  @Input() rowData: any;

  //@ViewChild(ViewTicketComponent)
    //viewTicketComponent:ViewTicketComponent;
  
  
  constructor(private router: Router) { 
    
  }

  ngOnInit() {
     this.renderValue = this.value.toString().toUpperCase();
  }

  onClickView() {
    console.log(this.rowData);
    //this.save.emit(this.rowData);
  //  this.viewTicketComponent.loadData(this.rowData.id);
  this.router.navigate(['showticket',{ticketId:this.rowData.id}]);
  }

  onClickViewOpen() {
    console.log(this.rowData);
    //this.save.emit(this.rowData);

  //  this.viewTicketComponent.loadData(this.rowData.id);
  this.router.navigate(['showticket',{ticketId:this.rowData.id}]);
  }
}
