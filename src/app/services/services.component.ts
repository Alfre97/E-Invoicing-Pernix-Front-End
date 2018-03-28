import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Service } from '../Models/Service';
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  template: '<button class="btn btn-default" (click)="showSuccess()">Toastr Tester</button>'
})
export class ServicesComponent implements OnInit {

  constructor(private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }

  ngOnInit() {
  }

  addService(lineNumber: string, selectedCodeType: string, code: string, amount: string, meisureUnit: string, businessMeasure: string, detail: string, unitPrice: string,
    totalAmount: string, discount: string, subtotal: string, lineTotalAmount: string) {
    let service: Service = new Service();
    service.lineNumber = lineNumber;
    service.codeType = selectedCodeType;
    service.code = code;
    service.amount = amount;
    service.meisureUnit;
    service.businessMeasure = businessMeasure;
    service.detail = detail;
    service.unitPrice = unitPrice;
    service.totalAmount = totalAmount;
    service.discount = discount;
    service.subtotal = subtotal;
    service.lineTotalAmount = lineTotalAmount;
    this.userService.addService(service).subscribe();
  }

}
