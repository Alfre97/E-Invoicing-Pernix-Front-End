import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../models/Invoice';
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
    const invoiceData = {dateCreated : invoice.dateCreated, sellTerm : invoice.sellTerm,
                         paymentLapse : invoice.paymentLapse, paymentMethod : invoice.paymentMethod,
                         selectedCurrency : invoice.selectedCurrency, exchangeRate : invoice.exchangeRate,
                         recordedServices : invoice.recordedServices, exemptServices : invoice.exemptServices,
                         recordedCommodity : invoice.recordedCommodity, exemptCommodity : invoice.exemptCommodity,
                         recordedTotal : invoice.recordedTotal, exemptTotal : invoice.exemptTotal,
                         totalSell : invoice.totalSell, totalDiscount : invoice.totalDiscount,
                         netSell : invoice.netSell, totalTax : invoice.totalTax,
                         totalVoucher : invoice.totalVoucher, resolutionNumber : invoice.resolutionNumber,
                         resolutionDate : invoice.resolutionDate, otherText : invoice.otherText,
                         idEmitter : { id: invoice.idEmitter }, idReceiver : { id: invoice.idReceiver },
                         idService : { id: invoice.idService } };

    return this.httpClient.post(route, invoiceData)
      .map(res => res)
      .catch(err => Observable.throw(err));
  }

}
