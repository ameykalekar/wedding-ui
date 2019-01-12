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
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { MyDatePickerModule } from 'mydatepicker';
import { SearchComponent } from './components/search/search.component';
import { DisplayProfilesComponent } from './components/display-profiles/display-profiles.component';

const appRoutes: Routes = [
  { path: 'myprofile', component: MyProfileComponent }
  , { path: 'register', component: CreateProfileComponent }
  , { path: 'editprofile/:id', component: EditProfileComponent }
  , { path: '', component: MyProfileComponent }
  , { path: 'search', component: SearchComponent }


];



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MyProfileComponent,
    CreateProfileComponent,
    EditProfileComponent,
    SearchComponent,
    DisplayProfilesComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MyDatePickerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
