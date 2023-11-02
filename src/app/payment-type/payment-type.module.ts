import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { PaymentTypeComponent } from "./payment-type.component";
import { PaymentTypeAddComponent } from "./payment-type-add/payment-type-add.component";
import { PaymentTypeViewComponent } from "./payment-type-view/payment-type-view.component";
import { PaymentTypeEditComponent } from "./payment-type-edit/payment-type-edit.component";
import { PaymentTypeRoutingModule } from "./payment-type-routing.module";

@NgModule({
    declarations: [
        PaymentTypeComponent,
        PaymentTypeAddComponent,
        PaymentTypeViewComponent,
        PaymentTypeEditComponent
    ],
    imports: [
        RouterModule,
        FormsModule,
        PaymentTypeRoutingModule,
        SharedModule
    ],
    exports: [
        PaymentTypeComponent,
        PaymentTypeAddComponent,
        PaymentTypeViewComponent,
        PaymentTypeEditComponent
    ]
})

export class PaymentTypeModule{}