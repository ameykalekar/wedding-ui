import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ProductserviceService} from '../services/productservice-service.service';
import {Product} from '../objects/product';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
  providers: [ProductserviceService]
})
export class ViewProductsComponent implements OnInit {

  localsource: LocalDataSource;

  settings = {
    actions: {add:false,edit: true},
    //    add: {
    //      confirmCreate: true,
    //      addButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Add Product</span></div>',
    //      createButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Create</span></div>',
    //      cancelButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Cancel</span></div>'
    //    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Remove</span></div>'
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
      productName: {
        title: "Product Name"
      },
      productBrand: {
        title: "Brand"
      },
      productType: {
        title: "Type"
      },
      category: {
        title: "Category"
      },
      subCategory: {
        title: "Sub Category"
      },
      active: {
        title: "Active",
        type: "html",
        editor: {
          config: {
            list: [{value: 'Antonette', title: 'Antonette'}]
          }
        }
      }

    }

  };

  constructor(private productService: ProductserviceService) {
    this.localsource = new LocalDataSource();
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe((data) => {
      this.localsource.load(data);
    });
  }


  create(event) {
    //let productType = new ProductType();
    //productType.description = event.newData.description;
    //    productType.type = event.newData.type.toUpperCase();
    //    this.productTypeService.saveProductType(productType).subscribe((result) => {
    //      event.confirm.resolve(result);
    //    });
  }

  delete(event) {
    //    this.productTypeService.removeProductType(event.data).subscribe((result) => {
    //      event.confirm.resolve(event.data);
    //    });
  }

  edit(event) {
    //    this.productTypeService.editProductType(event.newData).subscribe((result) => {
    //      event.confirm.resolve(event.newData);
    //    });
  }


  ngOnInit() {
  }

}
