import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatListModule,
        MatChipsModule,
        MatCheckboxModule,
        CommonModule
    ]
})
export class SharedModule {}