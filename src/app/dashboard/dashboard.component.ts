import { Component, OnInit ,ViewChild} from '@angular/core';
import { ViewTicketButtonComponent } from '../view-ticket-button/view-ticket-button.component';
import { Router } from '@angular/router';
import { GlobalserviceService } from '../globalservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private globalservice: GlobalserviceService,private router:Router) { 
  }
 
  ngOnInit() {
  }

}
