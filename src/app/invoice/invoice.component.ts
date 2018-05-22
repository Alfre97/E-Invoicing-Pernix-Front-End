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

  constructor(private emitterService: EmitterService,
    private receiverService: ReceiverService,
    private serviceService: ServiceService,
    private invoiceService: InvoiceService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    let services = this.getServices();
    let emitters = this.getEmitters();
    let receivers = this.getReceivers();
    this.isCredit = true;
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

  showWarning() {
    this.toastr.warning('Llene todos los campos.', 'Alerta');
  }

  showInfo() {
    this.toastr.info('Factura creada pero no enviada.', 'Info');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
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

  processInvoice(dateCreated: String, paymentLapse: String, selectedCurrency: String, exchangeRate: String,
    recordedServices: String, exemptServices: String, recordedCommodity: String, exemptCommodity: String, recordedTotal: String, exemptTotal: String,
    totalSell: String, totalDiscount: String, netSell: String, totalTax: String, totalVoucher: String, resolutionNumber: String, resolutionDate: String,
    otherText: String) {
    if ((resolutionNumber != '' && resolutionNumber != undefined) && (resolutionDate != '' && resolutionDate != undefined) && (otherText != '' && otherText != undefined)) {
      let invoice: Invoice = new Invoice();
      invoice.dateCreated = dateCreated;
      invoice.sellTerm = this.selectedSellTerm;
      invoice.paymentLapse = paymentLapse;
      invoice.paymentMethod = this.selectedPaymentMethods;
      invoice.selectedCurrency = selectedCurrency;
      invoice.exchangeRate = exchangeRate;
      invoice.recordedServices = recordedServices;
      invoice.exemptServices = exemptServices;
      invoice.recordedCommodity = recordedCommodity;
      invoice.exemptCommodity = exemptCommodity;
      invoice.recordedTotal = recordedTotal;
      invoice.exemptTotal = exemptTotal;
      invoice.totalSell = totalSell;
      invoice.totalDiscount = totalDiscount;
      invoice.netSell = netSell;
      invoice.totalTax = totalTax;
      invoice.totalVoucher = totalVoucher;
      invoice.resolutionNumber = resolutionNumber;
      invoice.resolutionDate = resolutionDate;
      invoice.otherText = otherText;
      invoice.emitter = this.selectedEmitter;
      invoice.receiver = this.selectedReceiver;
      invoice.service = this.selectedService;
      this.invoiceService.sendInvoice(invoice).subscribe(
        response => {
          //Add action whe the Request send a good response
        },
        error => {
          //Add action whe the Request send a bad response
        }
      );
      this.showSuccess();
    } else if ((resolutionNumber == '' || resolutionNumber == undefined) || (resolutionDate == '' || resolutionDate == undefined) || (otherText == '' || otherText == undefined)) {
      this.showWarning();
    } else {
      this.showError();
    }
  }
}
