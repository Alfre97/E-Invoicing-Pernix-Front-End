import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Service } from '../models/Service.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  getServices() {
    const route = environment.rootURL + environment.getServices;

    return this.httpClient.get(route)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }

  addService(service: Service) {
    const route = environment.rootURL + environment.addService;
    const serviceData = {
      lineNumber: service.lineNumber,
      codeList: service.codeList,
      amount: service.amount,
      unitOfMeasurementType: service.unitOfMeasurementType,
      unitOfMeasurementName: service.unitOfMeasurementName,
      comercialUnitOfMeasurement: service.comercialUnitOfMeasurement,
      detail: service.detail,
      priceByUnit: service.priceByUnit,
      totalAmount: service.totalAmount,
      discount: service.discount,
      discountNature: service.discountNature,
      subTotal: service.subtotal,
      taxList: service.taxList,
      total: service.total
    };

    return this.httpClient.post(route, serviceData)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }

}
