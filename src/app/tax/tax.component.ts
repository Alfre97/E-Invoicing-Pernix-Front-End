import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Tax } from '../models/Tax';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  rate = "";
  purchasePercentage = 0;
  exhonerationAvaible = "";

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  calculateRate() {
    this.rate = "0." + this.purchasePercentage;
  }

  addTax(selectedCodeType: String, dateCreated: String,
    institutionName: String, documentNumber: String, selectedDocumentType: String) {
    if (this.exhonerationAvaible == "true") {
      if (selectedCodeType != '' && this.rate != '' && this.purchasePercentage != 0 &&
        dateCreated != '' && institutionName != '' && selectedDocumentType != '' &&
        documentNumber != '') {
        let tax: Tax = new Tax();
        tax.code = selectedCodeType;
        tax.rate = this.rate;
        tax.purchasePercentage = this.purchasePercentage;
        tax.date = dateCreated;
        tax.institutionName = institutionName;
        tax.documentNumber = documentNumber;
        tax.documentType = selectedDocumentType;
        this.userService.addTax(tax).subscribe();
        this.showSuccess();
      } else if (selectedCodeType == '' || this.rate == '' || this.purchasePercentage == 0 ||
        dateCreated == '' || institutionName == '' ||
        documentNumber == '' || selectedDocumentType == '') {
        this.showWarning();
      } else {
        this.showError();
      }
    } else if (dateCreated != undefined || institutionName != undefined || documentNumber != '' || selectedDocumentType != ''){
        this.showWarningExhoneration();
    } else {
      if (selectedCodeType != '' && this.rate != '' && this.purchasePercentage != 0) {
        let tax: Tax = new Tax();
        tax.code = selectedCodeType;
        tax.rate = this.rate;
        tax.purchasePercentage = this.purchasePercentage;
        this.userService.addTax(tax).subscribe();
        this.showSuccess();
      } else if (selectedCodeType == '' || this.rate == '' || this.purchasePercentage == 0) {
        this.showWarning();
      } else {
        this.showError();
      }
    }
  }

  showSuccess() {
    this.toastr.success('Impuesto creado!', 'Correcto');
  }

  showError() {
    this.toastr.error('Impuesto no creado!', 'Oops');
  }

  showWarning() {
    this.toastr.warning('Llene todos los campos.', 'Alerta');
  }

  showWarningExhoneration() {
    this.toastr.warning('Debe selecionar el check para ingresar los valores de exhoneracion.', 'Alerta');
  }

  showInfo() {
    this.toastr.info('', 'Info');
  }

  showCustom() {
    this.toastr.custom('', null, { enableHTML: true });
  }
}
