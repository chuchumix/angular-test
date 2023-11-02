import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientService {
  clientsChanged = new Subject<Client[]>();
  private clients: Client[] = [];
  private client: Client;
  private currentClient: Client;

  constructor(private http: HttpClient) {}

  getClients() {
    return this.clients.slice();
  }
  getClient(id: string) {
    return this.http
      .get<Client>(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/client/'+id+'.json'
      )
      .pipe(
        map((client) => {
            this.currentClient = client;
            this.currentClient.id = id;
            return this.currentClient
        })
      );
  }

  setClients(clients: Client[]) {
    this.clients = clients;
    this.clientsChanged.next(this.clients.slice());
  }

  postClient(client: Client) {
    this.client = client;
    this.http
      .post(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/client.json',
        this.client
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  deleteClient(id: string) {
    this.http
      .delete(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/client/'+id+'.json')
      .subscribe((response) => {
        console.log(response);
      });
  }
  
  putClient(id: string, client: Client){
    this.http
      .put(
        'https://angular-test-b5d35-default-rtdb.firebaseio.com/client/'+id+'.json',
        client
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
