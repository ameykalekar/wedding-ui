import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ViewTicketButtonComponent } from './view-ticket-button/view-ticket-button.component';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { AssignTicketComponent } from './assign-ticket/assign-ticket.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from './services/ticket.service';
import { AppStatusComponent } from './app-status/app-status.component';
import { GridRadioButtonComponent } from './grid-radio-button/grid-radio-button.component';
import { DashboardService } from './services/dashboard.service';
import { CustomerService } from './services/customer.service';
import { Globals } from './Globals';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CreateticketComponent } from './createticket/createticket.component';
import { LoginComponent } from './login/login.component';
import { GlobalserviceService } from './globalservice.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginserviceService } from './services/loginservice.service';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { NotificationConfigComponent } from './notification-config/notification-config.component';
import { CreatechecklistComponent } from './createchecklist/createchecklist.component';
import { TaskserviceService } from './services/taskservice.service';
import { ChecklistserviceService } from './services/checklistservice.service';
import { ProductserviceService } from './services/productservice-service.service';
import { ViewProductsComponent } from './view-products/view-products.component';
import { CompanyComponent } from './company/company.component';
import { ProductandchecklistmappingComponent } from './productandchecklistmapping/productandchecklistmapping.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProductTypeService } from './services/product-type.service';
import { ReportingComponent } from './reporting/reporting.component';
import { ClientCustomerComponent } from './client-customer/client-customer.component';
import { CustomContactEditorComponent } from './custom-contact-editor/custom-contact-editor.component';
import { CustomIdEditorComponent } from './custom-id-editor/custom-id-editor.component';
import { EditchecklistComponent } from './editchecklist/editchecklist.component';
import { TicketAuditComponent } from './ticket-audit/ticket-audit.component';
import { CommentComponent } from './comment/comment.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { PartsproductmapppingComponent } from './partsproductmappping/partsproductmappping.component';
import { CreatepartsComponent } from './createparts/createparts.component';
import { EstimateComponent } from './estimate/estimate.component';
import { FrSchedulerComponent } from './fr-scheduler/fr-scheduler.component';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResourceGridComponent } from './resource-grid/resource-grid.component';
import { AddproducttoticketComponent } from './addproducttoticket/addproducttoticket.component';
import { OnboardproductComponent } from './onboardproduct/onboardproduct.component';
import { ReportsComponent } from './reports/reports.component';
import { Angular2CsvModule } from 'angular2-csv';
import { ReportEfficiencyComponent} from './report-efficiency/report-efficiency.component';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
  , { path: 'createticket', component: CreateTicketComponent }
  , { path: 'viewticket/:id', component: ViewTicketComponent }
  , { path: 'assignticket/:id', component: AssignTicketComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'home', component: HomeComponent }
  , { path: 'aboutus', component: AboutusComponent }
  , { path: 'createproduct', component: CreateproductComponent }
  , { path: 'createproducttype', component: ProductTypeComponent }
  , { path: 'createchecklist', component: CreatechecklistComponent }
  , { path: 'notificationconfig', component: NotificationConfigComponent }
  , { path: 'viewproducts', component: ViewProductsComponent }
  , { path: 'createuser', component: CreateuserComponent }
  , { path: 'changepassword', component: ChangePasswordComponent }
  , { path: 'createcompany', component: CompanyComponent }
  , { path: 'productcheklist', component: ProductandchecklistmappingComponent }
  , { path: 'changepassword', component: ChangePasswordComponent }
  , { path: 'mycustomers', component: ClientCustomerComponent }
  , { path: 'ticketaudit', component: TicketAuditComponent }
  , { path: 'editchecklist', component: EditchecklistComponent }
  , { path: 'viewtickets', component: ViewTicketsComponent }
  , { path: 'editTicket', component: EditTicketComponent }
  , { path: 'scheduler', component: FrSchedulerComponent }
  , { path: 'partproductassociation', component: PartsproductmapppingComponent }
  , { path: 'createpart', component: CreatepartsComponent }
  , { path: 'showticket', component: ViewTicketComponent }
  , { path: 'reports', component: ReportsComponent }
  , { path: 'onboard', component: OnboardproductComponent }
  
  , { path: '', component: HomeComponent }

];



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateTicketComponent,
    ViewTicketButtonComponent,
    OpenTicketsComponent,
    ViewTicketComponent,
    AssignTicketComponent,
    AppStatusComponent,
    GridRadioButtonComponent,
    SideNavComponent,
    CreateticketComponent,
    LoginComponent,
    HomeComponent,
    AboutusComponent,
    CreateproductComponent,
    ProductFormComponent,
    ProductTypeComponent,
    NotificationConfigComponent,
    CreateproductComponent,
    CreatechecklistComponent,
    ViewProductsComponent,
    CompanyComponent,
    ProductandchecklistmappingComponent,
    CreateuserComponent,
    ChangePasswordComponent,
    ReportingComponent,
    ClientCustomerComponent,
    CustomContactEditorComponent,
    CustomIdEditorComponent,
    TicketAuditComponent,
    EditchecklistComponent,
    CommentComponent,
    ViewTicketsComponent,
    CustomCheckboxComponent,
    FrSchedulerComponent,
    ResourceGridComponent,
    PartsproductmapppingComponent,
    CreatepartsComponent,
    EstimateComponent,
    AddproducttoticketComponent,
    OnboardproductComponent,
    ReportsComponent,
    ReportEfficiencyComponent,
    MyScheduleComponent,
    EditTicketComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes),
    Ng2SmartTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot(),
    NgbModalModule.forRoot(),
    BrowserAnimationsModule,
    Angular2CsvModule
  ],
  providers: [TicketService, CustomerService, Globals, DashboardService,
    GlobalserviceService, LoginserviceService, ProductserviceService, ChecklistserviceService, TaskserviceService, ProductTypeService],
  bootstrap: [AppComponent],
  entryComponents: [CustomCheckboxComponent, ViewTicketButtonComponent, GridRadioButtonComponent, CustomContactEditorComponent, CustomIdEditorComponent]
})
export class AppModule { }