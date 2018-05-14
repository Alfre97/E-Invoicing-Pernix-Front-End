import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { ServiceService } from '../services/service.service'
import { InvoiceService } from '../Invoice/invoice.service'
import { Service } from '../Models/Service';
import { UserEmitterReceiver } from '../models/UserEmitterReceiver';
import { Invoice } from '../models/Invoice';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [ServiceService, InvoiceService],
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
