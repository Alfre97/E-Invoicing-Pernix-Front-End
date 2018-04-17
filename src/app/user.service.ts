import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Service } from './Models/Service';
import { UserEmitterReceiver } from './models/UserEmitterReceiver';
import { Invoice } from './models/Invoice';
import { Tax } from './models/Tax';
import { Code } from './models/Code';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const rootUrl = 'https://dry-harbor-97946.herokuapp.com';
@Injectable()
export class UserService {

  private addServiceURL = '/addService';
  private getServicesURL = '/getServices';
  private addEmitterUrl = '/addUser'
  private getEmitterUrl = '/getEmitters';
  private getReceiverUrl = '/getReceivers';
  private sendInvoiceURL = '/uploadInvoice';
  private addTaxURL = '/addTax';
  private getTaxesURL = '/getTaxes';
  private getCodesURL = '/getCodes';
  private addCodeURL = '/addCode';
  constructor(private http: HttpClient) {
  }

  addService(service: Service): Observable<Service> {
    return this.http.post<Service>(rootUrl + this.addServiceURL + '?' + 'amount=' + service.amount + '&codes=' + service.codes
      + '&comercialUnitOfMeasurement=' + service.businessMeasure + '&detail=' + service.detail + '&discount=' + service.discount + '&discountNature=' + service.discountNature + '&lineNumber=' + service.lineNumber
      + '&priceByUnit=' + service.unitPrice + '&subTotal=' + service.subtotal + '&total=' + service.totalAmount + '&totalAmount=' + service.lineTotalAmount
      + '&unitOfMeasurementName=' + service.meisureUnit + '&unitOfMeasurementType=' + service.meisureUnit + '&taxes=' + service.taxes, JSON.stringify(service), httpOptions);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(rootUrl + this.getServicesURL);
  }

  getCodes(): Observable<Code[]> {
    return this.http.get<Code[]>(rootUrl + this.getCodesURL);
  }

  getTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>(rootUrl + this.getTaxesURL);
  }

  addUser(emitter: UserEmitterReceiver): Observable<UserEmitterReceiver> {
    return this.http.post<UserEmitterReceiver>(rootUrl + this.addEmitterUrl + '?' + 'userName=' + emitter.name + '&comercialName=' + emitter.comercialName + '&identificationType=' + emitter.identificationType
      + '&identificationNumber=' + emitter.identificationNumber + '&locationProvinceName=' + emitter.locationProvinceName + '&locationCantonName=' + emitter.locationCantonName
      + '&locationDistrictName=' + emitter.locationDistrictName + '&locationNeighborhoodName=' + emitter.locationNeighborhoodName + '&locationSignals=' + emitter.otherSignals
      + '&phoneCountryCode=' + emitter.phoneCountryCode + '&phoneNumber=' + emitter.phoneNumber + '&faxCountryCode=' + emitter.faxCountryCode + '&faxNumber=' + emitter.faxNumber
      + '&email=' + emitter.email + '&userType=' + emitter.userType, JSON.stringify(emitter), httpOptions);
  }

  addTax(tax: Tax): Observable<Tax> {
    return this.http.post<Tax>(rootUrl + this.addTaxURL + '?' + 'code=' + tax.code
    + '&rate=' + tax.rate + '&purchasePercentage=' + tax.purchasePercentage
    + '&date=' + tax.date + '&institutionName=' + tax.institutionName
    + '&documentNumber=' + tax.documentNumber + '&documentType=' + tax.documentType
    , JSON.stringify(tax), httpOptions);
  }

  addCode(code: Code): Observable<Code> {
    return this.http.post<Code>(rootUrl + this.addCodeURL + '?' + 'codeType=' + code.codeType
    + '&code=' + code.code, JSON.stringify(code), httpOptions);
  }

  sendInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(rootUrl + this.sendInvoiceURL + '?' +
      '&dateCreated=' + invoice.dateCreated +
      '&sellTerm=' + invoice.sellTerm +
      '&paymentLapse=' + invoice.paymentLapse +
      '&paymentMethod=' + invoice.paymentMethod +
      '&selectedCurrency=' + invoice.selectedCurrency +
      '&exchangeRate=' + invoice.exchangeRate +
      '&recordedServices=' + invoice.recordedServices +
      '&exemptServices=' + invoice.exemptServices +
      '&recordedCommodity=' + invoice.recordedCommodity +
      '&exemptCommodity=' + invoice.exemptCommodity +
      '&recordedTotal=' + invoice.recordedTotal +
      '&exemptTotal=' + invoice.exemptTotal +
      '&totalSell=' + invoice.totalSell +
      '&totalDiscount=' + invoice.totalDiscount +
      '&netSell=' + invoice.netSell +
      '&totalTax=' + invoice.totalTax +
      '&totalVoucher=' + invoice.totalVoucher +
      '&resolutionNumber=' + invoice.resolutionNumber +
      '&resolutionDate=' + invoice.resolutionDate +
      '&otherText=' + invoice.otherText +
      '&idEmitter=' + invoice.idEmitter +
      '&idReceiver=' + invoice.idReceiver +
      '&idService=' + invoice.idService,
      JSON.stringify(invoice), httpOptions);
  }

  getEmitters(): Observable<UserEmitterReceiver[]> {
    return this.http.get<UserEmitterReceiver[]>(rootUrl + this.getEmitterUrl);
  }
  getReceivers() {
    return this.http.get<UserEmitterReceiver[]>(rootUrl + this.getReceiverUrl);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
