import { Component, OnInit, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { ServiceService } from "../services/services.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Tax } from '../models/Tax.model';
import { Code } from '../models/Code.model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  providers: [ServiceService]
})

export class ServiceListComponent implements OnInit {
  displayedColumns = ['id', 'lineNumber', 'unitOfMeasurementType', 'total', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private toastr: ToastsManager,
    private Service: ServiceService,
    vcr: ViewContainerRef, private httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getServices();
  }
  showError(message: string) {
    this.toastr.error(message, 'Oops');
  }
  getServices() {
    this.Service.getServices().subscribe(
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

export interface service {
  id: Number;
  lineNumber: string;
  unitOfMeasurementType: string;
  total: number;
}
