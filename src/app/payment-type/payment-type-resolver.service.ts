import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/services/data-storage.service";
import { PaymentTypeService } from "../shared/services/payment-type.service";
import { PaymentType } from "../shared/models/payment-type.model";

@Injectable({providedIn: 'root'})
export class PaymentTypeResolverService implements Resolve<PaymentType[]>{
    
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