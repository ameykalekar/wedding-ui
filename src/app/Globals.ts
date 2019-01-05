import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  private currentTicket:string = '';
  
  private component:any;
  
  setComponent(component){
  this.component = component;
  }
  
  getComponent(){
  return this.component;
  }
  
  getCurrentTicket(){
  return this.currentTicket;
  }
  
  setCurrentTicket(currentTicket){
  this.currentTicket = currentTicket;
  }
  
  constructor() { }


}
