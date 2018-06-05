import { Component, OnInit, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EmitterService } from '../emitter/emitter.service'
@Component({
  selector: 'app-emitter-list',
  templateUrl: './emitter-list.component.html',
  styleUrls: ['./emitter-list.component.scss'],
  providers: [EmitterService]
})
export class EmitterListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'identificationNumber', 'comercialName', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private toastr: ToastsManager,
    private emitterService: EmitterService,
    vcr: ViewContainerRef, private httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.getEmitters();
  }

  showError(message: string) {
    this.toastr.error(message, 'Oops');
  }
  getEmitters() {
    this.emitterService.getEmitters().subscribe(
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

export interface emitter {
  id: number;
  name: string;
  identificationNumber: string;
  comercialName: string;
}
