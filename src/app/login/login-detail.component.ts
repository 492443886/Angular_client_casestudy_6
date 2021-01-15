import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.html'
})
export class LoginDetailComponent implements OnInit {
  @Output() getuser = new EventEmitter();
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  user: User;
  constructor(private builder: FormBuilder) {
    this.username = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl('', Validators.compose([Validators.required]));
  } // constructor
  ngOnInit() {
    this.loginForm = this.builder.group({
      username: 'evan',
      password: ''
    });
  } // ngOnInit
  builduser() {
    const frmJson = this.loginForm.getRawValue();
    this.user = {username: frmJson.username, password: frmJson.password};
    this.getuser.emit(this.user);
  }
} // LoginDetailComponent
