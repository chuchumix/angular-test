import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ConsultComponent } from "./consult.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ConsultComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: ConsultComponent}
        ])
    ]
})

export class ConsultModule{}