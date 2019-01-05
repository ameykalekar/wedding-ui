import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { Schedule} from '../objects/schedule';
import { ResourceService} from '../services/resources.service';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css'],
  providers:[ResourceService]
})
export class MyScheduleComponent implements OnInit {

  scheduleAry:Schedule[];
  constructor(private globalService : GlobalserviceService,private resourceService:ResourceService) { }

  ngOnInit() {
    console.log("role is fr-" + this.globalService.getuser().role );
    if(this.globalService.getuser().role=="FR"){
      console.log("role is fr-" + this.globalService.getuser().role );

      this.fetchSchedule();
    }


  }

  fetchSchedule(){
  
    this.resourceService.getSchedule().subscribe(res=>{
      console.log(res);
      this.scheduleAry = res;
      console.log(this.scheduleAry);
    });

  }
}
