import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Tax } from '../models/Tax';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  addTax(selectedCodeType: String, taxTotal: String, rate: String, purchasePercentage: String, dateCreated: String,
    taxExo: String, institutionName: String, documentNumber: String, selectedDocumentType: String) {
    if (selectedCodeType != '' && taxTotal != '' && rate != '' && purchasePercentage != '' &&
      dateCreated != '' && taxExo != '' && institutionName != '' && selectedDocumentType != '' &&
      documentNumber != '') {
      let tax: Tax = new Tax();
      tax.code = selectedCodeType;
      tax.taxTotal = taxTotal;
      tax.rate = rate;
      tax.purchasePercentage = purchasePercentage;
      tax.date = dateCreated;
      tax.taxExo = taxExo;
      tax.institutionName = institutionName;
      tax.documentNumber = documentNumber;
      tax.documentType = selectedDocumentType;
      this.userService.addTax(tax).subscribe();
      this.showSuccess();
    } else if (selectedCodeType != '' || taxTotal != '' || rate != '' || purchasePercentage != '' ||
      dateCreated != '' || taxExo != '' || institutionName != '' ||
      documentNumber != '' || selectedDocumentType != '') {
      this.showWarning();
    } else {
      this.showError();
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

  showInfo() {
    this.toastr.info('', 'Info');
  }

  showCustom() {
    this.toastr.custom('', null, { enableHTML: true });
  }
}
