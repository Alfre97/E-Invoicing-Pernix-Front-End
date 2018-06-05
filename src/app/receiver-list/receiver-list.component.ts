import { Component, OnInit, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ReceiverService } from '../receiver/receiver.service'

@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss'],
  providers: [ReceiverService]
})
export class ReceiverListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'identificationNumber', 'comercialName', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private toastr: ToastsManager,
    private receiverService: ReceiverService,
    vcr: ViewContainerRef, private httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.getReceivers();
  }

  showError(message: string) {
    this.toastr.error(message, 'Oops');
  }
  getReceivers() {
    this.receiverService.getReceivers().subscribe(
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

export interface receivers {
  id: number;
  name: string;
  identificationNumber: string;
  comercialName: string;
}


