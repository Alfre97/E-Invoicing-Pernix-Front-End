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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InvoiceComponent,
    ReceiverComponent,
    EmitterComponent,
    ServicesComponent,
    TaxComponent,
    CodeComponent
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
    TooltipModule
  ],
  providers: [CodeService, EmitterService, InvoiceService, ReceiverService, ServiceService, TaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
