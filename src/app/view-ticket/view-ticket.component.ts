import { Component, OnInit, EventEmitter, Input, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MaterializeAction } from 'angular2-materialize';
import { TicketService } from '../services/ticket.service';
import { Globals } from '../Globals';
import { GlobalserviceService } from '../globalservice.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BarcodeService } from '../services/barcode.service';
import { Product } from '../objects/product';
import { TicketBarCode } from '../objects/ticketbarcode';
import { TicketInfo } from '../objects/ticketInfo';
import { ProductInfo } from '../objects/productInfo';
import { ProductandchecklistmappingService } from '../services/productandchecklistmapping.service';
import { CheckList } from '../objects/checklist';
import { Location } from '@angular/common';
import { PartPrice } from '../objects/PartPrice';
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styles: [`
  .tabs .tab a{
    background-color: #f5f5f5;
    color: #000000;
  }

  .tabs .tab a.active{
    background-color: #ffffff;
    color: #000000;
  }

`],
  providers: [TicketService]


})
export class ViewTicketComponent implements OnInit {

  @Input('ticketId')
  ticketId: string;

  modalActions = new EventEmitter<string | MaterializeAction>();

  ticketinfo: TicketInfo = new TicketInfo();
  foundproduct: Boolean;
  currentTicketId: string = '0';
  status: string = '0';
  isDataLoaded: boolean = false;
  form: FormGroup;
  selectedproduct: Product;
  barcodeid: string;
  products: Product[];
  ticketbarcode: TicketBarCode;
  partPriceAry: PartPrice[] = new Array();
  totalCost: number = 0;
  constructor(private ticketService: TicketService, private globals: Globals,
    private barcodeservice: BarcodeService,
    private elRef: ElementRef, private productandchecklistmappingService: ProductandchecklistmappingService,
    private location: Location, private route: ActivatedRoute, private router: Router
    , private globalService: GlobalserviceService) {

    this.route.params.subscribe(params => this.ticketId = params['ticketId']);
  }
  ngOnInit() {

    console.log(this.ticketId);
    this.selectedproduct = null;

    this.products = [];
    this.getTicketInfo(this.ticketId);
    this.form = new FormGroup({

    });



  }

  reset() {

    this.form.reset();

  }

  getTicketInfo(ticketid) {
    this.ticketService.getTicketInfo(ticketid).subscribe(res => {
      console.log('Response' + res);
      this.ticketinfo = res;
    },
      err => {
        console.log('Error Occured' + err);
      }
    );
  }

  confirm() {
    let isfound: Boolean = false;
    for (let index = 0; index < this.products.length; index++) {

      if (this.ticketinfo.productInfos[index].product.id == this.selectedproduct.id) {
        isfound = true;


      }
    }



    if (!isfound) {
      console.log('this.selectedproduct' + this.selectedproduct);
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
      this.ticketbarcode.ticketId= Number(this.ticketId);
      // this.ticketService.saveTicketBarcode(this.ticketbarcode);
    }

    this.selectedproduct = null;
  }


  getTaskStatus(status) {
    if (status == null || status == undefined || status == false || status == 'false') {
      return false;
    } else {
      return true;
    }
  }
  getChecklist(productid): CheckList {
    let checklist: CheckList;
    this.productandchecklistmappingService.getchecklist(productid).subscribe(res => {

      checklist = res;
      return checklist;



    },
      err => {

        console.log('Error Occured' + err);

      }
    );

    return checklist;

  }
  // onSubmit() {

  //   this.selectedproduct = null;
  //   console.log('Inside SUbmit' + this.barcodeid);

  //   this.barcodeservice.getProduct(this.barcodeid).subscribe(res => {
  //     console.log('Response' + res);
  //     this.selectedproduct = res;

  //     this.foundproduct = true;
  //     console.log('foundproduct' + this.foundproduct);

  //     console.log('product.productName' + this.selectedproduct.productName);
  //   },
  //     err => {

  //       console.log('Error Occured' + err);
  //     }
  //   );




  // }

  showData() {
    console.log(this.currentTicketId);
    console.log(this.status);
  }

  loadData(ticketId) {
    console.log('ticketId' + this.ticketId);
    this.ticketId = ticketId;

  }

  goback() {
    this.location.back();
  }

  saveticketinfo() {
    this.ticketService.saveTickeInfo(this.ticketinfo).subscribe(
      res => {
        console.log(JSON.stringify(res));
      }
    )
  }
  addToEstimate(price) {
    console.log('Adding to  Ticket estimate' + price);
    this.ticketinfo.ticket.estimate = this.ticketinfo.ticket.estimate + price;

  }


  submitticket() {
    if (!this.isAllChecklistCompleted()) {
      alert('Please Complete All Checklist');

    } else {

    }

  }


  isAllChecklistCompleted(): Boolean {

    let isCheckListCompleted: Boolean = true;
    this.ticketinfo.productInfos.forEach(element => {
      element.checkList.tasks.forEach(task => {
        if (!task.status) {
          isCheckListCompleted = false;
          return;
        }
      });

    });
    return isCheckListCompleted;
  }

  onClick(menu: string) {
    console.log(menu);
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  onEstimate() {
    if (this.partPriceAry.length == 0) {
      this.ticketService.getEstimateForTicket(this.ticketId).subscribe(res => {
        console.log("got estimates");
        console.log(res);
        let cost: number = 0;
        for (var product in res) {
          if (res.hasOwnProperty(product)) {

            let tempproduct: any = res[product];
            let partPrice: PartPrice = new PartPrice(tempproduct[0].productname, tempproduct[0].partname, parseInt(tempproduct[0].price));
            this.partPriceAry.push(partPrice);
            this.totalCost = this.totalCost + partPrice.price;
          }

          console.log(this.partPriceAry);


        }
      });
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

  onClickStartWork() {
    console.log("on click of start work");
    this.router.navigate(['editTicket', { ticketId: this.ticketId }]);
  }

  getDisplayDateTimeForSchedule() {
    console.log(this.ticketinfo);
    let result: string = "";
    if (this.ticketinfo.formattedStartScheduledTime != undefined) {
      result = this.ticketinfo.formattedStartScheduledTime;
      if (this.ticketinfo.formattedEndScheduledTime != undefined && this.ticketinfo.formattedStartScheduledTime.length > 10) {
        result = result + " - " + this.ticketinfo.formattedEndScheduledTime.substring(10);
      }
    }
    return result;

  }


  enableStartWork() {
    if (this.ticketinfo != undefined) {
      console.log(this.ticketinfo);
      console.log(this.ticketinfo.ticket);

      if (this.ticketinfo.ticket.status.indexOf('ASSIGNED') >-1  && this.globalService.getRole().indexOf('FR') > -1 
      && this.ticketinfo.ticket.assignedTo == this.globalService.getuser().username){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
}
