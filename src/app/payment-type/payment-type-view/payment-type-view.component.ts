import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { PaymentType } from 'src/app/shared/models/payment-type.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { PaymentTypeService } from '../../shared/services/payment-type.service';

@Component({
  selector: 'app-payment-type-view',
  templateUrl: './payment-type-view.component.html',
  styleUrls: ['./payment-type-view.component.scss']
})
export class PaymentTypeViewComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'partialpayment', 'amount', 'actions'];
  allPaymentTypes: PaymentType[];
  dataSource = new MatTableDataSource<PaymentType>();
  subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private route: ActivatedRoute, private paymentTypeService: PaymentTypeService){}
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataStorageService.fetchPaymentTypes().subscribe(paymentTypes => {
      this.allPaymentTypes = paymentTypes;
      this.dataSource = new MatTableDataSource<PaymentType>(paymentTypes),
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

  onEditPaymentType(id: string){
    this.router.navigate([id+'/edit'], {relativeTo: this.route.parent});
  }
  
  onDeletePaymentType(id: string){
    this.paymentTypeService.deletePaymentTypes(id);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
