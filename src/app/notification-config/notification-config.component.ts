import { Component, OnInit } from '@angular/core';
import {NotificationVO} from '../objects/notificationvo';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import  {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-notification-config',
  templateUrl: './notification-config.component.html',
  styleUrls: ['./notification-config.component.css'],
  providers:[NotificationService]
})
export class NotificationConfigComponent implements OnInit {

  notificationChanged : boolean = false;
  statusChange :boolean =false;
  ticketCreation:boolean = false;
  ticketAssignment:boolean = false;
  
  form :FormGroup = new FormGroup({
      statuschange: new FormControl('', Validators.required),
      ticketcreation: new FormControl('', Validators.required),
      ticketassignment: new FormControl('', Validators.required)
    });
  constructor(private notificationservice : NotificationService) { }

  ngOnInit() {
  
    this.notificationservice.view().subscribe((res)=>{
     console.log(res);
     this.statusChange = (res.statuschange + '' == 'true');
     this.ticketCreation = (res.ticketcreation + '' == 'true');
     this.ticketAssignment = (res.ticketassignment + '' == 'true');
	  
	  console.log(this.ticketAssignment);
	 this.form.value.statuschange= this.statusChange;
	 this.form.value.ticketcreation= this.ticketCreation;
	 this.form.value.ticketassignment= this.ticketAssignment;
    });
  
   
  }
  
  onSubmit(){
  let notificationvo = new NotificationVO();
    console.log(this.form);
    
    if(this.form.controls.statuschange.pristine){
    notificationvo.statuschange = this.statusChange;
    }else{
    notificationvo.statuschange = this.form.value.statuschange;
    }
    
    if(this.form.controls.ticketcreation.pristine){
    notificationvo.ticketcreation = this.ticketCreation;
    }else{
    notificationvo.ticketcreation = this.form.value.ticketcreation;
    }
    
    if(this.form.controls.ticketcreation.pristine){
    notificationvo.ticketassignment = this.ticketAssignment ;
    }else{
    notificationvo.ticketassignment  = this.form.value.ticketassignment ;
    }
    
    
    notificationvo.ticketassignment = this.form.value.ticketassignment;
    this.notificationservice.update(notificationvo).subscribe(res => {
    console.log(res);
      this.notificationChanged = true;
      console.log("response received");
    });
  }
  
  

}
