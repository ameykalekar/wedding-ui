import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  selector: 'app-custom-id-editor',
  templateUrl: './custom-id-editor.component.html',
  styleUrls: ['./custom-id-editor.component.css']
})
export class CustomIdEditorComponent extends DefaultEditor implements AfterViewInit {

 @ViewChild('id') name: ElementRef;
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

}
