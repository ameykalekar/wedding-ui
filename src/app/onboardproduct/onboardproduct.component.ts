import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { GlobalserviceService } from '../globalservice.service';
import { UserService } from '../services/user.service';
import { Router } from '../../../node_modules/@angular/router';
import { Company } from '../objects/company';
import { CompanyService } from '../services/company.service';
import { ProductandchecklistmappingService } from '../services/productandchecklistmapping.service';
import { ProductAndCheckListMapping } from '../objects/productchecklistmapping';
import { ProductTypeService } from '../services/product-type.service';
import { Response } from '../../../node_modules/@angular/http';
import { HttpErrorResponse, HttpResponse } from '../../../node_modules/@angular/common/http';
import { ProductserviceService } from '../services/productservice-service.service';
import { CheckList } from '../objects/checklist';
import { ChecklistserviceService } from '../services/checklistservice.service';
import { PartproductmappingService } from '../services/partproductmapping.service';
import { Part } from '../objects/part';
import { PartService } from '../services/part.service';
import { PartProductMapping } from '../objects/partproductmapping';
import { BarcodeService } from '../services/barcode.service';
import { BarcodeProduct } from '../objects/barcodeProduct';
@Component({
  selector: 'app-onboardproduct',
  templateUrl: './onboardproduct.component.html',
  styleUrls: ['./onboardproduct.component.css']
})
export class OnboardproductComponent implements OnInit {

  selectedparts: Part[] = [];
  selectProductType = [];
  selectProductCategory = [];
  selectProductSubCategory = [];
  selectProductCompany = [];
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

  form: FormGroup;
  constructor(private globalservice: GlobalserviceService,
    private productandchecklistmappingservice: PartproductmappingService, private partservice: PartService,
    private router: Router, private producttypeservice: ProductTypeService, private productservice: ProductserviceService,
    private checklistservice: ChecklistserviceService,private barcodeservice: BarcodeService) { }

  ngOnInit() {
    this.getProductTypes();
    this.form = new FormGroup({
      productid: new FormControl('', Validators.required),
      checklistid: new FormControl(''),
      producttype: new FormControl('', [Validators.required]),
      category: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required),
      barcodeid: new FormControl('', Validators.required)
    });


   



    this.selectCheckList = [];
  }
  getAllChecklist(productid: string) {

    this.selectCheckList = [];

    this.partservice.getAllPartsByCompany().subscribe((res) => {
      console.log('Printing Response' + res);

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

  getProductCategory(producttype: string) {
    this.selectProductCategory = [];
    console.log('inside getProductCategory producttype: ' + producttype);
    this.productservice.getCategoryByProductType(producttype).subscribe((res) => {
      console.log('Response' + res);

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element);
        this.selectProductCategory.push({ value: element.toString(), name: element.toString() });
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



  getProductSubCategory(category: string) {
    this.selectProductSubCategory = [];
    console.log('inside getProductCategory producttype: ' + category);
    this.productservice.getSubCategoryByCategory(category).subscribe((res) => {
      console.log('Response' + res);

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element);
        this.selectProductSubCategory.push({ value: element.toString(), name: element.toString() });

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




  getProductCompany(category: string, subcategory: string) {
    this.selectProductCompany = [];
    console.log('inside getProductCompany producttype: ' + category);
    this.productservice.getBrandBySubCategoryByCategory(category, subcategory).subscribe((res) => {
      console.log('Response' + res);

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element);
        this.selectProductCompany.push({ value: element.toString(), name: element.toString() });

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

  getProducts(producttype: string, category: string, subcategory: string, brand: string) {
    this.selectProductProducts = [];
    console.log('inside getProductCategory producttype: ' + category);
    this.productservice.getByProductTypeAndCategoryAndSubCategoryAndProductBrand(producttype, category, subcategory, brand)
      .subscribe((res) => {
        console.log('Response' + res);
        if (res != null) {
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            console.log(element);
            this.selectProductProducts.push({ value: element.id, name: element.productName });

          }

        } else {
          this.productnotfound = true;
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

  getProductTypes() {
    this.selectProductType = [];
    this.producttypeservice.getProductTypes().subscribe((res) => {
      console.log('Response' + res);

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element);
        console.log(element.description);
        this.selectProductType.push({ value: element.type, name: element.type });
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


  getChecklist(productid: string) {
    this.checklistnotfound = true;





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
      }
    }
  };

  deletepart(i: any) {
    this.selectedparts.splice(i, 1);
  }

  reset() {
    this.form.reset();

    this.selectProductCategory = [];
    this.selectProductSubCategory = [];
    this.selectProductCompany = [];
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

    let partpoductmappings: PartProductMapping[] = [];

    for (let index = 0; index < this.selectedparts.length; index++) {
      partpoductmappings.push(new PartProductMapping(this.form.value.productid,
        this.selectedparts[index].id, this.globalservice.user.username
      ));
    }




     let barcodepart:BarcodeProduct = new BarcodeProduct();
     barcodepart.barcodeid=this.form.value.barcodeid;
     barcodepart.productId=this.form.value.productid;
    this.barcodeservice.saveBarcode(barcodepart).subscribe(res => {
      console.log('Response' + res);

      if (res !== null) {
        this.success = true;
        window.scrollTo(0, 0);
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

}


