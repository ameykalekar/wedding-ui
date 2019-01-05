import {Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {ViewTicketButtonComponent} from '../view-ticket-button/view-ticket-button.component';
import {HttpClient} from '@angular/common/http';
import {ServerDataSource, LocalDataSource} from 'ng2-smart-table';
import {TicketService} from '../services/ticket.service';
import {MaterializeAction} from 'angular2-materialize';
import {Globals} from '../Globals';
import {AssignTicketComponent} from '../assign-ticket/assign-ticket.component';
import { Router } from "@angular/router";
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
  styles: [`
      :host /deep/ ng2-smart-table nav {background-color : #ffffff !important;}
      :host /deep/ li.active {background-color : #ffffff !important;}
      :host /deep/ li span{color : #000000}
    `],
  providers: [TicketService]
})
export class OpenTicketsComponent implements OnInit {
  public enableAssign: boolean;
  public enableUnAssign: boolean;
  public currentTicketId: string;
  source: ServerDataSource;
  localsource: LocalDataSource;
  modalActions = new EventEmitter<string | MaterializeAction>();
  public mydata: any;
  

  @ViewChild(AssignTicketComponent)
  private assignTicketComponent: AssignTicketComponent;
  
  settings2 = {
    actions: {add: false, edit: false, delete: false},
    edit :{
    confirmSave :  true,
      editButtonComponent : '<i class = "small material-icons">edit</i>',
      saveButtonComponent : '<i class = "small material-icons">save</i>',
      cancelButtonComponent : '<i class = "small material-icons">cancel</i>',
    },
    pager: {
      display: true,
      perPage: 6
    },
    columns: {
      id: {
        title: 'Ticket ID',
        filter: true,
        editable :false
      },
      createdBy: {
        title: 'Initiator',
        editable :false
      },
      description: {
        title: 'Description',
        width : '20%',
        editor : {
        type : 'textarea'
        }
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {return '<div class="rcorners-teal">' + cell + '</div>';},
        editable :false
      },
      view: {
        title: 'View',
        type: 'custom',
        filter: false,
        renderComponent: ViewTicketButtonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            alert(`${row.id} saved!`);
          });
        },
        editable :false
      }
    },
  };

  constructor(private globalservice: GlobalserviceService,private router: Router, http: HttpClient, private ticketService: TicketService, private globals: Globals) {
    this.localsource = new LocalDataSource();
    this.refreshGrid();
  }

  refreshGrid() {
    this.ticketService.getTickets().subscribe((updateddata:any) => {
      this.mydata = JSON.stringify(updateddata);
      this.localsource.load(updateddata);
      this.localsource.refresh();
    });


  }


  ngOnInit() {
  }
  onRowClick(event) {
    console.log("on row click" + event);
    if (event.isSelected) {
      this.currentTicketId = event.selected[0].id;
      this.globals.setCurrentTicket(this.currentTicketId);
      if (event.selected[0].status.indexOf("SUBMITTED") > -1) {
        this.enableAssign = true;
        this.enableUnAssign = false;
      } else if (event.selected[0].status.indexOf("ASSIGNED") > -1) {
        this.enableAssign = false;
        this.enableUnAssign = true;
      } else {
        this.enableAssign = false;
        this.enableUnAssign = false;
      }
    }

  }

  onUpdateGrid(event) {
    this.refreshGrid();
    this.enableAssign = false;
    this.enableUnAssign = false;
  }

  onClickAssign() {
    console.log(this.currentTicketId);
	this.router.navigate(['assignticket',this.currentTicketId ]);     
    //this.openModal();
  }

  onClickUnAssign() {
    this.ticketService.unAssignTicket(this.globals.getCurrentTicket()).subscribe((data) => {
      this.enableAssign =false;
      this.enableUnAssign=false;
      this.refreshGrid();
    });
  }

  openModal() {
    this.modalActions.emit({action: "modal", params: ['open']});
  }

  render() {
    console.log("called function");
  }

  onClose() {
    console.log("on close");
  }
  
  
  edit(event) {
   console.log("in edit");
  }
}