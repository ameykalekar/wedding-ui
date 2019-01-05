import { Input,Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-efficiency',
  templateUrl: './report-efficiency.component.html',
  styleUrls: ['./report-efficiency.component.css']
})
export class ReportEfficiencyComponent implements OnInit {
  
  @Input('openTickets') openTickets:string;
  @Input('rejectedTickets') rejectedTickets:string;
  @Input('inProgressTickets') inProgressTickets:string;
  @Input('totalTickets') totalTickets:string;

   
  constructor() { }

  ngOnInit() {
  }

}
