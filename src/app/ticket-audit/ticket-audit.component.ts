import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {TicketService} from '../services/ticket.service';

@Component({
  selector: 'app-ticket-audit',
  templateUrl: './ticket-audit.component.html',
  styleUrls: ['./ticket-audit.component.css']
})
export class TicketAuditComponent implements OnInit {

localsource: LocalDataSource;

settings= {
	actions: {add: false, edit: false, delete: false},
    pager: {
      dispay: true,
      perPage: 10
    },
    columns: {
      ticketId: {
        title: "ID",
        editable: false,
        filter : false
      },
      updatedBy: {
        title: "Updated By",
        filter : false
      },
      strUpdatedDate: {
        title: "Updated On",
        filter : false
      },
      ticketStatus: {
        title: "Status",
        filter : false
      }
      
    }

  };

  constructor(private ticketService: TicketService) { 
  this.localsource = new LocalDataSource();
  }

  ngOnInit() {
  }
  
  onSearch(ticketId,status){
  console.log(ticketId);
  console.log(status);
  this.ticketService.getAuditForTicket(ticketId,status).subscribe((data)=>{
  console.log(data);
  this.localsource.load(data);
  });
  
  }

}
