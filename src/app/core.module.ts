import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ClientService } from "./shared/services/client.service";
import { PaymentService } from "./shared/services/payment.service";
import { PaymentTypeService } from "./shared/services/payment-type.service";
import { ClientTypeService } from "./shared/services/client-type.service";

@NgModule({
    providers: [
        PaymentService,
        PaymentTypeService,
        ClientService,
        ClientTypeService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
export class CoreModule{}