import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Service } from '../models/Service';
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
    const serviceData = {amount: service.amount, codes: service.codes, comercialUnitMeasurement: service.businessMeasure,
      detail: service.detail, discount: service.discount, discountNature: service.discountNature,
      lineNumber: service.lineNumber, priceByUnit: service.unitPrice, subTotal: service.subtotal,
      total: service.totalAmount, totalAmount: service.lineTotalAmount, unitOfMeasurementName: service.meisureUnit,
      meisureUnit: service.meisureUnit, unitOfMeasurementType: service.meisureUnit, taxes: service.taxes};
   
    return this.httpClient.post(route, serviceData)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }

}
