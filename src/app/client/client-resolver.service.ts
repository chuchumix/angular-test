import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Client } from "../shared/models/client.model";
import { ClientService } from "../shared/services/client.service";
import { DataStorageService } from "../shared/services/data-storage.service";

@Injectable({providedIn: 'root'})
export class ClientsResolverService implements Resolve<Client[]>{
    
    constructor(private dataStorageService: DataStorageService, private clientService: ClientService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const clients = this.clientService.getClients();

        if (clients.length === 0) {
            return this.dataStorageService.fetchClients();
        } else {
            return clients;
        }
    }
}