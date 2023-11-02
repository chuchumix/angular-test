import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Payment } from '../shared/models/payment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Subscription } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'client', 'paymentType', 'date', 'amount', 'userId'];
  dataSource = new MatTableDataSource<Payment>();
  subscription: Subscription;
  isLoading = false;
  constructor(private dataStorageService: DataStorageService, private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.isLoading = true;
    this.dataStorageService.fetchPayments().subscribe(payments => {
      this.dataSource = new MatTableDataSource<Payment>(payments),
      this.isLoading = false,
      this.dataSource.paginator = this.paginator,
      this.dataSource.sort = this.sort
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
