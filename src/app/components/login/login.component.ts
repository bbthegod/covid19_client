/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formSignUp: FormGroup;
  formLogin: FormGroup;
  md5;
  constructor(private auth: AuthService, private router: Router, private user: UserService, private fb: FormBuilder) {}
  ngOnInit() {
    this.md5 = new Md5();
    this.formLogin = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.minLength(6)],
    });
    //Kiểm tra đăng nhập
    const token = localStorage.getItem('token');
    if (token) {
      this.auth
        .checkLogin(token)
        .then((res) => {
          if (res.code == 1) {
            const role = localStorage.getItem('role');
            if (role === 'user') {
              this.router.navigate(['']);
            } else {
              localStorage.clear();
            }
          } else {
            localStorage.clear();
          }
        })
        .catch((err) => {
          localStorage.clear();
        });
    } else {
      localStorage.clear();
    }
  }
  Login() {
    const body = this.formLogin.value;
    this.auth
      .logIn(body.studentId, body.password)
      .then((result) => {
        if (result.code == 1) {
          if (result.user.role === 'user') {
            localStorage.setItem('token', result.token);
            localStorage.setItem('name', result.user.name);
            localStorage.setItem('studentId', result.user.studentId);
            localStorage.setItem('role', result.user.role);
            sessionStorage.setItem('session', this.md5.appendStr(result.user.role + result.user.studentId).end());
            return this.router.navigate(['']);
          } else {
            localStorage.clear();
            alert('Không phải tài khoản người dùng !');
            this.router.navigate(['login']);
          }
        } else {
          localStorage.clear();
          alert(result.message);
        }
      })
      .catch((err) => {
        localStorage.clear();
        alert('Đăng nhập thất bại!');
      });
  }
}
