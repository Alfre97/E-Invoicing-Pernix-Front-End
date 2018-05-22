import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/services.service'
import { InvoiceService } from '../invoice/invoice.service'
import { Service } from '../models/Service.model';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver.model';
import { Invoice } from '../models/Invoice.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EmitterService } from '../emitter/emitter.service';
import { ReceiverService } from '../receiver/receiver.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  providers: [ServiceService, InvoiceService],
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  private services: Service[];
  private emitters: UserEmitterReceiver[];
  private receivers: UserEmitterReceiver[];
  selectedEmitter: UserEmitterReceiver;
  selectedReceiver: UserEmitterReceiver;
  selectedService: Service[];
  selectedSellTerm: String;
  isCredit: boolean;
  selectUndefinedOptionValue: any;
  selectedPaymentMethods: String[];
  recordedServices: Number;
  private currencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BWP', 'BYR', 'BZD', 'CAD',
    'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF',
    'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD',
    'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR',
    'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD',
    'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'UYI', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS',
    'XUA', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL'];
  private sellTerms = ['Contado', 'Crédito', 'Consignación', 'Apartado', 'Arrendamiento con opción de compra', 'Arrendamiento en función financiera', 'Otros'];
  private paymentMethods = ['Efectivo', 'Tarjeta', 'Cheque', 'Transferencia - Depósito bancario', 'Recaudado por terceros', 'Otros'];

  generalForm;
  payForm;
  resumenForm;
  resumenForm01;
  resumenForm02;
  resolutionForm;

  constructor(private emitterService: EmitterService,
    private receiverService: ReceiverService,
    private serviceService: ServiceService,
    private invoiceService: InvoiceService,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.createForms();
    let services = this.getServices();
    let emitters = this.getEmitters();
    let receivers = this.getReceivers();
    this.isCredit = true;
  }

  createForms() {
    this.generalForm = this.formBuilder.group({
      dateCreated: new FormControl('', [
        Validators.required
      ]),
      selectedEmitter: new FormControl('', [
        Validators.required
      ]),
      selectedReceiver: new FormControl('', [
        Validators.required
      ]),
      selectedService: new FormControl('', [
        Validators.required
      ])
    });
    this.payForm = this.formBuilder.group({
      selectedSellTerm: new FormControl('', [
        Validators.required
      ]),
      paymentLapse: new FormControl('', [
        Validators.required
      ]),
      selectedPaymentMethods: new FormControl('', [
        Validators.required
      ]),
      selectedCurrency: new FormControl('', [
        Validators.required
      ])
    });
    this.resumenForm = this.formBuilder.group({
      exchangeRate: new FormControl('', [
        Validators.required
      ]),
      recordedServices: new FormControl('', [
        Validators.required
      ]),
      exemptServices: new FormControl('', [
        Validators.required
      ]),
      recordedCommodity: new FormControl('', [
        Validators.required
      ])
    });
    this.resumenForm01 = this.formBuilder.group({
      exemptCommodity: new FormControl('', [
        Validators.required
      ]),
      recordedTotal: new FormControl('', [
        Validators.required
      ]),
      exemptTotal: new FormControl('', [
        Validators.required
      ]),
      totalSell: new FormControl('', [
        Validators.required
      ])
    });
    this.resumenForm02 = this.formBuilder.group({
      totalDiscount: new FormControl('', [
        Validators.required
      ]),
      netSell: new FormControl('', [
        Validators.required
      ]),
      totalTax: new FormControl('', [
        Validators.required
      ]),
      totalVoucher: new FormControl('', [
        Validators.required
      ])
    });
    this.resolutionForm = this.formBuilder.group({
      resolutionNumber: new FormControl('', [
        Validators.required
      ]),
      resolutionDate: new FormControl('', [
        Validators.required
      ]),
      otherText: new FormControl('', [
        Validators.required
      ])
    });
  }

  enablePaymentLapse() {
    if (this.selectedSellTerm == 'Crédito') {
      this.isCredit = false;
    } else {
      this.isCredit = true;
    }
  }

  getRecordedServices() {
    for (let service of this.selectedService) {

    }
  }

  showSuccess() {
    this.toastr.success('Factura creada y enviada!', 'Correcto');
  }

  showError() {
    this.toastr.error('Factura no creada!', 'Oops');
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      response => {
        this.services = response;
        //Add action whe the Request send a good response
      },
      error => {
        //Add action whe the Request send a bad response
      }
    );
  }

  getEmitters() {
    this.emitterService.getEmitters().subscribe(
      response => {
        this.emitters = response;
        //Add action whe the Request send a good response
      },
      error => {
        //Add action whe the Request send a bad response
      }
    );
  }
  getReceivers() {
    this.receiverService.getReceivers().subscribe(
      response => {
        this.receivers = response;
        //Add action whe the Request send a good response
      },
      error => {
        //Add action whe the Request send a bad response
      }
    );
  }

  processInvoice() {
    if (this.generalForm.valid && this.payForm.valid && this.resumenForm.valid && this.resumenForm01 && this.resumenForm02.valid && this.resolutionForm.valid) {
      let invoice: Invoice = new Invoice();
      invoice.dateCreated = this.generalForm.controls['dateCreated'].value;
      invoice.sellTerm = this.payForm.controls['selectedSellTerm'].value;
      invoice.paymentLapse = this.payForm.controls['paymentLapse'].value;
      invoice.paymentMethod = this.payForm.controls['selectedPaymentMethods'].value;
      invoice.selectedCurrency = this.payForm.controls['selectedPaymentMethods'].value;
      invoice.exchangeRate = this.resumenForm.controls['exchangeRate'].value;
      invoice.recordedServices = this.resumenForm.controls['recordedServices'].value;
      invoice.exemptServices = this.resumenForm.controls['exemptServices'].value;
      invoice.recordedCommodity = this.resumenForm.controls['recordedCommodity'].value;
      invoice.exemptCommodity = this.resumenForm01.controls['exemptCommodity'].value;
      invoice.recordedTotal = this.resumenForm01.controls['recordedTotal'].value;
      invoice.exemptTotal = this.resumenForm01.controls['exemptTotal'].value;
      invoice.totalSell = this.resumenForm01.controls['totalSell'].value;
      invoice.totalDiscount = this.resumenForm02.controls['totalDiscount'].value;
      invoice.netSell = this.resumenForm02.controls['netSell'].value;
      invoice.totalTax = this.resumenForm02.controls['totalTax'].value;
      invoice.totalVoucher = this.resumenForm02.controls['totalVoucher'].value;
      invoice.resolutionNumber = this.resolutionForm.controls['totalVoucher'].value;
      invoice.resolutionDate = this.resolutionForm.controls['selectedPaymentMethods'].value;
      invoice.otherText = this.resolutionForm.controls['selectedPaymentMethods'].value;
      invoice.emitter = this.selectedEmitter;
      invoice.receiver = this.selectedReceiver;
      invoice.service = this.selectedService;
      this.invoiceService.sendInvoice(invoice).subscribe(
        response => {
          this.showSuccess();
        },
        error => {
          this.showError();
        }
      );
    } else {
      this.showError();
      this.validateAllFormFields(this.generalForm);
      this.validateAllFormFields(this.payForm);
      this.validateAllFormFields(this.resumenForm);
      this.validateAllFormFields(this.resumenForm01);
      this.validateAllFormFields(this.resumenForm02);
      this.validateAllFormFields((this.resolutionForm));
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
}
