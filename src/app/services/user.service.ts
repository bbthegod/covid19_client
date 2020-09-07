import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'rxjs';
import { config } from '../config';

@Injectable()
export class UserService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer hithaui10years',
  });
  private heroesUrl = config.Url + '/api/auth';

  constructor(private http: HttpClient) {}
  public SignUp(studentId: string, password: string, name: string, phone: string, email: string): Promise<any> {
    let Url = this.heroesUrl + '/signup';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);
    urlSearchParams.append('password', password);
    urlSearchParams.append('phone', phone);
    urlSearchParams.append('name', name);
    urlSearchParams.append('email', email);
    return this.http
      .post(Url, urlSearchParams.toString(), { headers: this.headers })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }
  public GetMe(): Promise<any> {
    let Url = config.Url + '/api/user/info/me';
    return this.http
      .get(Url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }
  public update(studentId: string, name: string, phone: string, email: string): Promise<any> {
    let Url = config.Url + '/api/user/info/me';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);
    urlSearchParams.append('phone', phone);
    urlSearchParams.append('name', name);
    urlSearchParams.append('email', email);
    return this.http
      .post(Url, urlSearchParams.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
