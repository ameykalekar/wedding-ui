import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../globalservice.service';
import { TicketService } from '../services/ticket.service';
import { Route } from '../../../node_modules/@angular/compiler/src/core';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { ProductserviceService } from '../services/productservice-service.service';
import { Product } from '../objects/product';
import { ProductTypeService } from '../services/product-type.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  partcreated = false;
  selectProductType= [];
  form: FormGroup;
  constructor(private producttypeservice:ProductTypeService,
     private globalservice: GlobalserviceService, private productserviceService: ProductserviceService, private router: Router) { }

  ngOnInit() {
    this.getProductTypes();
    this.partcreated = false;
    this.form = new FormGroup({
      productName: new FormControl('', Validators.required),
      productBrand: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      subCategory: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      comments: new FormControl('')
    });
  }

  reset() {
    this.form.reset();
    
  }

  getProductTypes() {
    this.selectProductType = [];
    this.producttypeservice.getProductTypes().subscribe((res) => {
     for (let index = 0; index < res.length; index++) {
        const element = res[index];
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
  onSubmit() {
    const product = new Product(this.form.value.productName, this.form.value.productBrand,
      this.form.value.productType, this.form.value.category,
      this.form.value.subCategory, this.form.value.comments, 'Y', this.globalservice.user.companyId);
    console.log(product);
    this.productserviceService.saveProduct(product).subscribe(res => {
     

      if (res !== null) {
        this.partcreated = true;
        window.scrollTo(0, 0);
        this.reset();

      } 

    },
      err => {

        console.log('Error Occured' + err);
      }
    );
    window.scrollTo(0, 0);
  }


}
