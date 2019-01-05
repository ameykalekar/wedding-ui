import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ClientCustomerService} from '../services/client-customer.service';
import {CustomerClient} from '../objects/customer-client';
import {CustomContactEditorComponent} from '../custom-contact-editor/custom-contact-editor.component';
import {CustomIdEditorComponent} from '../custom-id-editor/custom-id-editor.component';
@Component({
  selector: 'app-client-customer',
  templateUrl: './client-customer.component.html',
  styleUrls: ['./client-customer.component.css'],	
    providers: [ClientCustomerService]
})
export class ClientCustomerComponent implements OnInit {


  localsource: LocalDataSource;

  settings= {
    add: {
      confirmCreate: true,
      addButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Add Customer</span></div>',
      createButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Create</span></div>',
      cancelButtonContent: '<div class="actionbtn" style="vertical-align:middle"><span>Cancel</span></div>'
    },
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
      customerId: {
        title: "ID",
        editable: false,
         filter: false,
         editor: {
          type: 'custom',
          component: CustomIdEditorComponent,
        }
      },
      customerName: {
        title: "Customer Name",
        filter: false
      },
      description: {
        title: "Description",
        filter: false
      },
      contact : {
      	title : "Contact",
      	filter: false, 
      	editor: {
          type: 'custom',
          component: CustomContactEditorComponent,
        }
      }
      
    }

  };	


  constructor(private clientCustomerService : ClientCustomerService) { 
  this.localsource = new LocalDataSource();
    this.loadData();
    }

  loadData() {
    this.clientCustomerService.getCustomers().subscribe((data) => {
      this.localsource.load(data);
    });
  }

  create(event) {
    let customerClient = new CustomerClient();
    customerClient.customerName = event.newData.customerName;
    customerClient.description = event.newData.description;
    customerClient.contact = event.newData.contact;
    
    this.clientCustomerService.saveCustomerClient(customerClient).subscribe((result) => {
      event.confirm.resolve(result);
    });
  }

  delete(event) {
    this.clientCustomerService.removeCustomerClient(event.data).subscribe((result) => {
      event.confirm.resolve(event.data);
    });
  }

  edit(event) {
    this.clientCustomerService.editCustomerClient(event.newData).subscribe((result) => {
      event.confirm.resolve(event.newData);
    });
  }

  ngOnInit() {
  }
  
  onSearch(query: string = '') {
  	console.log(query);
    
    if(query==''){
    this.localsource.reset();
    return;}
  
    this.localsource.setFilter([
      // fields we want to inclue in the search
      {
        field: 'customerId',
        search: query,
      },
      {
        field: 'customerName',
        search: query,
      },
      {
        field: 'description',
        search: query,
      },
      {
        field: 'contact',
        search: query,
      },
    ], false);
}

}
