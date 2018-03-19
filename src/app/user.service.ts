import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Service } from './Models/Service';
import { UserEmitterReceiver } from './models/UserEmitterReceiver';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const rootUrl='http://localhost:5000';
@Injectable()
export class UserService {

  private addServiceURL='/addService';
  private getServicesURL='/getServices';
  private addEmitterUrl='/addUser'
  constructor(private http: HttpClient) {
  }

  addService(service: Service): Observable <Service>{
    return this.http.post<Service>(rootUrl + this.addServiceURL+'?' + 'amount=' + service.amount+ '&code='+ service.code+ '&codeType='+service.selectedCodeType
    +'&comercialUnitOfMeasurement='+ service.businessMeasure +'&detail=' + service.detail + '&discount='+ service.discount + '&lineNumber='+ service.lineNumber
    + '&priceByUnit='+service.unitPrice + '&subTotal=' + service.subtotal + '&total='+service.totalAmount + '&totalAmount='+ service.lineTotalAmount
    + '&unitOfMeasurementName='+ service.meisureUnit +'&unitOfMeasurementType=' + service.meisureUnit,  JSON.stringify(service), httpOptions);
  }

  getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(rootUrl + this.getServicesURL);
  }

  addUser(emitter: UserEmitterReceiver): Observable<UserEmitterReceiver>{
    return this.http.post<UserEmitterReceiver>(rootUrl + this.addEmitterUrl+'?'+ 'userName='+ emitter.name + '&comercialName=' + emitter.comercialName + '&identificationType='+ emitter.identificationType
    +'&identificationNumber='+emitter.identificationNumber+ '&locationProvinceName='+emitter.locationProvinceName +'&locationCantonName='+emitter.locationCantonName
    +'&locationDistrictName='+emitter.locationDistrictName+'&locationNeighborhoodName='+emitter.locationNeighborhoodName+'&locationSignals='+emitter.otherSignals
    +'&phoneCountryCode='+ emitter.phoneCountryCode+'&phoneNumber='+emitter.phoneNumber+ '&faxCountryCode='+emitter.faxCountryCode+'&faxNumber='+emitter.faxNumber
    +'&email='+emitter.email + '&userType='+emitter.userType,  JSON.stringify(emitter), httpOptions);
  }
  private handleError<T> (operation = 'operation', result?: T) {
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
