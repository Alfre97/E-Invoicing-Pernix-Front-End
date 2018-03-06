import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    AddInvoiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
