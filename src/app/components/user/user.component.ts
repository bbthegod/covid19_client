/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../socket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  socket: SocketService;
  name = localStorage.getItem('name');
  //Form Sign Up
  form: FormGroup;
  constructor(private auth: AuthService, private router: Router, private user: UserService, private fb: FormBuilder) {}
  ngOnInit() {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
    });
    this.GetMe();
  }
  async GetMe() {
    const user = await this.user.GetMe();
    if (user)
      return (this.form = this.fb.group({
        studentId: [user.studentId, Validators.required],
        name: [user.name, Validators.required],
        phone: [user.phone, Validators.required],
        email: [user.email, Validators.email],
      }));
  }
  LogOut() {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.socket) {
        this.socket.disconnect();
        this.socket.onDisconnect().subscribe();
      }
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
  Infomation() {
    this.router.navigate(['user']);
  }
  Play() {
    this.router.navigate(['']);
  }
  async Update() {
    const body = this.form.value;
    const user = await this.user.update(body.studentId, body.name, body.phone, body.email);
    if (!user) return alert('Cập nhật thất bại !');
    return alert('Cập nhật thành công !');
  }
}
