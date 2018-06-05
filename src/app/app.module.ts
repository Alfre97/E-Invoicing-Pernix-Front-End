import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { EmitterComponent } from './emitter/emitter.component';
import { ServicesComponent } from './services/services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MatSelectModule } from '@angular/material/select';
import { TaxComponent } from './tax/tax.component';
import { CodeComponent } from './code/code.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CodeService } from "./code/code.service";
import { EmitterService } from "./emitter/emitter.service";
import { InvoiceService } from "./invoice/invoice.service";
import { ReceiverService } from "./receiver/receiver.service";
import { ServiceService } from "./services/services.service";
import { TaxService } from "./tax/tax.service";
import { TooltipModule } from "ngx-tooltip";
import { CodeListComponent } from './code-list/code-list.component';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatTableModule, MatToolbarModule, MatPaginatorModule } from '@angular/material';
import { TaxListComponent } from './tax-list/tax-list.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { EmitterListComponent } from './emitter-list/emitter-list.component';
import { ReceiverListComponent } from './receiver-list/receiver-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InvoiceComponent,
    ReceiverComponent,
    EmitterComponent,
    ServicesComponent,
    TaxComponent,
    CodeComponent,
    CodeListComponent,
    TaxListComponent,
    ServiceListComponent,
    EmitterListComponent,
    ReceiverListComponent,
    InvoiceListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    ArchwizardModule,
    TooltipModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
    exports: [
      CommonModule,
      MatToolbarModule,
      MatInputModule,
      MatTableModule
    ],
  providers: [CodeService, EmitterService, InvoiceService, ReceiverService, ServiceService, TaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
