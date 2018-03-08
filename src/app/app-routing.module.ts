import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MenuComponent } from './menu/menu.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EmitterComponent } from './emitter/emitter.component';
import { ProductsComponent } from './products/products.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  {path: '', component: MenuComponent, pathMatch:'full'},
  {path: 'menu', component: MenuComponent},
  {path: 'add-invoice', component: AddInvoiceComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'emitter', component: EmitterComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'receiver', component: ReceiverComponent},
  {path: 'services', component: ServicesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }