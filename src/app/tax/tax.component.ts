import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TaxService } from './tax.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Tax } from '../models/Tax.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  providers: [TaxService],
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  taxeList: any = [{value: 1, name: 'Impuesto General sobre las ventas' },
                   {value: 2, name: 'Impuesto Selectivo de Consumo' },
                   {value: 3, name: 'Impuesto ünico a los combustivos' },
                   {value: 4, name: 'Impuesto especifico de bebidas alcohólicas' },
                   {value: 5, name: 'Impuesto especifico sobre las bebidas envasadas sin contenido alcoholico y jabones de tocador' },
                   {value: 6, name: 'Impuesto a los productos de tabaco' },
                   {value: 7, name: 'Servicios' },
                   {value: 8, name: 'Impuesto General a las Ventas Diplomaticos' },
                   {value: 9, name: 'Impuesto General sobre Ventas compras autorizadas' },
                   {value: 10, name: 'Impuesto General sobre las ventas instituciones publicas y otros organismos' },
                   {value: 11, name: 'Impuesto Selectivo de consumo compras autorizadas' },
                   {value: 12, name: 'Impuesto Especifico al Cemento' },
                   {value: 99, name: 'Otros'}];

  documentType: any = [{value: 1, name: 'Compras Autorizadas'},
                       {value: 2, name: 'Ventas Exentas a Diplomáticos'},
                       {value: 3, name: 'Orden de Compra (Instituciones Públicas y Otros Organismos)'},
                       {value: 4, name: 'Extenciones Dirección General de Hacienda'},
                       {value: 5, name: 'Zonas Francas'},
                       {value: 99, name: 'Otros'}];
  rate = 0.0;
  purchasePercentage = 0;
  exhonerationAvaible = "";

  taxeForm01;
  taxeForm02;

  constructor(private taxService: TaxService,
              public toastr: ToastsManager,
              public formBuilder: FormBuilder,
              vcr: ViewContainerRef) {

    this.taxeForm01 = formBuilder.group({
      exhonerationAvaible: new FormControl('', [
        Validators.required
      ]),
      rate: new FormControl('', []),
      purchasePercentage: new FormControl('', [
        Validators.required
      ])
    });

    this.taxeForm02= formBuilder.group({
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
    this.toastr.setRootViewContainerRef (vcr);
  }

  ngOnInit() {
  }

  addTax() {
    if (this.exhonerationAvaible == "true") {
      if (this.taxeForm01.valid || this.taxeForm02.valid) {
        let tax: Tax = new Tax();
        tax.code = this.taxeForm01.controls['exhonerationAvaible'].value;
        tax.rate = this.taxeForm01.controls['rate'].value;
        tax.purchasePercentage = this.taxeForm01.controls['purchasePercentage'].value;
        tax.date = this.taxeForm02.controls['dateCreated'].value;
        tax.institutionName = this.taxeForm02.controls['institutionName'].value;
        tax.documentNumber = this.taxeForm02.controls['documentNumber'].value;
        tax.documentType = this.taxeForm02.controls['selectedDocumentType'].value;
        this.taxService.addTax(tax).subscribe(
          response => {
            //Add action whe the Request send a good response
          },
          error => {
            //Add action whe the Request send a bad response
          }
        );
        this.showSuccess();
      } else {
        this.validateAllFormFields(this.taxeForm01);
        this.validateAllFormFields(this.taxeForm02);
      }
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
