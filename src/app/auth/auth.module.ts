import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
})
export class AuthModule {}
