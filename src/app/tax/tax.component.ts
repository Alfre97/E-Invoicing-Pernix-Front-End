import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TaxService } from './tax.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Tax } from '../models/Tax.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaxType } from "../models/TaxType/TaxType";
import { TaxTypes } from "../models/TaxType/TaxType-mock";
import { DocumentType } from '../models/DocumentType/DocumentType';
import { DocumentTypes } from '../models/DocumentType/DocumentType-mock';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  providers: [TaxService],
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  private taxTypeList: TaxType[] = TaxTypes;
  private documentTypesList: DocumentType[] = DocumentTypes;
  selectedTaxType: TaxType;
  selectedDocumentType: DocumentType;
  taxForm01;
  taxForm02;

  constructor(private taxService: TaxService,
    public toastr: ToastsManager,
    public formBuilder: FormBuilder,
    vcr: ViewContainerRef) {

    this.taxForm01 = formBuilder.group({
      codeType: new FormControl('', [
        Validators.required
      ]),
      rate: new FormControl('', [Validators.required])
    });

    this.taxForm02 = formBuilder.group({
      purchasePercentage: new FormControl('', [
        Validators.required
      ]),
      exhonerationAvaible: new FormControl('', []),
      dateCreated: new FormControl('', [
        Validators.required
      ]),
      institutionName: new FormControl('', [
        Validators.required
      ]),
      documentNumber: new FormControl('', [
        Validators.required
      ]),
      selectedDocumentType: new FormControl('', [
        Validators.required
      ])
    });
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  addTax() {
    if (this.taxForm01.valid) {
      let tax: Tax = new Tax();
      tax.code = this.selectedTaxType.codeType;
      tax.rate = this.taxForm01.controls['rate'].value;
      if (this.taxForm02.controls['exhonerationAvaible'].value == true) {
        if (this.taxForm02.valid) {
          tax.purchasePercentage = this.taxForm02.controls['purchasePercentage'].value;
          tax.date = this.taxForm02.controls['dateCreated'].value;
          tax.institutionName = this.taxForm02.controls['institutionName'].value;
          tax.documentNumber = this.taxForm02.controls['documentNumber'].value;
          tax.documentType = this.selectedDocumentType.documentTypeCode;
        } else {
          this.validateAllFormFields(this.taxForm02);
        }
      }
      this.taxService.addTax(tax).subscribe(
        response => {
          this.showSuccess();
        },
        error => {
          this.showError();
        }
      );
    } else {
      this.validateAllFormFields(this.taxForm01);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(formGroup);
      }
    });
  }

  showSuccess() {
    this.toastr.success('Impuesto creado!', 'Correcto');
  }

  showError() {
    this.toastr.error('Impuesto no creado!', 'Oops');
  }
}
