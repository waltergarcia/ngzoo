import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import Components
import { MainAdminComponent } from './components/main/main-admin.component';
import { AddAdminComponent } from './components/add/add-admin.component';
import { EditAdminComponent } from './components/edit/edit-admin.component';
import { ListAdminComponent } from './components/list/list-admin.component';
import { AdminGuard } from '../../services/admin.guard';

const adminRoutes: Routes = [
  {
    path: 'admin-panel', component: MainAdminComponent,
    canActivate: [AdminGuard],
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'add', component: AddAdminComponent},
      {path: 'edit/:id', component: EditAdminComponent},
      {path: 'list', component: ListAdminComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RouterAdminModule{}
