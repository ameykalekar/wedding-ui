import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.css']
})
export class CustomCheckboxComponent extends DefaultEditor implements AfterViewInit{

@ViewChild('checkbox') checkbox: ElementRef;

  constructor() { 
  super();
  }

  ngAfterViewInit(){
  console.log(this.cell.newValue);
  if (this.cell.newValue !== '') {
  		 if(this.cell.newValue == 'true' || this.cell.newValue == 'TRUE'){
   		 this.checkbox.nativeElement.checked= true;
   		 }
   		 else{
   		 this.checkbox.nativeElement.checked= false;
   		 }
    }
  }
  ngOnInit() {
  }
  
  updateValue(event){
  const name = this.checkbox.nativeElement.checked;
  this.cell.newValue = `${name}`;
  }

}
