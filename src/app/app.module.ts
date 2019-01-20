import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { MyDatePickerModule } from 'mydatepicker';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { LogoutComponent } from './components/logout/logout.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SearchComponent } from './components/search/search.component';
import { DisplayProfilesComponent } from './components/display-profiles/display-profiles.component';
import { GenericsearchPipe } from './genericsearch.pipe';
import { ScrollEventModule } from 'ngx-scroll-event';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PaymentResponseComponent } from './components/payment-response/payment-response.component';
import { PaymentFailureComponent } from './components/payment-failure/payment-failure.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProceduresComponent } from './components/procedures/procedures.component';

const appRoutes: Routes = [
  { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] }
  , { path: 'register', component: CreateProfileComponent }
  , { path: 'editprofile/:id', component: EditProfileComponent, canActivate: [AuthGuard] }
  , { path: 'front', component: FrontPageComponent }
  , { path: 'login', component: UserLoginComponent }
  , { path: 'search', component: SearchComponent }
  , { path: 'logout', component: LogoutComponent }
  , { path: 'payment', component: PaymentComponent }
  , { path: '', component: FrontPageComponent }

];



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MyProfileComponent,
    CreateProfileComponent,
    EditProfileComponent,
    FrontPageComponent,
    RouterOutletComponent,
    UserLoginComponent,
    LogoutComponent,
    PreloaderComponent,
    SearchComponent,
    DisplayProfilesComponent,
    GenericsearchPipe,
    PaymentResponseComponent,
    PaymentFailureComponent,
    PaymentComponent,
    ProceduresComponent

  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MyDatePickerModule,
    ScrollEventModule,
    InfiniteScrollModule,

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {


}
