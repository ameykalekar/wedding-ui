import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  @Input('showProcessing')
  showProcessing:boolean=false;
  
  constructor() { }

  ngOnInit() {
  }

}
