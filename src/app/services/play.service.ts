/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs';
import { config } from '../config';

@Injectable()
export class PlayService {
  private url = config.Url + '/api/play';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  private headersWithToken(token) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  private succeed(res) {
    return res;
  }

  private failed(e) {
    return null;
  }

  public GetQuestion(studentId: string): Promise<any> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);
    return this.http
      .post(this.url, urlSearchParams.toString(), this.headersWithToken(this.token))
      .toPromise()
      .then(this.succeed)
      .catch(this.failed);
  }
}
