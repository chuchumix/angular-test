import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientType } from 'src/app/shared/models/client-type.model';
import { ClientTypeService } from 'src/app/shared/services/client-type.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-client-type-view',
  templateUrl: './client-type-view.component.html',
  styleUrls: ['./client-type-view.component.scss']
})
export class ClientTypeViewComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  allClients: ClientType[];
  dataSource = new MatTableDataSource<ClientType>();
  subscription: Subscription;
  
  constructor(private dataStorageService: DataStorageService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private route: ActivatedRoute, private clientTypeService: ClientTypeService) {}
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataStorageService.fetchClientTypes().subscribe(clientTypes => {
      this.allClients = clientTypes;
      this.dataSource = new MatTableDataSource<ClientType>(clientTypes),
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

  onNewClientType(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onEditClientType(id: string){
    this.router.navigate([id+'/edit'], {relativeTo: this.route.parent});
  }
  
  onDeleteClientType(id: string){
    this.clientTypeService.deleteClientType(id);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
