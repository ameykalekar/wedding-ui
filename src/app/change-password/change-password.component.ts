import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginserviceService} from '../services/loginservice.service';
import { ChangePasswordVo } from '../objects/ChangePasswordVo';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [LoginserviceService]
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  passwordChanged : boolean =false;
  constructor(private loginservice: LoginserviceService) {}

  ngOnInit() {

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      currentpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmnewpassword: new FormControl('', Validators.required),
    });
  }

  changePassword() {
    console.log("change password");
  }

  onSubmit() {
    console.log(this.form);
    console.log("username: " + this.form.value.username);
    console.log("currentpassword: " + this.form.value.currentpassword);
    console.log("newpassword: " + this.form.value.newpassword);
    console.log("confirmnewpassword : " + this.form.value.confirmnewpassword);
    const changePasswordVo = new ChangePasswordVo();
    changePasswordVo.username = this.form.value.username;
    changePasswordVo.currentpassword = this.form.value.currentpassword;
    changePasswordVo.newpassword = this.form.value.newpassword;
    changePasswordVo.confirmnewpassword = this.form.value.confirmnewpassword;
    
    this.loginservice.changePassword(changePasswordVo).subscribe(res => { 
    console.log(res);
      this.passwordChanged =  true;
    });
    
  }
}
