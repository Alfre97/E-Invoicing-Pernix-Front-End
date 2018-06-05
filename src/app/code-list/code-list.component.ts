import { Component, OnInit, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { CodeService } from "../code/code.service";
import { Code } from '../models/Code.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.scss'],
  providers: [CodeService]
})
export class CodeListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'codeType', 'code', 'serviceId','actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private toastr: ToastsManager,
    private codeService: CodeService,
    vcr: ViewContainerRef, private httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getCodes();
  }

  showError(message: string) {
    this.toastr.error(message, 'Oops');
  }

  getCodes() {
    this.codeService.getCodes().subscribe(
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

export interface Code {
  id: number;
  codeType: string;
  code: string;
  serviceId: string;
}






