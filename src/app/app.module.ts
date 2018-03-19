import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { EmitterComponent } from './emitter/emitter.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpClientModule }  from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';



@NgModule({
  declarations: [
    AppComponent,
    AddInvoiceComponent,
    MenuComponent,
    InvoiceComponent,
    ReceiverComponent,
    EmitterComponent,
    ProductsComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
