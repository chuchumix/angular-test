import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ClientComponent } from './client.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientsResolverService } from './client-resolver.service';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { unsavedChangesGuard } from '../shared/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view', component: ClientViewComponent },
      { path: 'add', component: ClientAddComponent },
      {
        path: ':id/edit',
        component: ClientEditComponent,
        canDeactivate: [unsavedChangesGuard],
        resolve: [ClientsResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}