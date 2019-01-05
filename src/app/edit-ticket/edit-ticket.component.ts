import { Component, OnInit ,EventEmitter} from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { TicketInfo } from '../objects/ticketInfo';
import { ActivatedRoute } from "@angular/router";
import { Product } from '../objects/product';
import { BarcodeService } from '../services/barcode.service';
import { ProductInfo } from '../objects/productInfo';
import { ProductandchecklistmappingService } from '../services/productandchecklistmapping.service';
import { TicketBarCode } from '../objects/ticketbarcode';
import { Task} from '../objects/task';
import {ChecklistserviceService}  from '../services/checklistservice.service';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styles: [`
  .tabs .tab a{
    background-color: #f5f5f5;
    color: #000000;
  }

  .tabs .tab a.active{
    background-color: #ffffff;
    color: #000000;
  }

`]
//  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {


  ticketId: string;

  showProductPanel: boolean = false;

  ticketinfo: TicketInfo = new TicketInfo();

  selectedproduct: Product;

  enableEditChecklist:boolean= false;

  barcodeid: string;

  foundproduct: Boolean;

  ticketbarcode: TicketBarCode;

  taskAry: Task[]=[];


  modalActions = new EventEmitter<string | MaterializeAction>();


  constructor(private barcodeservice: BarcodeService, private route: ActivatedRoute, 
      private ticketService: TicketService,private checkListService:ChecklistserviceService,
      private productandchecklistmappingService: ProductandchecklistmappingService) {
    this.route.params.subscribe(params => this.ticketId = params['ticketId']);
  }

  ngOnInit() {
    
    this.getTicketInfo(this.ticketId);
  }

  getTicketInfo(ticketid) {
    this.ticketService.getTicketInfo(ticketid).subscribe(res => {
      this.ticketinfo = res;
      console.log(res);
    },
      err => {
        console.log('Error Occured' + err);
      }
    );
  }

  getTaskStatus(status) {
    if (status == null || status == undefined || status == false || status == 'false') {
      return false;
    } else {
      return true;
    }
  }

  getFormattedCreatedAt() {
    if (this.ticketinfo.ticket.createdAt.length > 0) {
      let day = parseInt(this.ticketinfo.ticket.createdAt.substring(8, 10));
      let month = parseInt(this.ticketinfo.ticket.createdAt.substring(5, 7));
      let year = parseInt(this.ticketinfo.ticket.createdAt.substring(0, 4));
      return month + "/" + day + "/" + year;
    } else {
      return "";
    }

  }

  getDisplayDateTimeForSchedule() {
    
    let result: string = "";
    if (this.ticketinfo.formattedStartScheduledTime != undefined) {
      result = this.ticketinfo.formattedStartScheduledTime;
      if (this.ticketinfo.formattedEndScheduledTime != undefined && this.ticketinfo.formattedStartScheduledTime.length > 10) {
        result = result + " - " + this.ticketinfo.formattedEndScheduledTime.substring(10);
      }
    }
    return result;

  }

  addProduct() {
    this.showProductPanel = true;
  }

  onSubmit() {

    this.selectedproduct = null;
    this.barcodeservice.getProduct(this.barcodeid).subscribe(res => {
    
      this.selectedproduct = res;
      this.foundproduct = true;
    
    },
      err => {

        console.log('Error Occured' + err);
      }
    );

  }

  
  confirm() {
    
      const productinfo: ProductInfo = new ProductInfo();
      productinfo.product = this.selectedproduct;
      this.productandchecklistmappingService.getchecklist(this.selectedproduct.id).subscribe(res => {

        productinfo.checkList = res;

        productinfo.barcodeId = this.barcodeid;
        this.ticketinfo.productInfos.push(productinfo);



      },
        err => {

          console.log('Error Occured' + err);

        }
      );






      this.ticketbarcode = new TicketBarCode();
      this.ticketbarcode.barcodeid = Number(this.barcodeid);
      this.ticketbarcode.ticketId = Number(this.ticketId);
    
       this.ticketService.saveTicketBarcode(this.ticketbarcode).subscribe(res=> console.log(res));
    

    this.selectedproduct = null;
 
  }
  editChecklist(){
    this.enableEditChecklist = true;
  }

  getTaskstatusForCheckBox(status){
    if (status == null || status == undefined || status == false || status == 'false') {
      return false;
    } else {
      return "checked";
    }    
  }

  onChangeTaskStatus(ticketId,checklistId,taskId,taskStatus){
       console.log(ticketId + "," + checklistId + "," + taskId + "," +  taskStatus);
       
       let task:Task = new Task();
       task.checklistId = checklistId;
       task.ticketId = ticketId;
       task.id = taskId;
       task.status = taskStatus;
       const tempTask = this.taskAry.find(x => x.id === taskId);
       if(tempTask == undefined){
       this.taskAry.push(task);
       }else{
        tempTask.status = taskStatus
       }
       
  }

  confirmTaskChecklist(){

    this.enableEditChecklist = false;
    console.log(this.ticketinfo.productInfos);

    this.ticketService.saveTickeInfo(this.ticketinfo).subscribe(
      res => {
        console.log(JSON.stringify(res));
      }
    )

  }

  enablePartSelection=true;
  addPartForProduct(){
    this.enablePartSelection=false;
    console.log("add part for product");  
  }
}
