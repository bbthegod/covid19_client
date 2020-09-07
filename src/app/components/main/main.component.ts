/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../socket';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  socket: SocketService;
  private role: string;
  start = false;
  token;
  name;
  studentId;
  session;
  md5;
  constructor(private auth: AuthService, private router: Router, private user: UserService) {}

  ngOnInit() {
    this.start = false;
    this.role = localStorage.getItem('role');
    this.token = localStorage.getItem('token');
    this.name = localStorage.getItem('name');
    this.Check();
  }
  private FailedCheck() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  async Check() {
    if (this.token && this.role) {
      const result = await this.auth.checkLogin(this.token);
      if (!result) return this.FailedCheck();
      if (this.role !== 'user') return this.FailedCheck();
      return this.router.navigate(['']);
    } else {
      this.FailedCheck();
    }
  }
  LogOut() {
    const token = localStorage.getItem('token');
    if (token && confirm('Bạn có muốn đăng xuất ?')) {
      if (this.socket) {
        this.socket.disconnect();
        this.socket.onDisconnect().subscribe();
      }
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
  Play() {
    this.router.navigate(['']);
  }
  Start() {
    this.start = !this.start;
    this.socket = new SocketService();
  }
  checkRole() {
    this.md5 = new Md5();
    this.studentId = localStorage.getItem('studentId');
    this.session = sessionStorage.getItem('session');
    const s = this.md5.appendStr(this.role + this.studentId).end();
    if (this.session == s) {
      return true;
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('studentId');
      localStorage.removeItem('name');
      return false;
    }
  }
}
