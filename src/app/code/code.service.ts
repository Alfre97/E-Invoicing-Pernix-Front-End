import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Code } from '../models/Code.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class CodeService {

  constructor(private httpClient: HttpClient) { }

  getCodes() {
    const route = environment.rootURL + environment.getCodes;

    return this.httpClient.get(route)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }

  getNotLinkedCodes() {
    const route = environment.rootURL + environment.getNotLinkedCodes;

    return this.httpClient.get(route)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }

  addCode(code: Code) {
    const route = environment.rootURL + environment.addCode;
    const codeData = { codeType: code.codeType, code: code.code };

    return this.httpClient.post(route, codeData)
      .map(res => { console.log("pass", res) })
      .catch(error => Observable.throw(error));
  }
}
