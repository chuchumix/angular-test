import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ClientComponent } from "./client.component";
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientRoutingModule } from "./client-routing.module";
import { RouterModule } from "@angular/router";
import { ClientAddComponent } from "./client-add/client-add.component";
import { ClientViewComponent } from "./client-view/client-view.component";

@NgModule({
    declarations: [
        ClientComponent,
        ClientAddComponent,
        ClientEditComponent,
        ClientViewComponent
    ],
    imports: [
        RouterModule,
        FormsModule,
        ClientRoutingModule,
        SharedModule
    ],
    exports: [
        ClientComponent,
        ClientAddComponent,
        ClientEditComponent,
        ClientViewComponent
    ]
})

export class ClientModule{}