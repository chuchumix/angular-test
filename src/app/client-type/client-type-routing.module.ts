import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ClientTypeComponent } from './client-type.component';
import { ClientTypeAddComponent } from './client-type-add/client-type-add.component';
import { ClientTypeViewComponent } from './client-type-view/client-type-view.component';
import { ClientTypeResolverService } from './client-type-resolver.service';
import { ClientTypeEditComponent } from './client-type-edit/client-type-edit.component';
import { unsavedChangesGuard } from '../shared/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientTypeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view', component: ClientTypeViewComponent },
      { path: 'add', component: ClientTypeAddComponent },
      {
        path: ':id/edit',
        component: ClientTypeEditComponent,
        canDeactivate: [unsavedChangesGuard],
        resolve: [ClientTypeResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientTypeRoutingModule {}