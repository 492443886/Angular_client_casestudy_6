import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { RestfulService} from '../restful.service';
import { BASEURL} from '../constants';
import {LoginDetailComponent} from './login-detail.component'
@Component({
  template: `
    <mat-toolbar color="warn">
      <span>Login</span>
    </mat-toolbar>

    <img class="logo" src="assets/img/logo.png" style="width: 40px; height: auto; margin-left: 47%">

    <mat-card>
      <mat-card-content>
        <mat-card-header class="pad-left-xl pad-bottom-lg mat-title text-center">{{msg}}</mat-card-header>
          <app-login-detail (getuser)="login($event)"></app-login-detail>
      </mat-card-content>
    </mat-card>
`
})
export class LoginHomeComponent implements OnInit {
  model: any = {};
  user: User;
  msg: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public restService: RestfulService
  ) { }
  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.msg = 'enter login credentials';
  }
  login(user: User) {
    const url = `${BASEURL}login`;
    sessionStorage.setItem('token', user.username + ':' + user.password);
    this.restService.add(url, user)
      .subscribe(payload => {
          if (payload) { // server returns true if headers pass authentication
            this.router.navigate(['home']);
          } else {
            this.msg = 'Authentication failed.';
            sessionStorage.removeItem('token');
          }
        },
        err => {
          this.msg = 'Authentication failed.';
          sessionStorage.removeItem('token');
        });
  }
}
