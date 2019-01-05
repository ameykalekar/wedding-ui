import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { Ticket } from '../objects/ticket';
import { GlobalserviceService } from '../globalservice.service';
import { TicketService } from '../services/ticket.service';
import { Router } from '../../../node_modules/@angular/router';
import { RequestOptions } from '../../../node_modules/@angular/http';
import { timer } from 'rxjs';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  form: FormGroup;
  ticketcreated = false;
  ticketerror = false;
  constructor(private globalservice: GlobalserviceService, private ticketservice: TicketService, private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      devicelocatoin: new FormControl('', Validators.required),
      complaint: new FormControl('', [Validators.required, Validators.minLength(20)]),
      deviceid: new FormControl('')
    });
    this.ticketcreated = false;
    this.ticketerror = false;
  }
  reset() {
    this.form.reset();
   
  }
  onSubmit() {
    const ticket = new Ticket(this.globalservice.user.username, this.form.value.complaint,
      this.form.value.devicelocatoin, this.form.value.deviceid,"SUBMITTED");

    this.ticketservice.save(ticket).subscribe(res => {
   

      if (res !== null) {

        // this.router.navigate(['/dashboard']);
        
        this.ticketcreated = true;

        const source = timer(5000);

        const subscribe = source.subscribe(val => {
          this.ticketcreated = false;

        });
        this.reset();
        window.scrollTo(0, 0);
      } else {


      }

    },
      err => {
        this.ticketerror = true;
        const source = timer(5000);

        const subscribe = source.subscribe(val => {
          this.ticketerror = false;

        });
        console.log('Error Occured' + err);
      }
    );

  }

}
