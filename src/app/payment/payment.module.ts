import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { PaymentComponent } from "./payment.component";
import { PaymentAddComponent } from "./payment-add/payment-add.component";
import { PaymentRoutingModule } from "./payment-routing.module";

@NgModule({
    declarations: [
        PaymentComponent,
        PaymentAddComponent
    ],
    imports: [
        RouterModule,
        FormsModule,
        PaymentRoutingModule,
        SharedModule
    ],
    exports: [
        PaymentComponent,
        PaymentAddComponent
    ]
})

export class PaymentModule{}