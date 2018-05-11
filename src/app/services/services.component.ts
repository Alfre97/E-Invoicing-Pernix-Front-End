import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Service } from '../Models/Service';
import { UserService } from '../user/user.service';
import { ServiceService } from './service.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Tax } from '../models/Tax';
import { Code } from '../models/Code';
import { Units } from '../models/Unit/unit-mock';
import { Unit } from '../models/Unit/Unit';
import { CodeService } from '../code/code.service';
import { TaxService } from '../tax/tax.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [CodeService, ServiceService, TaxService]
})
export class ServicesComponent implements OnInit {
  units = Units;
  private taxes: Tax[];
  private codes: Code[];
  selectedTaxes: Tax[];
  selectedCodes: Code[];
  selectedUnit: String;
  amount = 0.0;
  lineTotalAmount = 0.0;
  totalAmount = 0.0;
  unitPrice = 0.0;
  subtotal = 0.0;
  discount = 0.0;

  constructor(private userService: UserService,
              private codeService: CodeService,
              private serviceService: ServiceService,
              private taxService: TaxService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  calculateLineTotalAmount() {
    this.lineTotalAmount = this.subtotal;
    for (let tax of this.selectedTaxes){
      var rate = +tax.rate;
      this.lineTotalAmount = this.lineTotalAmount + (rate * this.subtotal);
    }
  }

  subTotal() {
    this.subtotal = this.totalAmount - this.discount;
    this.calculateLineTotalAmount();
  }

  lineTotal() {
    this.totalAmount = this.amount *  this.unitPrice;
  }

  showSuccess() {
    this.toastr.success('Servicio creado!', 'Correcto');
  }

  showError() {
    this.toastr.error('Servicio no creado!', 'Oops');
  }

  showWarning() {
    this.toastr.warning('Servicio no creado, llene todos los campos.', 'Alerta');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }

  ngOnInit() {
    let taxes = this.getTaxes();
    let codes = this.getCodes();
  }

  getCodes(){
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

  getTaxes(){
    this.taxService.getTaxes().subscribe(data => this.taxes = data);
  }

  addService(lineNumber: string, businessMeasure: string, detail: string, discountNature: string) {
    if (lineNumber != '' && businessMeasure != '' && detail != '' && discountNature != ''
            && this.selectedTaxes != undefined && this.selectedCodes != undefined
            && this.selectedUnit != '' && this.amount != 0
            && this.lineTotalAmount != 0 && this.totalAmount != 0
            && this.unitPrice != 0 && this.subtotal != 0
            && this.discount != undefined)  {
      console.log(this.selectedTaxes);
      let service: Service = new Service();
      service.lineNumber = lineNumber;
      service.amount = this.amount;
      service.businessMeasure = businessMeasure;
      service.detail = detail;
      service.unitPrice = this.unitPrice;
      service.totalAmount = this.totalAmount;
      service.discountNature = discountNature;
      service.discount = this.discount;
      service.subtotal = this.subtotal;
      service.lineTotalAmount = this.lineTotalAmount;
      service.codes = "";
      service.taxes = "";
      service.meisureUnit = this.selectedUnit;

      for (let code of this.selectedCodes){
        service.codes += code.id + ",";
      }

      for (let tax of this.selectedTaxes){
        service.taxes += tax.id + ",";
      }

      this.serviceService.addService(service).subscribe(
        response => {
          //Add action whe the Request send a good response
        },
        error => {
          //Add action whe the Request send a bad response
        }
      );
      this.showSuccess();
    } else if (lineNumber == '' || businessMeasure == '' || detail == '' || discountNature == ''
            || this.selectedTaxes == undefined || this.selectedCodes == undefined
            || this.selectedUnit == '' || this.amount == 0
            || this.lineTotalAmount == 0 || this.totalAmount == 0
            || this.unitPrice == 0 || this.subtotal == 0
            || this.discount == undefined) {
      this.showWarning();
    } else {
      this.showError();
    }
  }

}
