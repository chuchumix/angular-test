import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentComponent } from './payment.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';


const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: PaymentAddComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}