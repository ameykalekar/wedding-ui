import { Injectable } from '@angular/core';
import { Ticket } from '../objects/ticket';
import { TicketAudit } from '../objects/ticket-audit';
import { GlobalserviceService } from '../globalservice.service';
import { tick } from '../../../node_modules/@angular/core/testing';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TicketBarCode } from '../objects/ticketbarcode';
import { ProductInfo } from '../objects/productInfo';
import { TicketInfo } from '../objects/ticketInfo';


@Injectable()
export class TicketService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    , withCredentials: true
  };



  constructor(private globalservice: GlobalserviceService, private http: HttpClient) { }

  getTickets() {
    return this.http.get('/api/OpenTickets', this.httpOptions);
  }

  getTicketInfo(ticketId) {
    return this.http.get<TicketInfo>('/api/getTicketInfo?ticketId=' + ticketId , this.httpOptions);
  }

  getAuditForTicket(ticketId, status) {
    return this.http.post<TicketAudit[]>('/api/getAuditForTicket?ticketId=' + ticketId + '&status=' + status, null, this.httpOptions);
  }

  getEstimateForTicket(ticketId){
    console.log("sending request");
    return this.http.post<Object[]>('/api/getEstimateDetails',ticketId, this.httpOptions);
  }
  getTicket(ticketId) {
    return this.http.get('/api/getTicket?id=' + ticketId, this.httpOptions);
  }

  assignTicket(ticketId, userId, type) {
    return this.http.get('/api/AssignTicket?ticketId=' + ticketId +
      '&userId=' + userId + '&type=' + type, this.httpOptions);
  }

  unAssignTicket(ticketId) {
    return this.http.get('/api/UnAssignTicket?ticketId=' + ticketId, this.httpOptions);
  }



  saveTicketBarcode(ticketBarCode: TicketBarCode) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('JSON' + JSON.stringify(ticketBarCode));
    return this.http.post('/api/savebarcode', JSON.stringify(ticketBarCode), this.httpOptions);
  }

  saveTickeInfo(ticketinfo: TicketInfo) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('JSON' + JSON.stringify(ticketinfo));
    return this.http.post('/api/saveTicketInfo', JSON.stringify(ticketinfo), this.httpOptions);
  }


  save(ticket: Ticket) {
    const headers = new Headers({ 'Conent-Type': 'application/json' });

    console.log('JSON' + JSON.stringify(ticket));
    return this.http.post('/api/createticket', JSON.stringify(ticket), this.httpOptions);
  }
}
