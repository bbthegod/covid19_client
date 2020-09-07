/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  toLogin() {
    return this.router.navigate(['login']);
  }
  toHome() {
    return this.router.navigate(['']);
  }
}
