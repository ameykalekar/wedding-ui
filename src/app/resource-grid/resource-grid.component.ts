import { Component, OnInit ,AfterViewInit,Output,EventEmitter,Input,OnChanges,SimpleChanges} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ResourceService} from '../services/resources.service';
import {GridRadioButtonComponent} from '../grid-radio-button/grid-radio-button.component';


@Component({
  selector: 'app-resource-grid',
  templateUrl: './resource-grid.component.html',
  styleUrls: ['./resource-grid.component.css'],
  providers: [ResourceService] 
})
export class ResourceGridComponent implements OnInit {
	
	
  localSourceResources: LocalDataSource;
  
  @Output() rowSelected = new EventEmitter();
  @Input() searchtext:string='';
    
  settingsresources = {
    
    actions: {add: false, edit: false, delete: false},
    columns: {
        username: {
          title: 'User Name',
          filter:false
        },
        firstname: {
          title: 'First Name',
          filter:false
        },
        lastname: {
          title: 'Last Name',
          filter:false
        }
       }
    	
    };
  	  
  		
  constructor(private resourceService : ResourceService) { 
    this.localSourceResources = new LocalDataSource();
    this.loadData();
  }
 
  
  loadData(){
  this.resourceService.getUsersByCompanyId().subscribe((data)=>{
        console.log(data);
    this.localSourceResources.load(data);
  });
}
  

  ngOnInit() {
  
  }
  
  onSearch(query: string = ''){
   console.log("qyery" + query);
   if(query==''){
   	this.localSourceResources.reset();
   	return;
   }
  	this.localSourceResources.setFilter([
    // fields we want to include in the search
    {
      field: 'username',
      search: query
    },
    {
      field: 'firstname',
      search: query
    },
    {
      field: 'lastname',
      search: query
    }
  ], false); 
  
  console.log(	this.localSourceResources);
  }
  
   ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.searchtext);
    this.onSearch(this.searchtext);
  }

onRowClick(event){
 console.log(event);
 this.rowSelected.emit(event);
}
}
