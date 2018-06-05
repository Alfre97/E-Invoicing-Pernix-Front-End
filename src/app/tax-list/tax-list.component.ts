import { Component, OnInit, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { TaxService } from "../tax/tax.service";
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss'],
  providers: [TaxService]
})
export class TaxListComponent implements OnInit {
  displayedColumns = ['id', 'code', 'taxTotal', 'rate', 'actions'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private toastr: ToastsManager,
    private taxService: TaxService,
    vcr: ViewContainerRef, private httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.getTaxes();
  }
  showError(message: string) {
    this.toastr.error(message, 'Oops');
  }
  getTaxes() {
    this.taxService.getTaxes().subscribe(
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

export interface tax {
  id: string;
  code: string;
  taxTotal: number;
  rate: number;

}

