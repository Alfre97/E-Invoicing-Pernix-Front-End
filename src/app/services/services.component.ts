import { Component, OnInit } from '@angular/core';
import { Service } from '../Models/Service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addService(lineNumber: string, selectedCodeType: string, code: string, amount: string, meisureUnit: string, businessMeasure: string, detail: string, unitPrice: string,
     totalAmount: string, discount: string, subtotal:string, lineTotalAmount: string ){
      let service: Service= new Service();
      service.lineNumber=lineNumber;
      service.codeType=selectedCodeType;
      service.code=code;
      service.amount=amount;
      service.meisureUnit;
      service.businessMeasure=businessMeasure;
      service.detail=detail;
      service.unitPrice=unitPrice;
      service.totalAmount=totalAmount;
      service.discount=discount;
      service.subtotal=subtotal;
      service.lineTotalAmount=lineTotalAmount;
      this.userService.addService(service).subscribe();
  }

}
