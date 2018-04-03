import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Service } from '../Models/Service';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver';
import { Invoice } from '../models/Invoice';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { trigger, transition, animate, style } from '@angular/animations'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('400ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(-100%)'}),
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {
  toppings = new FormControl();
  private services:  Service[];
  private emitters: UserEmitterReceiver[];
  private receivers: UserEmitterReceiver[];
  selectedEmitter: UserEmitterReceiver;
  selectedReceiver: UserEmitterReceiver;
  selectedService: Service;
  selectUndefinedOptionValue: any;
  private currencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BWP', 'BYR', 'BZD', 'CAD',
  'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF',
  'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD',
  'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR',
  'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD',
  'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'UYI', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS',
  'XUA', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL'];
  private sellTerms = ['Contado', 'Crédito', 'Consignación', 'Apartado', 'Arrendamiento con opción de compra', 'Arrendamiento en función financiera', 'Otros'];
  private paymentMethods = ['Efectivo', 'Tarjeta', 'Cheque', 'Transferencia - Depósito bancario', 'Recaudado por terceros', 'Otros'];
  private showResume = false;
  private showGeneral=true;
  private showResolutions=false;
  private showChevronRight = true;
  private showChevronDown = false;

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    let services = this.getServices();
    let emitters = this.getEmitters();
    let receivers = this.getReceivers();
  }

  showSuccess() {
    this.toastr.success('Factura creada y enviada!', 'Correcto');
  }

  showError() {
    this.toastr.error('Factura no creada!', 'Oops');
  }

  showWarning() {
    this.toastr.warning('Factura no creada, llene todos los campos.', 'Alerta');
  }

  showInfo() {
    this.toastr.info('Factura creada pero no enviada.', 'Info');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }
  backToInvoiceResume(){
    this.showGeneral=false;
    this.showResolutions=false;
    this.showResume = true;
  }
  displayInvoiceResume(dateCreated, selectedEmitter, selectedReceiver, selectedService, sellTerm, paymentLapse, paymentMethod) {
    if((dateCreated!=undefined && dateCreated!='') && (selectedEmitter!=undefined && selectedEmitter!='') && (selectedReceiver!=undefined && selectedReceiver!='') 
    && (selectedService!=undefined && selectedService!='') && (sellTerm!=undefined && sellTerm!='') && (paymentLapse!=undefined && paymentLapse!='') && 
    (paymentMethod!=undefined && paymentMethod!='')){
      this.showGeneral=false;
      this.showResolutions=false;
      this.showResume = true;
    }
    else{
      this.showWarning();
    }
  }

  displayInvoiceGeneral(){
    this.showResume = false;
    this.showResolutions=false;
    this.showGeneral=true;
  }
  displayInvoiceResolutions(selectedCurrency, exchangeRate, recordedServices, exemptServices, recordedCommodity, 
    exemptCommodity, recordedTotal, exemptTotal, totalSell, totalDiscount, netSell, totalTax, totalVoucher){
    if((selectedCurrency!=undefined && selectedCurrency!='') && (exchangeRate!=undefined && exchangeRate!='') && (recordedServices!=undefined && recordedServices!='') 
    && (exemptServices!=undefined && exemptServices!='') && (recordedCommodity!=undefined && recordedCommodity!='') && (exemptCommodity!=undefined && exemptCommodity!='') && 
    (recordedTotal!=undefined && recordedTotal!='') && (exemptTotal!=undefined && exemptTotal!='') && (totalSell!=undefined && totalSell!='') && (totalDiscount!=undefined && totalDiscount!='') && 
    (netSell!=undefined && netSell!='') && (totalTax!=undefined && totalTax!='') && (totalVoucher!=undefined && totalVoucher!='')){
      this.showResume = false;
      this.showGeneral=false;
      this.showResolutions=true;
    }
    else{
      this.showWarning();
    }
  }

  hideInvoiceResume() {
    this.showResume = false;
    this.showChevronDown = false;
    this.showChevronRight = true;
  }

  getServices() {
    this.userService.getServices().subscribe(data => this.services = data);
  }

  getEmitters() {
    this.userService.getEmitters().subscribe(data => this.emitters = data);
  }
  getReceivers() {
    this.userService.getReceivers().subscribe(data => this.receivers = data);
  }

  processInvoice(dateCreated: String, sellTerm: String, paymentLapse: String, paymentMethod: String, selectedCurrency: String, exchangeRate: String,
    recordedServices: String, exemptServices: String, recordedCommodity: String, exemptCommodity: String, recordedTotal: String, exemptTotal: String,
    totalSell: String, totalDiscount: String, netSell: String, totalTax: String, totalVoucher: String, resolutionNumber: String, resolutionDate: String,
    otherText: String) {
    console.log(resolutionNumber);
    console.log(resolutionDate);
    console.log(otherText);
    if ((resolutionNumber != '' && resolutionNumber!=undefined) && (resolutionDate != '' && resolutionDate!=undefined) && (otherText != '' && otherText!=undefined)) {
      let invoice: Invoice = new Invoice();
      invoice.dateCreated = dateCreated;
      invoice.sellTerm = sellTerm;
      invoice.paymentLapse = paymentLapse;
      invoice.paymentMethod = paymentMethod;
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
      invoice.idEmitter = this.selectedEmitter.id;
      invoice.idReceiver = this.selectedReceiver.id;
      invoice.idService = this.selectedService.id;
      this.userService.sendInvoice(invoice).subscribe();
      this.showSuccess();
    } else if ((resolutionNumber == '' || resolutionNumber==undefined) || (resolutionDate == '' || resolutionDate==undefined) || (otherText == '' || otherText==undefined)) {
      this.showWarning();
    } else {
      this.showError();
    }
  }
}
