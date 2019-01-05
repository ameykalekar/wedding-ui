import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginserviceService } from '../services/loginservice.service';
import { User } from '../objects/user';
import { GlobalserviceService } from '../globalservice.service';
import { Router } from '../../../node_modules/@angular/router';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validLogin: boolean;
  uname: string;
  password: string;
  nuname: string;
  npassword: string;
  form: FormGroup;
  obj: any;
  constructor(private loginservice: LoginserviceService, private globalservice: GlobalserviceService,
     private router: Router,private userservice:UserService) { }

  ngOnInit() {
    this.validLogin = false;

    

  /** 
    if (localStorage.getItem('currentUser')) {
          // logged in so return true
          console.log('Found in Local Storage');
        this.globalservice.user=JSON.parse(localStorage.getItem('currentUser'));
        this.globalservice.validuser=true;

        this.router.navigate(['/dashboard']);
  
        }*/
    
        console.log('Not Found in Local Storage');
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const user = new User(this.form.value.firstName, this.form.value.password, 'test', 'test', null);
    this.loginservice.validatelogin(user).subscribe(res => {
      if (res !== null) {
        this.globalservice.setValidUser(true);
        console.log(res);
        let User = res;
        this.globalservice.setUser(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
        console.log("-----------");
        console.log(this.globalservice);
        this.router.navigate(['/dashboard']);
      } else {
        this.globalservice.setValidUser(false) ;
      }
      console.log(res);
    },
      err => {
        this.globalservice.serverworking = false;
        console.log('Error Occured' + err);
      }
    );
    this.validLogin = true;
  }

  changePassword() {
    this.router.navigate(['changepassword']);
  }

}
