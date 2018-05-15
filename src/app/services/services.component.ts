import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Service } from '../models/Service.model';
import { ServiceService } from './services.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Tax } from '../models/Tax.model';
import { Code } from '../models/Code.model';
import { Units } from '../models/Unit/unit-mock';
import { Unit } from '../models/Unit/Unit';
import { CodeService } from '../code/code.service';
import { TaxService } from '../tax/tax.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  providers: [CodeService, ServiceService, TaxService],
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  units = Units;
  private taxes: Tax[];
  private codes: Code[];
  selectedTaxes: Tax[];
  selectedCodes: Code[];
  selectedUnit: Unit;
  amount = 0.0;
  lineTotalAmount = 0.0;
  totalAmount = 0.0;
  unitPrice = 0.0;
  subtotal = 0.0;
  discount = 0.0;

  constructor(
    private codeService: CodeService,
    private serviceService: ServiceService,
    private taxService: TaxService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef, private httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  calculateLineTotalAmount() {
    this.lineTotalAmount = this.subtotal;
    for (let tax of this.selectedTaxes) {
      var rate = +tax.rate;
      this.lineTotalAmount = this.lineTotalAmount + (rate * this.subtotal);
    }
  }

  subTotal() {
    this.subtotal = this.totalAmount - this.discount;
    this.calculateLineTotalAmount();
  }

  lineTotal() {
    this.totalAmount = this.amount * this.unitPrice;
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Correcto');
  }

  showError(message: string) {
    this.toastr.error(message, 'Oops');
  }

  showWarning(message: string) {
    this.toastr.warning(message, 'Alerta');
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showCustom(message: string) {
    this.toastr.custom(message, null, { enableHTML: true });
  }

  ngOnInit() {
    let taxes = this.getTaxes();
    let codes = this.getCodes();
  }

  getCodes() {
    this.codeService.getCodes().subscribe(
      response => {
        this.codes = response
        //Add action whe the Request send a good response
      },
      error => {
        //Add action whe the Request send a bad response
      }
    );
  }

  getTaxes() {
    this.taxService.getTaxes().subscribe(
      response => {
        this.taxes = response
        //Add action whe the Request send a good response
      },
      error => {
        //Add action whe the Request send a bad response
      }
    );
  }

  createService(lineNumber: string, businessMeasure: string, detail: string, discountNature: string) {
    if (lineNumber != '' && businessMeasure != '' && detail != '' && discountNature != ''
      && this.selectedTaxes != undefined && this.selectedCodes != undefined
      && this.amount != 0 && this.selectedUnit.description != '' && this.selectedUnit.code != ''
      && this.lineTotalAmount != 0 && this.totalAmount != 0
      && this.unitPrice != 0 && this.subtotal != 0
      && this.discount != undefined) {

      let service: Service = new Service();
      service.lineNumber = lineNumber;
      service.codeList = this.selectedCodes;
      service.amount = this.amount;
      service.unitOfMeasurementType = this.selectedUnit.code;
      service.unitOfMeasurementName = this.selectedUnit.description;
      service.comercialUnitOfMeasurement = businessMeasure;
      service.detail = detail;
      service.priceByUnit = this.unitPrice;
      service.totalAmount = this.totalAmount;
      service.discount = this.discount;
      service.discountNature = discountNature;
      service.subtotal = this.subtotal;
      service.taxList = this.selectedTaxes;
      service.total = this.lineTotalAmount;

      this.serviceService.addService(service).subscribe(
        response => {
          //Add action whe the Request send a good response
        },
        error => {
          //Add action whe the Request send a bad response
        }
      );
    } else if (lineNumber == '' || businessMeasure == '' || detail == '' || discountNature == ''
      || this.selectedTaxes == undefined || this.selectedCodes == undefined
      || this.selectedUnit.description == '' || this.selectedUnit.code != '' || this.amount == 0
      || this.lineTotalAmount == 0 || this.totalAmount == 0
      || this.unitPrice == 0 || this.subtotal == 0
      || this.discount == undefined) {
      this.showWarning("You have empty spaces.");
    } else {
      this.showError("You have empty spaces or undefined values.");
    }
  }

  addService(service: Service) {
    const route = environment.rootURL + environment.addService;
    const serviceData = { id: service.id, lineNumber: service.lineNumber };

    return this.httpClient.post(route, serviceData)
      .map(res => res)
      .catch(error => Observable.throw(error));
  }
}
