import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { interval } from 'rxjs';
import { GlobalserviceService } from '../globalservice.service';


@Component({
  selector: 'app-app-status',
  templateUrl: './app-status.component.html',
  styleUrls: ['./app-status.component.css'],
  providers: [DashboardService]
})
export class AppStatusComponent implements OnInit {

  private totalTickets: number = 1;
  private openTickets: number = 1;
  private percentOpenTicket: string = "1%";
  private showOpenTickets: boolean = false;
  private totalCustomer: number = 0;
  private ticketsInProgress: number = 0;
  private percentInProgressTicket: string = "1%";
  private totalUserCount: number = 0;
  constructor(private globalService: GlobalserviceService, private dashboardService: DashboardService) { }

  ngOnInit() {

    if (this.globalService.getValidUser() && this.globalService.isAuthorizedFunction('dashboard')) {


      this.dashboardService.getAppStatus().subscribe(data => {
        this.openTickets = data.openTickets;
        this.totalTickets = data.totalTickets;
        this.setOpenTicketsPercent();
        this.totalCustomer = data.customerCount;
        this.showOpenTickets = true;
        this.ticketsInProgress = data.ticketsInProgress;
        this.setInProgressPercent();
        this.totalUserCount = data.totalUserCount;
      });
      /* interval(50000)
        .subscribe(() => {
          this.dashboardService.getAppStatus().subscribe(data => {
            this.openTickets = data.openTickets;
            this.totalTickets = data.totalTickets;
            this.setOpenTicketsPercent();
            this.totalCustomer = data.customerCount;
            this.showOpenTickets = true;
            this.ticketsInProgress = data.ticketsInProgress;
            this.setInProgressPercent();
            this.totalUserCount = data.totalUserCount;
          }); 

        });*/

    }
  }

  ngOnDestroy() {

  }

  setOpenTicketsPercent() {
    this.percentOpenTicket = ((this.openTickets / this.totalTickets) * 100).toFixed(2) + "%";
  }

  setInProgressPercent() {
    this.percentInProgressTicket = ((this.ticketsInProgress / this.totalTickets) * 100).toFixed(2) + "%";
  }
}