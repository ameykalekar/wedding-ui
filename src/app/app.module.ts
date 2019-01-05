import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MyProfileComponent,
    CreateProfileComponent
  ],
  imports: [
    MaterializeModule ,
    BrowserModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
