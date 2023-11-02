import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClientType } from '../models/client-type.model';

@Injectable()
export class ClientTypeService {
  clientsChanged = new Subject<ClientType[]>();
  private clientTypes: ClientType[] = [];
  private clientType: ClientType;
  private currentClientType: ClientType;

  constructor(private http: HttpClient) {}

  getClientTypes() {
    return this.clientTypes.slice();
  }
  getClientType(id: string) {
    return this.http
      .get<ClientType>(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/clienttype/'+id+'.json'
      )
      .pipe(
        map((clientType) => {
            this.currentClientType = clientType;
            this.currentClientType.id = id;
            return this.currentClientType
        })
      );
  }

  setClientTypes(clientTypes: ClientType[]) {
    this.clientTypes = clientTypes;
    this.clientsChanged.next(this.clientTypes.slice());
  }

  postClientType(clientType: ClientType) {
    this.clientType = clientType;
    this.http
      .post(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/clienttype.json',
        this.clientType
      )
      .subscribe((response) => {
      });
  }
  deleteClientType(id: string) {
    this.http
      .delete(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/clienttype/'+id+'.json')
      .subscribe((response) => {
      });
  }
  
  putClientType(id: string, clientType: ClientType){
    this.http
      .put(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/clienttype/'+id+'.json',
        clientType
      )
      .subscribe((response) => {
      });
  }
}
