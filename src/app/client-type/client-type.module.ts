import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { ClientTypeComponent } from "./client-type.component";
import { ClientTypeAddComponent } from "./client-type-add/client-type-add.component";
import { ClientTypeViewComponent } from "./client-type-view/client-type-view.component";
import { ClientTypeEditComponent } from "./client-type-edit/client-type-edit.component";
import { ClientTypeRoutingModule } from "./client-type-routing.module";

@NgModule({
    declarations: [
        ClientTypeComponent,
        ClientTypeAddComponent,
        ClientTypeViewComponent,
        ClientTypeEditComponent
    ],
    imports: [
        RouterModule,
        FormsModule,
        ClientTypeRoutingModule,
        SharedModule
    ],
    exports: [
        ClientTypeComponent,
        ClientTypeAddComponent,
        ClientTypeViewComponent,
        ClientTypeEditComponent
    ]
})

export class ClientTypeModule{}