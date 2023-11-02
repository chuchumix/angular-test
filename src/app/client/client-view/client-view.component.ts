import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'age', 'nit', 'paymentTypes', 'actions'];
  allClients: Client[];
  dataSource = new MatTableDataSource<Client>();
  subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private route: ActivatedRoute, private clientService: ClientService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    
    this.dataStorageService.fetchClients().subscribe(clients => {
      this.allClients = clients;
      this.dataSource = new MatTableDataSource<Client>(clients),
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

  onNewClient(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onEditClient(id: string){
    this.router.navigate([id+'/edit'], {relativeTo: this.route.parent});
  }
  
  onDeleteClient(id: string){
    this.clientService.deleteClient(id);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
