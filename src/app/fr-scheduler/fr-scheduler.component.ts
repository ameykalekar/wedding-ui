import { Component, OnInit,EventEmitter,ChangeDetectionStrategy,ViewChild,TemplateRef,Input } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService} from '../services/resources.service';
import { Schedule} from '../objects/schedule'
import { Router} from '@angular/router';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};



@Component({
  selector: 'app-fr-scheduler',
  templateUrl: './fr-scheduler.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./fr-scheduler.component.css'],
  providers : [ResourceService]
})
export class FrSchedulerComponent  {

 dateSlot = new EventEmitter<string | MaterializeAction>();
 
 @ViewChild('modalContent') modalContent: TemplateRef<any>;
   
  view: string = 'day';
  
  searchquery:string='';
  
  startTime:string;
  
  endTime:string;
  
  viewDate: Date = new Date();
  
  @Input() 
  ticketId:string='';
  
 schdate:string;
 
   dateParams = [{
    format: 'dd/mm/yyyy',
    onSet: () => { this.change(); }
  }];
  
 dateString:string = '';
  
  
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,private resourceService: ResourceService,private router:Router) {}

  selectedUsername:string='';	
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    console.log("in handle calendar event");
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
    
  }

  handleEvent(action: string, event: CalendarEvent): void {
  	console.log("in handle event");
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
    console.log("in add calendar event");
  }
	
  change(){
  	console.log(this.schdate);
  	if(this.schdate!=undefined && this.schdate!=''){
  	let day   = parseInt(this.schdate.substring(0,2));
	let month  = parseInt(this.schdate.substring(3,5));
	let year   = parseInt(this.schdate.substring(6,10));
  	this.viewDate = new Date(year,month-1,day)
  	}
 	console.log(this.schdate);
 	console.log(this.viewDate);
  }
  
  onRowSelect(event)
  {
  console.log(event);
  this.events= [];
  //fetch the schedule of the user and set it in the calendar.
  this.selectedUsername=event.data.username;
  this.resourceService.getScheduleForRsource(event.data.username).subscribe((res)=>{
  
  console.log(res);
  	for(let entry of res){
  		console.log(entry.startTime);
  		console.log(entry.endTime);

  		let day   = parseInt(entry.startTime.substring(8,10));
		let month  =parseInt (entry.startTime.substring(5,7));
		let year   = parseInt(entry.startTime.substring(0,4));
  		let hour  = parseInt (entry.startTime.substring(11,13));
  		let min= parseInt(entry.startTime.substring(14,16));
  		let sec= parseInt(entry.startTime.substring(17));
  		
  		
  		let endday   = parseInt(entry.endTime.substring(8,10));
		let endmonth  =parseInt (entry.endTime.substring(5,7));
		let endyear   = parseInt(entry.endTime.substring(0,4));
  		let endhour  = parseInt (entry.endTime.substring(11,13));
  		let endmin= parseInt(entry.endTime.substring(14,16));
  		let endsec= parseInt(entry.endTime.substring(17));
  		
  		console.log( new Date(year, month-1, day, hour, min, sec,0));
  		console.log(new Date(endyear, endmonth-1, endday, endhour, endmin, endsec,0));
  		
  		let date1 = new Date(year, month-1, day, hour, min, sec,0);
  		let date2 = new Date(endyear, endmonth-1, endday, endhour, endmin, endsec,0);
  		let title = "Ticket:" +entry.ticketId;
  		this.events.push({
  		 title: title,
      	 start: date1,
      	 end: date2,
      	 color: colors.red
  		});
  		console.log(this.events);
  		this.refresh.next();
  	}
  });
  
  }
  
  onSearch(text){
  	this.searchquery=text;
  }	
  
  createCalenderEvent(){
	  let tempStartDate = new Date(this.viewDate);
	 
	  console.log(this.startTime);
	  console.log(this.endTime);
	  let schedule = new Schedule();
	  schedule.dateDay=tempStartDate.getDate();
	  schedule.dateMonth=tempStartDate.getMonth();
	  schedule.dateYear=tempStartDate.getFullYear();
	  schedule.schStartTime=this.startTime;
	  schedule.schEndTime=this.endTime;
	  schedule.ticketId= this.ticketId;
	  if( this.selectedUsername!=undefined || this.selectedUsername!='' ){
	  this.resourceService.scheduleTimeForResource(this.selectedUsername,schedule).subscribe(res=>{
	  console.log(res);
	  this.router.navigate(['/dashboard']);
	  });
	  }
  }
 
}
