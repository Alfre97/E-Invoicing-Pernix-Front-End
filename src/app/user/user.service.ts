import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Service } from '../Models/Service';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver';
import { Invoice } from '../models/Invoice';
import { Tax } from '../models/Tax';
import { Code } from '../models/Code';
import { environment } from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  addUser(emitter: UserEmitterReceiver) {
    const route = environment.rootURL = environment.addEmitter;

    const userData = {userName : emitter.name,
                      comercialName : emitter.comercialName,
                      identificationType : emitter.identificationType,
                      identificationNumber : emitter.identificationNumber,
                      locationProvinceName : emitter.locationProvinceName,
                      locationCantonName : emitter.locationCantonName,
                      locationDistrictName : emitter.locationDistrictName,
                      locationNeighborhoodName : emitter.locationNeighborhoodName,
                      locationSignals : emitter.otherSignals,
                      phoneCountryCode : emitter.phoneCountryCode,
                      phoneNumber : emitter.phoneNumber,
                      faxCountryCode : emitter.faxCountryCode,
                      faxNumber : emitter.faxNumber,
                      email : emitter.email,
                      userType : emitter.userType};

    return this.http.post(route,userData)
      .map(res => res)
      .catch(error => Observable.throw(error));  
  }

  getEmitters() {
    const route = environment.rootURL + environment.getReceiver;

    return this.http.get(route)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }
  getReceivers() {
    const route = environment.rootURL + environment.getReceiver;

    return this.http.get(route)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
