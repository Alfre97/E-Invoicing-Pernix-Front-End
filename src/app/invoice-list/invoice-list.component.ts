import { Component, OnInit, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { InvoiceService } from '../invoice/invoice.service'

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  providers: [InvoiceService]
})
export class InvoiceListComponent implements OnInit {
  displayedColumns = ['id', 'dateCreated', 'emitter', 'receiver', 'service', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private toastr: ToastsManager,
    private invoiceService: InvoiceService,
    vcr: ViewContainerRef, private httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.getInvoice();
  }
  showError(message: string) {
    this.toastr.error(message, 'Oops');
  }
  getInvoice() {
    this.invoiceService.getInvoice().subscribe(
      response => {
        this.dataSource.data = response;
        //Add action whe the Request send a good response
      },
      error => {
        //Add action whe the Request send a bad response
        this.showError("El Servidor no funciona.")
      }
    );
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

export interface invoice {
  id: number;
  dateCreated: string;
  emitter: string;
  receiver: string;
  service: string;
}
