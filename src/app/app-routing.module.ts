import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MenuComponent } from './menu/menu.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EmitterComponent } from './emitter/emitter.component';
import { ProductsComponent } from './products/products.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { ServicesComponent } from './services/services.component';
import { TaxComponent } from './tax/tax.component';
import { CodeComponent } from './code/code.component';

const routes: Routes = [
  {path: '', component: MenuComponent, pathMatch:'full'},
  {path: 'menu', component: MenuComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'emitter', component: EmitterComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'receiver', component: ReceiverComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'tax', component: TaxComponent},
  {path: 'code', component: CodeComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
