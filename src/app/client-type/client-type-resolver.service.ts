import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/services/data-storage.service";
import { PaymentTypeService } from "../shared/services/payment-type.service";
import { ClientType } from "../shared/models/client-type.model";

@Injectable({providedIn: 'root'})
export class ClientTypeResolverService implements Resolve<ClientType[]>{
    
    constructor(private dataStorageService: DataStorageService, private paymentTypeService: PaymentTypeService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const paymentTypes = this.paymentTypeService.getPaymentTypes();

        if (paymentTypes.length === 0) {
            return this.dataStorageService.fetchPaymentTypes();
        } else {
            return paymentTypes;
        }
    }
}