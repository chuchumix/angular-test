import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/consult', pathMatch: 'full' },
  {
    path: 'consult', canActivate: [AuthGuard],
    loadChildren: () => import('./consult/consult.module').then(m => m.ConsultModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'clienttype',
    loadChildren: () => import('./client-type/client-type.module').then(m => m.ClientTypeModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'paymenttype',
    loadChildren: () => import('./payment-type/payment-type.module').then(m => m.PaymentTypeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
