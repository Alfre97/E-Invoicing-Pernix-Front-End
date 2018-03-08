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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
