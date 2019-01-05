import {Component, OnInit, EventEmitter,Input,Output,AfterViewInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ResourceService} from '../services/resources.service';
import {CustomerService} from '../services/customer.service';
import {TicketService} from '../services/ticket.service';
import {MaterializeAction} from 'angular2-materialize';
import {GridRadioButtonComponent} from '../grid-radio-button/grid-radio-button.component';
import {Globals} from '../Globals';
import {ActivatedRoute}  from "@angular/router";
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css'],
  providers: [ResourceService,CustomerService,TicketService]
})
export class AssignTicketComponent implements OnInit,  AfterViewInit {
  public enableAssign: boolean;
  localSourceResources: LocalDataSource;
  public  showSchedule:boolean=false;
  public showUsers : boolean = true;
  public ticketId : string = '';	
  @Input('modalAction')
  modalActions : EventEmitter<string|MaterializeAction>;
  
  @Output() updateGrid = new EventEmitter<boolean>();
  
  settingsresources = {
    pager: {
    diplay:false,
      perPage:5
    
    },
    actions: {add: false, edit: false, delete: false,custom:[{name:'schedule',title:'Schedule'}]},
    columns: {
        username: {
          title: 'User Name'
        },
        firstname: {
          title: 'First Name'
        },
        lastname: {
          title: 'Last Name'
        },
        mobilenumber: {
          title: 'Contact No'
        },
        type: {
          title: 'User Type'
        }
        
    	}
    };


  constructor(private globalservice:GlobalserviceService,private route:ActivatedRoute,private resourceService : ResourceService, private customerService: CustomerService, private ticketService:TicketService, private globals:Globals) {
    this.localSourceResources = new LocalDataSource();
    this.route.params.subscribe( params => {
    		console.log(params);
    		this.ticketId = params['id'];
    } );
    this.globals.setComponent(this);
  }
  
  closeModal(){
    this.modalActions.emit({action:"modal",params:['close']});
    this.updateGrid.emit(true);
     this.showSchedule = false;
   this.showUsers =true;
  }
  
  ngAfterViewInit()
  {
  if(this.globalservice.isAuthorizedFunction("viewusers")){
  this.loadData();
  }
  
  }
  
  loadData(){
  this.resourceService.getAllResources().subscribe((data)=>{
        console.log(data);
    this.localSourceResources.load(data);
  });
}
  ngOnInit() {
  	
  }

onCustom(event){
this.showSchedule = true;
this.showUsers =false;
}
}
