import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ProductTypeService} from '../services/product-type.service';
import {ProductType} from '../objects/product-type';
import {CustomCheckboxComponent} from '../custom-checkbox/custom-checkbox.component';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css'],
  providers: [ProductTypeService]
})
export class ProductTypeComponent implements OnInit {

  private localsource: LocalDataSource;

  settings= {
  	actions: {delete: true},
    add: {
      confirmCreate: true,
      addButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Add Product</span></div>',
      createButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Create</span></div>',
      cancelButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Cancel</span></div>'
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Disable</span></div>'
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Edit</span></div>',
      saveButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Update</span></div>',
      cancelButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Cancel</span></div>'
    },
    pager: {
      dispay: true,
      perPage: 10
    },
    columns: {
      id: {
        title: "ID",
        editable: false
      },
      type: {
        title: "Product Type"
      },
      description: {
        title: "Description"
      },
      active : {
      	title : "Active",
      	editor: {
          type: 'custom',
          component: CustomCheckboxComponent,
        }
      }
    }

  };

  constructor(private productTypeService: ProductTypeService) {
    this.localsource = new LocalDataSource();
    this.loadData();
  }



  loadData() {
    this.productTypeService.getProductTypes().subscribe((data) => {
      this.localsource.load(data);
    });
  }

  create(event) {
    let productType = new ProductType();
    productType.description = event.newData.description;
    productType.type = event.newData.type.toUpperCase();
    this.productTypeService.saveProductType(productType).subscribe((result) => {
      event.confirm.resolve(result);
    });
  }

  delete(event) {
  	console.log(event.data);
    this.productTypeService.removeProductType(event.data).subscribe((result) => {
      event.confirm.resolve(event.data);
    });
  }

  edit(event) {
  console.log(event.data);
    this.productTypeService.editProductType(event.newData).subscribe((result) => {
      event.confirm.resolve(event.newData);
    });
  }

  ngOnInit() {
  }

}
