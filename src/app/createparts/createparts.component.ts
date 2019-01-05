import { Component, OnInit } from '@angular/core';
import { Product } from '../objects/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalserviceService } from '../globalservice.service';
import { ProductserviceService } from '../services/productservice-service.service';
import { Router } from '@angular/router';
import { Part } from '../objects/part';
import { PartService } from '../services/part.service';

@Component({
  selector: 'app-createparts',
  templateUrl: './createparts.component.html',
  styleUrls: ['./createparts.component.css']
})
export class CreatepartsComponent implements OnInit {
  partcreated = false;
  form: FormGroup;
  constructor(private globalservice: GlobalserviceService,
     private partservice: PartService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      productName: new FormControl('', Validators.required),
      productBrand: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      subCategory: new FormControl('', Validators.required),
      productType: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      comments: new FormControl('')
    });
  }

  reset() {
    this.form.reset();
 
  }
  onSubmit() {
    const part = new Part(this.form.value.productName, this.form.value.productBrand,
      this.form.value.productType, this.form.value.category,
      this.form.value.subCategory, this.form.value.comments, this.form.value.price, this.globalservice.user.companyId);
    console.log(part);
    this.partservice.savePart(part).subscribe(res => {
      console.log('Response' + res);

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
