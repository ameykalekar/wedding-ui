import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  selector: 'app-custom-contact-editor',
  templateUrl: './custom-contact-editor.component.html',
  styleUrls: ['./custom-contact-editor.component.css']
})
export class CustomContactEditorComponent extends DefaultEditor implements AfterViewInit{

  @ViewChild('name') name: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;

  constructor() {
    super();
  }
  
    ngOnInit() {
  }
  

  ngAfterViewInit() {
    if (this.cell.newValue !== '') {
   		 this.name.nativeElement.value =    this.cell.newValue;
    }
  }

  updateValue(event) {
console.log("in update value");  
    const name = this.name.nativeElement.value;
    if(event.which>47 && event.which<58){
    	this.cell.newValue = `${name}`;
    }else{
    	event.stopImmediatePropagation();
    }
  }

onKeyDown(event){
	if(event.which>47 && event.which<58){
	}else{
	event.preventDefault();
	}
}

}
