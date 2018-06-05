import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../models/Invoice.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }

  sendInvoice(invoice: Invoice) {
    const route = environment.rootURL + environment.sendInvoice;
    const invoiceData = {
      dateCreated: invoice.dateCreated,
      emitter: { id: invoice.emitter.id },
      receiver: { id: invoice.receiver.id },
      service: { id: invoice.service },
      sellCondition: invoice.sellTerm,
      paymentLapse: invoice.paymentLapse,
      paymentMethod: invoice.paymentMethod,
      currency: invoice.selectedCurrency,
      exchangeRate: invoice.exchangeRate,
      recordedServices: invoice.recordedServices,
      exemptServices: invoice.exemptServices,
      recordedCommodity: invoice.recordedCommodity,
      exemptCommodity: invoice.exemptCommodity,
      recordedTotal: invoice.recordedTotal,
      exemptTotal: invoice.exemptTotal,
      totalSell: invoice.totalSell,
      totalDiscount: invoice.totalDiscount,
      netSell: invoice.netSell,
      totalTax: invoice.totalTax,
      totalVoucher: invoice.totalVoucher,
      resolutionNumber: invoice.resolutionNumber,
      resolutionDate: invoice.resolutionDate,
      otherText: invoice.otherText
    };

    return this.httpClient.post(route, invoiceData)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }

  getInvoice() {
    const route = environment.rootURL + environment.getInvoices;

    return this.httpClient.get(route)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }
}
