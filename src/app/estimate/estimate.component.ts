import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { GlobalserviceService } from '../globalservice.service';
import { Router } from '../../../node_modules/@angular/router';
import { ProductTypeService } from '../services/product-type.service';
import { HttpErrorResponse, HttpResponse } from '../../../node_modules/@angular/common/http';
import { ProductserviceService } from '../services/productservice-service.service';
import { CheckList } from '../objects/checklist';
import { ChecklistserviceService } from '../services/checklistservice.service';
import { PartproductmappingService } from '../services/partproductmapping.service';
import { Part } from '../objects/part';
import { PartService } from '../services/part.service';
import { BarcodePartMapping } from '../objects/barcodePartMapping';
@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

  @Input("productid")
  productid;

  @Input("barcodeid")
  barcodeid;
 
  @Input("productname")
  productname;

  selectedparts: Part[] = [];
  selectProductProducts = [];
  selectCheckList = [];
  selectCheckList1: Part[] = [];
  taskList = [];
  existingtaskList = [];
  productnotfound = false;
  checklistnotfound = false;
  checklist: CheckList = null;
  parts: Part[];
  success = false;
  totalEstimateForProduct: number = 0;

  form: FormGroup;
  constructor(private globalservice: GlobalserviceService,
    private productandchecklistmappingservice: PartproductmappingService, private partservice: PartService,
    private router: Router, private producttypeservice: ProductTypeService, private productservice: ProductserviceService,
    private checklistservice: ChecklistserviceService) { }

  ngOnInit() {
    this.form = new FormGroup({
      productid: new FormControl('', Validators.required),
      checklistid: new FormControl(''),
      producttype: new FormControl('', [Validators.required]),
      category: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required)

    });

     this.getPartsAllreadyAddedFOrEstimateInTicket();




    this.selectCheckList = [];
  }
  getPartsAssociatedWithProduct() {

    this.selectCheckList = [];

    this.productandchecklistmappingservice.getParts(this.productid).subscribe((res) => {
      console.log('Printing Response' + res);

      if(res==undefined)
      {
        return ;
      }
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log('sadfasdfasfd');
        console.log(element.partName);
        this.selectCheckList1.push(element);
        this.selectCheckList.push({ value: element.id, name: element.partName });

      }


    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );


  }

  getTasks(id: string) {
    console.log(this.form.value.checklistid);
    this.taskList = [];
    for (let index = 0; index < this.selectCheckList1.length; index++) {
      const element = this.selectCheckList1[index];
      console.log('test' + element.id);

      if (element.id == id) {
        console.log('Element Found');
        this.taskList.push(element);
      }
      console.log(element);
    }




  }







  getPartsAllreadyAddedFOrEstimateInTicket() {
    this.checklist = null;
    console.log("get all "+ this.barcodeid);
    this.productandchecklistmappingservice.getPartsByBarcodeID(this.barcodeid).subscribe((res) => {


      if (res != null) {

        this.parts = res;
        console.log(res);

        for (let index = 0; index < this.parts.length; index++) {

          const element = this.parts[index];

          this.existingtaskList.push({ value: element['id'], name: element['partName'],price:element['price'] });

        }
        console.log(this.existingtaskList);
      } else {
        this.checklistnotfound = true;
      }

      this.getPartsAssociatedWithProduct();


    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );

  }
  addpart() {
    for (let index = 0; index < this.selectedparts.length; index++) {
      if (this.selectedparts[index].id == this.form.value.checklistid) {
        return;
      }
    }

    for (let index = 0; index < this.selectCheckList1.length; index++) {

      if (this.selectCheckList1[index].id == this.form.value.checklistid) {
        this.selectedparts.push(this.selectCheckList1[index]);
        this.totalEstimateForProduct = this.totalEstimateForProduct + Number(this.selectCheckList1[index].price);

        this.valueChange.emit(Number(this.selectCheckList1[index].price));
      }
    }
  }

  deletepart(i: any) {
    this.totalEstimateForProduct = this.totalEstimateForProduct + this.pos_to_neg(Number(this.selectCheckList1[i].price));
    this.valueChange.emit(this.pos_to_neg(Number(this.selectCheckList1[i].price)));
    this.selectedparts.splice(i, 1);


  }

  onClickDelete(id:any){
    console.log(id);
  }

  pos_to_neg(num) {
    return -Math.abs(num);
  }
  reset() {
    this.form.reset();


    this.selectProductProducts = [];
    this.selectCheckList = [];
    this.selectCheckList1 = [];
    this.taskList = [];
    this.existingtaskList = [];
    this.productnotfound = false;
    this.checklistnotfound = false;
    this.success = false;
    this.checklist = null;
    this.selectedparts = [];
  }
  onSubmit() {

    let partpoductmappings: BarcodePartMapping[] = [];

    for (let index = 0; index < this.selectedparts.length; index++) {
      partpoductmappings.push(new BarcodePartMapping(this.barcodeid,
        this.selectedparts[index].id, this.globalservice.user.username
      ));
    }

    this.productandchecklistmappingservice.savePartsByBarcodeID(partpoductmappings).subscribe(res => {
      console.log('Response' + res);

      if (res !== null) {
        this.success = true;

        this.reset();
        // this.router.navigate(['/dashboard']);
      } else {


      }

    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }
    );

  }

  addPart(){
    console.log("in add part"); 
    console.log(this.selectCheckList1);
  }
}


