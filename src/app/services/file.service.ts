import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs';
import { config } from '../config';
import axios from 'axios';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {}
  public SendProblem(file: FormData): Promise<any> {
    const url = config.Url + '/api/file/programing';
    return this.http
      .post(url, file, {
        reportProgress: true,
        observe: 'events',
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }
  public SendDesign(file: FormData): Promise<any> {
    const url = config.Url + '/api/file/design';
    return this.http
      .post(url, file, {
        reportProgress: true,
        observe: 'events',
      })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }
}
