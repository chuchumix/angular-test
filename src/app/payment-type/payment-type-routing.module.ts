import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentTypeEditComponent } from './payment-type-edit/payment-type-edit.component';
import { PaymentTypeResolverService } from './payment-type-resolver.service';
import { PaymentTypeViewComponent } from './payment-type-view/payment-type-view.component';
import { PaymentTypeComponent } from './payment-type.component';
import { PaymentTypeAddComponent } from './payment-type-add/payment-type-add.component';
import { unsavedChangesGuard } from '../shared/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: PaymentTypeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view', component: PaymentTypeViewComponent },
      { path: 'add', component: PaymentTypeAddComponent },
      {
        path: ':id/edit',
        component: PaymentTypeEditComponent,
        canDeactivate: [unsavedChangesGuard],
        resolve: [PaymentTypeResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentTypeRoutingModule {}