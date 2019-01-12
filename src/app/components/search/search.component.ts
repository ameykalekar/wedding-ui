import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  mariatalstatus = [{ name: 'Married', value: 'Married' },
  { name: 'Single', value: 'Single' },
  { name: 'Widow', value: 'Widow' },
  { name: 'Divorced', value: 'Divorced' },
  ];



  Education = [{ name: 'ALL', value: 'ALL' },
  { name: 'BE', value: 'BE' },
  { name: 'ME', value: 'ME' },
  { name: 'BA', value: 'BAs' },
  ];

  district = [{ name: 'ALL', value: 'ALL' },
  { name: 'NASHIK', value: 'NASHIK' },
  { name: 'SOLAPUR', value: 'SOLAPUR' }

  ];

  state = [{ name: 'ALL', value: 'ALL' },
  { name: 'MAHARASTRA', value: 'MAHARASTRA' },
  { name: 'SOLAPUR', value: 'SOLAPUR' }

  ];


  religion = [{ name: 'ALL', value: 'ALL' },
  { name: 'HINDU', value: 'MAHARASTRA' },
  { name: 'JAIN', value: 'SOLAPUR' }

  ];

  selectOptions = [{ name: 'Married', value: 'Married' },
  { name: 'Single', value: 'Single' },
  { name: 'Widow', value: 'Widow' },
  { name: 'Divorced', value: 'Divorced' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
