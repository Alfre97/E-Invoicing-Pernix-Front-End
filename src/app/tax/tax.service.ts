import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { Tax } from '../models/Tax.model';

@Injectable()
export class TaxService {

  constructor(private httpClient: HttpClient) { }

  getTaxes() {
    const route = environment.rootURL + environment.getTaxes;

    return this.httpClient.get(route)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }

  getNotLinkedTaxes() {
    const route = environment.rootURL + environment.getNotLinkedTaxes;

    return this.httpClient.get(route)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }

  addTax(tax: Tax) {
    const route = environment.rootURL + environment.addTax;
    const taxData = {
      code: tax.code,
      taxTotal: tax.taxTotal,
      rate: tax.rate,
      date: tax.date,
      taxExonarated: tax.taxExonarated,
      institutionName: tax.institutionName,
      documentNumber: tax.documentNumber,
      purchasePercentage: tax.purchasePercentage,
      documentType: tax.documentType
    };

    return this.httpClient.post(route, taxData)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }

}
