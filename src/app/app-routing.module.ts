import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MenuComponent } from './menu/menu.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EmitterComponent } from './emitter/emitter.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { ServicesComponent } from './services/services.component';
import { TaxComponent } from './tax/tax.component';
import { CodeComponent } from './code/code.component';
import { CodeListComponent } from './code-list/code-list.component';
import { TaxListComponent } from './tax-list/tax-list.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { EmitterListComponent } from './emitter-list/emitter-list.component';
import { ReceiverListComponent } from './receiver-list/receiver-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

const routes: Routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'invoices', component: InvoiceComponent },
  { path: 'emitters', component: EmitterComponent },
  { path: 'receivers', component: ReceiverComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'taxes', component: TaxComponent },
  { path: 'codes', component: CodeComponent },
  { path: 'code-list', component: CodeListComponent },
  { path: 'tax-list', component: TaxListComponent },
  { path: 'service-list', component: ServiceListComponent },
  { path: 'emitter-list', component: EmitterListComponent },
  { path: 'receiver-list', component: ReceiverListComponent },
  { path: 'invoice-list', component: InvoiceListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
